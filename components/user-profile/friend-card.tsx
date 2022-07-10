import { Instagram, SportsBasketball, Twitter } from "@mui/icons-material";
import { Card, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { H6, Small } from "@/components/typography";
import FacebookIcon from "icons/FacebookIcon";
import React, { FC } from "react";

// component props interface
interface FriendCardProps {
  friend: {
    name: string;
    image: string;
    profession: string;
    facebookUrl?: string;
    twitterUrl?: string;
    instagramUrl?: string;
    dribbleUrl?: string;
  };
}

const FriendCard: FC<FriendCardProps> = () => {
  return (
    <Card sx={{ textAlign: "center", padding: 3 }}>
      <Box
        sx={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          backgroundColor: "primary.100",
          overflow: "hidden",
          margin: "auto",
        }}
      >
        <img src="https://i.pinimg.com/originals/f1/76/eb/f176ebb909131f66976ca6473fbf3a30.jpg" alt="User" width="100%" />
      </Box>
      <H6 mt={2}>Selena Gomez</H6>
      <Small color="text.disabled">Marketing Manager</Small>
      <Box marginTop={2}>
        <IconButton>
          <FacebookIcon fontSize="small" />
        </IconButton>
        <IconButton>
          <Twitter color="primary" />
        </IconButton>
        <IconButton>
          <Instagram color="warning" />
        </IconButton>
        <IconButton>
          <SportsBasketball color="error" />
        </IconButton>
      </Box>
    </Card>
  );
};

export default FriendCard;
