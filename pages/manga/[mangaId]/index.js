import {
  Box,
  Grid,
  Container,
  Button,
  Typography,
  Tabs,
  Tab,
  Stack,
  Chip,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  CardActionArea,
  CardContent,
  Card,
  CardMedia,
} from "@mui/material";

import { useEffect } from "react";
import { useRouter } from "next/router";
import bookOpenFill from "@iconify/icons-eva/book-open-fill";
import flagFill from "@iconify/icons-eva/flag-fill";
import { Icon } from "@iconify/react";
import { alpha, styled } from "@mui/material/styles";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import { getImage } from "lib/common/utils";
import Comments from "components/comments";
import Loader from "components/loader";
import { motion } from "framer-motion";
const MANGA = gql`
  query {
    manga(id: 3) {
      data {
        attributes {
          name
          eng_name
          orig_name
          description
          cover {
            data {
              attributes {
                url
              }
            }
          }
          genres {
            data {
              id
              attributes {
                name
              }
            }
          }
          chapters {
            data {
              id
              attributes {
                chapter
                volume
                title
                images {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const info = {
  Author: ["Rifujin na Magonote"],
  Artist: ["Fujikawa Yuka"],
  Genres: [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Isekai",
    "Romance",
  ],
  Themes: ["Harem", "Magic", "Reincarnation"],
  Demographic: ["Seinen"],
  Format: ["Adaptation"],
};

const Banner = styled("div")(({ url }) => ({
  backgroundImage: `url(${url})`,
  width: "100%",
  height: "calc(100% - 3px)",
  backgroundSize: "cover",
  backgroundPosition: "center 25%",
  position: "absolute",
  top: 0,
  left: 0,
  transition: "width .15s ease-in-out",
  filter: "blur(10px)",
}));
const BannerContainer = styled("div")({
  width: "100%",
  height: "22rem",
  position: "absolute",
  overflow: "hidden",
  zIndex: -1,
  top: 0,
  left: 0,
});
const BannerGradient = styled("div")({
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  background: "linear-gradient(180deg,#ffffffc2 0,#fff)",
});

const StyledChip = styled(Chip)({
  borderRadius: "4px",
});

const ChapterList = ({ chapters = [] }) => {
  const { query } = useRouter();

  return (
      <List component="div">
        {chapters.map(({ id, attributes }) => (
            <Link
                href={{
                  pathname: "/manga/[mangaId]/chapter/[chapterId]",
                  query: { ...query, chapterId: id },
                }}
                key={id}
            >
              <ListItem component="a" sx={{ py: 1, px: 0 }} button>
                <ListItemIcon style={{ opacity: 0.7 }}></ListItemIcon>
                <ListItemText
                    primary={
                      <Typography color="textSecondary">
                        Том-{attributes.volume} Глава-{attributes.chapter}
                      </Typography>
                    }
                />
                <ListItemSecondaryAction>
                  <Typography color="textSecondary">{"timeAgo"}</Typography>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
        ))}
      </List>
  );
};

const Home = () => {
  const { data: { manga } = {}, loading, error } = useQuery(MANGA);

  const router = useRouter();

  useEffect(() => {
    if (!router.query.tab) {
      router.push("/manga/" + router.query.mangaId + "/?tab=0", undefined, {
        shallow: true,
      });
    }
  }, []);
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <>error</>;
  }

  return (
      <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
      >
        <Container>
          <BannerContainer>
            <Banner url={getImage(manga.data.attributes.cover)} />
            <BannerGradient />
          </BannerContainer>
          <motion.div
              animate={{ y: 0 }}
              initial={{ y: 20 }}
              exit={{ y: -20 }}
              transition={{ duration: 0.15 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Box sx={{ mb: 2, borderRadius: "0.25rem", overflow: "hidden" }}>
                  <CardActionArea>
                    <CardMedia
                        component="img"
                        image={getImage(manga.data.attributes.cover)}
                        alt="Cover image"
                    />
                  </CardActionArea>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
                  {Object.keys(info).map((field) => (
                      <Box key={field}>
                        <Typography variant="h6" component="p" sx={{ mb: 0.5 }}>
                          {field}
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {info[field].map((name) => (
                              <StyledChip
                                  variant="outlined"
                                  onClick={console.log}
                                  key={name}
                                  label={name}
                              />
                          ))}
                        </Box>
                      </Box>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={9}>
                <Box>
                  <Typography
                      sx={{
                        lineHeight: "1em",
                      }}
                      variant="h3"
                      component="h3"
                  >
                    {manga.data.attributes.name}
                  </Typography>
                  <Typography variant="h5" component="p" sx={{ mt: 1, mb: 2 }}>
                    {manga.data.attributes.eng_name}
                  </Typography>
                  <Typography variant="h6" component="p">
                    {manga.data.attributes.orig_name}
                  </Typography>
                  <Box sx={{ mt: 1.5, display: "flex", gap: 1 }}>
                    <Button variant="contained">{"Add To Library"}</Button>
                    <Button
                        variant="outlined"
                        startIcon={
                          <Icon icon={bookOpenFill} width={20} height={20} />
                        }
                    >
                      {"Start Reading"}
                    </Button>
                    <Button variant="outlined">
                      <Icon icon={flagFill} width={20} height={24} />
                    </Button>
                  </Box>
                </Box>
                <Typography
                    variant="subtitle1"
                    component="p"
                    sx={{ my: 2, p: 1, fontWeight: "400" }}
                >
                  {manga.data.attributes.description}
                </Typography>
                <Tabs
                    onChange={(_, value) =>
                        router.push(
                            "/manga/" + router.query.mangaId + "/?tab=" + value,
                            undefined,
                            { shallow: true }
                        )
                    }
                    value={Number(router.query.tab)}
                >
                  {["Chapters", "Comments", "Art", "Related", "Persons"].map(
                      (label) => (
                          <Tab key={label} label={label} />
                      )
                  )}
                </Tabs>
                <Divider />
                {
                  [
                    <ChapterList
                        key={0}
                        chapters={manga.data.attributes.chapters.data}
                    />,
                    <Comments key={1} />,
                  ][Number(router.query.tab)]
                }
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </motion.div>
  );
};

export default Home;
