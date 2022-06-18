import type { NextPage } from "next";
import { useFormik } from "formik";
import { useState } from "react";
import { Container, Stack, Typography } from "@mui/material";
import { MangaSort, MangaList, MangaFilterSidebar } from "@/components/catalog";
import { useQuery, gql } from "@apollo/client";
import { REVALIDATE_INTERVAL } from "lib/constants";
import { motion } from "framer-motion"
const CATALOG = gql`
query{
  mangas {
    data {
      id
      attributes {
      	name
        cover {
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

export async function getStaticProps() {
  return {
    props: {},
    revalidate: REVALIDATE_INTERVAL.catalog,
  };
}

const Catalog: NextPage = () => {
  const { data, loading, error } = useQuery(CATALOG);
  const [openFilter, setOpenFilter] = useState(false);

  const formik = useFormik({
    initialValues: {
      gender: "",
      category: "",
      colors: "",
      priceRange: "",
      rating: "",
    },
    onSubmit: () => {
      setOpenFilter(false);
    },
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  return (
      <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.15 }}
      >
      <Container>
        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 5, mt:6 }}
        >
          <Typography variant="h5">
            Manga list
          </Typography>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <MangaFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <MangaSort />
          </Stack>
        </Stack>
        {
          loading
          ? <>loading</>
          : (
            <MangaList
              list={data.mangas.data}
            />
          )
        }
      </Container>
      </motion.div>
  );
};

export default Catalog;
