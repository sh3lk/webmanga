import { TabContext, TabList } from "@mui/lab";
import { Box, Card, Grid, Tab } from "@mui/material";
import { FC, useState } from "react";
const Gallery: FC = () => {
  const [value, setValue] = useState("");
  const [photoIndex, setPhotoIndex] = useState(0);
  const [openLightBox, setOpenLightBox] = useState(false);

  const filtered = itemData.filter((item) =>
    value ? item.category.includes(value) : item
  );

  const images = itemData.map((item) => item.img);

  const handleImageClick = (imgLink: string) => () => {
    setOpenLightBox(true);
    const index = images.findIndex((item) => item === imgLink);
    setPhotoIndex(index);
  };

  return (
    <Card>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", marginY: 2 }}>
          <TabList
            onChange={(e, newValue) => setValue(newValue)}
            sx={{
              "& .MuiTabs-flexContainer": {
                justifyContent: "center",
              },
            }}
          >
            <Tab label="All" value="" />
            <Tab label="Branding" value="branding" />
            <Tab label="Fashion" value="fashion" />
            <Tab label="Development" value="development" />
          </TabList>
        </Box>
      </TabContext>
      <Grid container spacing={2} my={2} px={2}>
        {filtered.map((item) => (
          <Grid item md={3} xs={4} key={item.img}>
            <img
              src={item.img}
              alt={item.title}
              onClick={handleImageClick(item.img)}
              width="100%"
              height="100%"
              style={{ cursor: "pointer" }}
            />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

const itemData = [
  {
    img: "https://www.comingsoon.net/assets/uploads/2021/09/onepiece.jpg",
    title: "Blue",
    category: ["anime", "netflix"],
  },
  {
    img: "https://cdn.atomix.vg/wp-content/uploads/2022/05/anya_spy_xfamily_1.jpg_1339198940-1024x768.jpg",
    title: "Blue",
    category: ["anime", "netflix"],
  },
];

export default Gallery;
