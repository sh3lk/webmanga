import { Avatar, Grid, TextField, Box, Button, Divider } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSession } from "next-auth/react";
import { useState, useMemo } from "react";
import { formatDistance } from "date-fns";
import { useQuery, useMutation, gql } from "@apollo/client";
import Loader from "../loader";
import groupBy from 'lodash.groupby';
const _COMMENT = `
    id
    content
    createdAt
    threadOf {
    id
    }
    author {
    id
    name
    avatar
    }
`;

const COMMENTS = gql`
    query {
        findAllFlat(relation: "api::manga.manga:3", pagination:{pageSize: 100}) {
            data {${_COMMENT}}
        }
    }
`;

const ADD_COMMENT = gql`
    mutation createComment($content: String!, $threadOf: Id) {
        createComment(
        input: {
            relation: "api::manga.manga:3"
            content: $content
            threadOf: $threadOf
        }
        ) {${_COMMENT}}
    }
`;

const Comment = ({ id, text, avatar, username, createdAt }) => {
    const [isOpen, setOpen] = useState(false);
    const timeAgo = formatDistance(new Date(createdAt), new Date(), {
        addSuffix: true,
    });
    return (
        <Box spacing={2} mb={2}>
            <Grid container wrap="nowrap">
                <Grid item mt={1} mr={2}>
                    <Avatar alt={username} src={avatar} />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}>{username}</h4>
                    <p style={{ textAlign: "left" }}>{text}</p>
                    <Box style={{ textAlign: "left", color: "gray" }}>
                        posted {timeAgo}
                        {isOpen
                            ? <CommentForm onClose={() => setOpen(false)} threadOf={id} />
                            : <span style={{ marginLeft:8 }} onClick={() => setOpen(true)} >{"add comment"}</span>
                        }
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

const CommentTree = ({comments = [], STEP = 0,...props}) => {
    return (
        <>
            {
                comments.map(({ id, author, content, createdAt, children  }) => (
                    <Box key={id} {...props}>
                        <Comment
                            id={id}
                            username={author.name}
                            avatar={
                                author.avatar ||
                                "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                            }
                            text={content}
                            createdAt={createdAt}
                        />
                        <CommentTree ml={7} comments={children} STEP={STEP + 1} />
                    </Box>
                ))
            }
            {
                STEP === 1 && comments.length > 0 && <Divider variant="fullWidth" style={{ margin: "16px 0" }} />
            }
        </>
    );
};

const CommentForm = ({onClose = () => {},...variables}) => {
    const [addComment, { loading }] = useMutation(ADD_COMMENT);
    const [content, setContent] = useState("");
    const { data: session } = useSession();
    const { user } = session || {};
    const onSubmit = async () => {
        await addComment({
            variables: {...variables, content},
            update: (cache, { data: { createComment: comment } }) => {
                const {
                    findAllFlat: { data, __typename },
                } = cache.readQuery({ query: COMMENTS });
                cache.writeQuery({
                    query: COMMENTS,
                    data: { findAllFlat: { __typename, data: [...data, comment] } },
                });
            },
        });
        setContent("");
        onClose();
    };
    return (
        <>
            {user && (
                <Grid container wrap="nowrap" mt={1} spacing={2}>
                    <Grid item mt={1}>
                        <Avatar alt={user.name} src={user.image} />
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                        <TextField
                            disabled={loading}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            fullWidth
                            label="Add comment"
                            multiline
                        />
                        <Box
                            mt={1}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Box>
                                Отправляя комментарий, вы принимаете Условия сообщества
                                webmanga.
                            </Box>
                            <Box>
                                <Button disabled={loading} onClick={() => {
                                    setContent("");
                                    onClose();
                                }}>
                                    {"Cancel"}
                                </Button>
                                <LoadingButton
                                    loading={loading}
                                    onClick={onSubmit}
                                    variant="contained"
                                >
                                    {"Send"}
                                </LoadingButton>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

const Comments = () => {
    const { data: { findAllFlat } = {}, loading, error } = useQuery(COMMENTS);
    const tree = useMemo(() => {
        const data = findAllFlat?.data || [];
        const commentById = data.reduce((acc, item) => ({...acc, [item.id]: {...item}}), {});
        const flat = Object.values(commentById);
        const childrens = groupBy(flat.filter(comment => comment.threadOf !== null), "threadOf.id");

        for (const key in childrens) {
            commentById[key].children = childrens[key];
        }

        return flat
            .filter(comment => comment.threadOf === null);
    }, [findAllFlat]);
    console.log(tree)
    return (
        <>
            <CommentForm />
            {loading ? (
                <Loader />
            ) : error ? (
                "error"
            ) : (
                <Box
                    mt={3}
                    sx={{
                        display: "flex",
                        flexDirection: "column-reverse",
                    }}
                >
                    <CommentTree comments={tree} />
                    {/* <Divider variant="fullWidth" style={{ margin: "30px 0" }} /> */}
                </Box>
            )}
        </>
    );
};
export default Comments;
