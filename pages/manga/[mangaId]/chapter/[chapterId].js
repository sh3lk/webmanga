import {
  Box,
  Grid,
  CircularProgress,
  Select,
  MenuItem,
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
import { useRouter } from "next/router";
import { useState, useEffect, useRef, useCallback } from "react";
import bookOpenFill from "@iconify/icons-eva/book-open-fill";
import flagFill from "@iconify/icons-eva/flag-fill";
import cloudDownloadOutline from "@iconify/icons-eva/cloud-download-outline";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image";
import debounce from "lodash.debounce";
import { useQuery, gql } from "@apollo/client";
import getApolloClient from "../../../../lib/apollo/client";

const CHAPTER = gql`
  query ($id: ID!) {
    chapter(id: $id) {
      data {
        id
        attributes {
          chapter
          volume
          origin
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
`;

const ScreenNavigator = ({ containerRef }) => {
  const [id, setId] = useState();
  const scroll = useCallback(
    debounce(() => {
      if (containerRef.current) {
        const _id =
          [...containerRef.current.children].sort(
            (a, b) =>
              Math.abs(a.getBoundingClientRect().top) -
              Math.abs(b.getBoundingClientRect().top)
          )[0].id;
        if (_id !== id)
          setId(_id);
      }
    }, 100),
    []
  );

  useEffect(() => {
    if (containerRef?.current) {
      window.addEventListener("scroll", scroll);
      setId([...containerRef.current.children][0].id);
    }

    return () => window.removeEventListener("scroll", scroll);
  }, [containerRef]);

  const goTo = (event) => {
    window[event.target.value]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  return containerRef?.current && (
    <Select
      sx={{ position: "fixed", left: 0, bottom: 0, m: 3 }}
      onChange={goTo}
      value={id}
      native
    >
      {
        [...containerRef.current.children].map((child, index, images) => (
          <option key={child.id} value={child.id}>
            {index + 1}/{images.length}
          </option>
        ))}
    </Select>
  );
};

const getImageProxy = (src) => `/api/imageproxy?url=${encodeURIComponent(src)}`;

const screenProps = ({src, ...data}, index) => ({
  ...data,
  alt: "Screen x",
  src: getImageProxy(src),
  priority: index === 0
});


export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  };
}

export async function getStaticProps(ctx) {
  const apolloClient = getApolloClient();

  const { data: {chapter} } = await apolloClient.query({
    query: CHAPTER,
    variables: { id: 1 },
  });

  const images = await fetch([process.env.NEXT_PUBLIC_CHAPTER_LAMBDA, chapter.data.attributes.origin.link].join("/"))
      .then((response) => response.json());

  if (!chapter || !images) {
    return {
      notFound: true,
      revalidate: 60 * 5,
    }
  }

  return {
    props: {
      chapter,
      images
    },
    revalidate: false,
  }
}

const Chapter = ({chapter, images}) => {
  const { query } = useRouter();

  const containerRef = useRef();

  return (
      <motion.div
          animate={{ opacity: 1}}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
      >
    <Box sx={{marginTop: '-66px'}}>
      <Grid
        ref={containerRef}
        container
        alignItems="center"
        flexDirection="column"
        spacing={2}
      >
        {
          images.map((data, index) => {
            return (
              <Grid
                key={data.src}
                id={"screen-" + index}
                xs={6}
                container
                justifyContent="center"
                item
              >
                <Image  {...screenProps(data, index)} />
              </Grid>
            );
          }
        )}
      </Grid>
      <ScreenNavigator containerRef={containerRef} />
    </Box>
      </motion.div>
  );
};

export default Chapter;
