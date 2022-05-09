import type { NextPage } from "next";
import { useFormik } from 'formik';
import { useState } from 'react';
import { Container, Stack, Typography } from '@mui/material';
import {
  MangaSort,
  MangaList,
  MangaFilterSidebar
} from '@/components/catalog';

const Catalog: NextPage = () => {
  const [open, setOpen] = useState(false);

  const [openFilter, setOpenFilter] = useState(false);

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
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
    <>
      <Container>
        <Typography variant="h4" sx={{ mt: 4 }}>
          Manga list
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
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

        <MangaList list={[
        { id: 1, title: "Начало после конца", cover: "https://mangalib.me/uploads/cover/the-beginning-after-the-end/cover/r1uqydHG5iuV_250x350.jpg", status: "hot" },
        { id: 2, title: "Начало после конца", cover: "https://mangalib.me/uploads/cover/chainsaw-man/cover/mUIlgi4AJypL_250x350.jpg", status: null },
        { id: 3, title: "Начало после конца", cover: "https://mangalib.me/uploads/cover/uzaki-chan-wa-asobitai/cover/ScJPY787nfGo_250x350.jpg", status: null },
        { id: 41, title: "Начало после конца", cover: "https://mangalib.me/uploads/cover/kimetsu-no-yaiba/cover/4KagQthKA49B_250x350.jpg", status: null },
        { id: 5, title: "Начало после конца", cover: "https://mangalib.me/uploads/cover/himouto-umaru-chan/cover/Et79IkwBDpEv_250x350.jpg", status: null },
        { id: 6, title: "Начало после конца", cover: "https://mangalib.me/uploads/cover/the-beginning-after-the-end/cover/r1uqydHG5iuV_250x350.jpg", status: "in reading" },
        { id: 76, title: "Начало после конца", cover: "https://mangalib.me/uploads/cover/the-beginning-after-the-end/cover/r1uqydHG5iuV_250x350.jpg", status: null },
        { id: 5544, title: "Начало после конца", cover: "https://mangalib.me/uploads/cover/the-beginning-after-the-end/cover/r1uqydHG5iuV_250x350.jpg", status: null },
        { id: 7236, title: "Начало после конца", cover: "https://mangalib.me/uploads/cover/the-beginning-after-the-end/cover/r1uqydHG5iuV_250x350.jpg", status: null },
        { id: 52, title: "Начало после конца", cover: "https://mangalib.me/uploads/cover/the-beginning-after-the-end/cover/r1uqydHG5iuV_250x350.jpg", status: null },
        { id: 7126, title: "Начало после конца", cover: "https://mangalib.me/uploads/cover/the-beginning-after-the-end/cover/r1uqydHG5iuV_250x350.jpg", status: null },
        { id: 5443, title: "Начало после конца", cover: "https://mangalib.me/uploads/cover/the-beginning-after-the-end/cover/r1uqydHG5iuV_250x350.jpg", status: null },
        { id: 7346, title: "Начало после конца", cover: "https://mangalib.me/uploads/cover/the-beginning-after-the-end/cover/r1uqydHG5iuV_250x350.jpg", status: null },
        { id: 5234, title: "Начало после конца", cover: "https://mangalib.me/uploads/cover/the-beginning-after-the-end/cover/r1uqydHG5iuV_250x350.jpg", status: null },
        { id: 476, title: "Начало после конца", cover: "https://mangalib.me/uploads/cover/the-beginning-after-the-end/cover/r1uqydHG5iuV_250x350.jpg", status: null },
        { id: 5124, title: "Начало после конца", cover: "https://mangalib.me/uploads/cover/the-beginning-after-the-end/cover/r1uqydHG5iuV_250x350.jpg", status: null },
        { id: 23, title: "Начало после конца", cover: "https://mangalib.me/uploads/cover/the-beginning-after-the-end/cover/r1uqydHG5iuV_250x350.jpg", status: "top" },
        
        ]} />
      </Container>
    </>
  );
};

export default Catalog;