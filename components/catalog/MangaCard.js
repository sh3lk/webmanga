import PropTypes from "prop-types";
import NextLink from "next/link";
import { Icon } from "@iconify/react";
import roundStarRate from "@iconify/icons-ic/round-star-rate";
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
// utils

//
import Label from "@/components/label";

// ----------------------------------------------------------------------

const ProductImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

export default function MangaCard({ id, title, cover, status }) {
  return (
    <Box>
      <Card variant="outlined">
        <Box sx={{ pt: "143%", position: "relative" }}>
          {status && (
            <Label
              variant="filled"
              color={(status === "hot" && "error") || "info"}
              sx={{
                zIndex: 9,
                top: 16,
                right: 16,
                position: "absolute",
                textTransform: "uppercase",
              }}
            >
              {status}
            </Label>
          )}
          <ProductImgStyle alt={title} src={cover} />
        </Box>
      </Card>
      <Stack sx={{ pt: 1, px: 2 }}>
        <NextLink href={"/"}>
          <Link
            style={{ cursor: "pointer" }}
            variant="subtitle2"
            color="inherit"
            underline="hover"
            noWrap
          >
            {title}
          </Link>
        </NextLink>
        <NextLink href={"/"}>
          <Link
            style={{ cursor: "pointer" }}
            variant="caption"
            color="inherit"
            underline="hover"
            noWrap
          >{`том 1 глава ${id}`}</Link>
        </NextLink>
      </Stack>
    </Box>
  );
}
