import Image from 'next/image'
import NextLink from "next/link";
import {Paper, Card, Link, Stack, Button, CardActionArea, CardMedia} from "@mui/material";
import { styled } from "@mui/material/styles";
import Label from "components/label";
import {getImage, getImageProps} from '@/lib/common/utils'


const ProductImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});


export default function MangaCard({ id, type, name, cover, status }) {
  return (
    <>
      <Card elevation={12} sx={{maxHeight:'333px'}} variant="outlined">
          {status && (
              <Label
                  variant="filled"
                  color={(status === "hot" && "error") || "info"}
                  sx={{
                      zIndex: 10,
                      top: 8,
                      right: 8,
                      position: "absolute",
                      textTransform: "uppercase",
                  }}
              >
                  {status}
              </Label>
          )}
              <NextLink href={`/${type}/${id}`}>
                  <CardActionArea component="a">
                      <Image
                          src={getImage(cover)}
                          objectFit="cover"
                          height={334}
                          width={210.8}
                          alt={name}
                      />
                  </CardActionArea>
              </NextLink>
      </Card>
      <Stack sx={{ pt: 1, px: 2 }}>
        <NextLink href={`manga/${id}`}>
          <Link
            style={{ cursor: "pointer" }}
            variant="subtitle2"
            color="inherit"
            underline="hover"
            noWrap
          >
            {name}
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
    </>
  );
}
