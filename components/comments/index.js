import {Divider, Avatar, Grid, Paper, TextField, Box, Button} from "@mui/material";
import {useSession} from "next-auth/react";
import EmojiPicker from "../emoji/emoji-picker";


const imgLink =
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";


const Comment = ({text, avatar, username}) => {
    return (
        <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
                <Avatar alt={username} src={avatar} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>{username}</h4>
                <p style={{ textAlign: "left" }}>
                    {text}
                </p>
                <p style={{ textAlign: "left", color: "gray" }}>
                    posted 1 minute ago
                </p>
            </Grid>
        </Grid>
    );
}

const Comments = () => {
    const { data: session } = useSession()
    const {user} = session || {}
    return (
        <>
            {
                user && (<Grid container wrap="nowrap" mt={4} spacing={2}>
                    <Grid item>
                        <Avatar alt={user.name} src={user.image}/>
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>v
                        <TextField
                            fullWidth
                            label="Add comment"
                            multiline
                        />
                        <Box mt={1} sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <EmojiPicker/>
                            <Box>
                                Отправляя комментарий, вы принимаете Условия сообщества webmanga.
                            </Box>
                            <Box>
                                <Button>
                                    {"Cancel"}
                                </Button>
                                <Button variant="contained">
                                    {"Send"}
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>)
            }
            <Box mt={3}>
                <Comment
                    username={'Michel Michel'}
                    avatar={imgLink}
                    text={
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean\n" +
                    "luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.\n" +
                    "Suspendisse congue vulputate lobortis. Pellentesque at interdum\n" +
                    "tortor. Quisque arcu quam, malesuada vel mauris et, posuere\n" +
                    "sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit\n" +
                    "metus, efficitur lobortis nisi quis, molestie porttitor metus.\n" +
                    "Pellentesque et neque risus. Aliquam vulputate, mauris vitae\n" +
                    "tincidunt interdum, mauris mi vehicula urna, nec feugiat quam\n" +
                    "lectus vitae ex."
                }/>
                <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar alt="Remy Sharp" src={imgLink} />
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
                        <p style={{ textAlign: "left" }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                            luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                            Suspendisse congue vulputate lobortis. Pellentesque at interdum
                            tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                            sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
                            metus, efficitur lobortis nisi quis, molestie porttitor metus.
                            Pellentesque et neque risus. Aliquam vulputate, mauris vitae
                            tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
                            lectus vitae ex.{" "}
                        </p>
                        <p style={{ textAlign: "left", color: "gray" }}>
                            posted 1 minute ago
                        </p>
                    </Grid>
                </Grid>
                <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar alt="Remy Sharp" src={imgLink} />
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth >
                        <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
                        <p style={{ textAlign: "left" }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                            luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                            Suspendisse congue vulputate lobortis. Pellentesque at interdum
                            tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                            sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
                            metus, efficitur lobortis nisi quis, molestie porttitor metus.
                            Pellentesque et neque risus. Aliquam vulputate, mauris vitae
                            tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
                            lectus vitae ex.{" "}
                        </p>
                        <p style={{ textAlign: "left", color: "gray" }}>
                            posted 1 minute ago
                        </p>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
export default Comments;
