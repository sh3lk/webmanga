import { TabContext, TabList, TabPanel } from "@mui/lab";
import {Box, Avatar, Card, Container, Grid, styled, Tab} from "@mui/material";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import { H3, Small } from "components/Typography";
import FollowerCard from "components/userProfile/FollowerCard";
import FriendCard from "components/userProfile/FriendCard";
import Gallery from "components/userProfile/Gallery";
import Profile from "components/userProfile/Profile";

import { FC, SyntheticEvent, useState } from "react";

const StyledCard = styled(Card)(() => ({
    position: "relative",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
}));

const ContentWrapper = styled(FlexBox)(() => ({
    top: -20,
    alignItems: "center",
    position: "relative",
}));

const StyledTab = styled(Tab)(({ theme }) => ({
    fontSize: 13,
    color: theme.palette.text.primary,
}));

const StyledTabList = styled(TabList)(({ theme }) => ({
    [theme.breakpoints.down(780)]: {
        width: "100%",
        "& .MuiTabs-flexContainer": {
            justifyContent: "space-between",
        },
        marginBottom: 20,
    },
    [theme.breakpoints.up("sm")]: {
        "& .MuiTabs-flexContainer": {
            minWidth: 400,
            justifyContent: "space-between",
        },
    },
}));

const StyledTabPanel = styled(TabPanel)(() => ({
    padding: 0,
}));

const UserProfile: FC = () => {
    const user = {
        avatar:'https://img1.ak.crunchyroll.com/i/spire3/991b4f483e04c82fa2a40442e7b9106c1649753611_large.jpg',
        cover: 'https://img1.ak.crunchyroll.com/i/spire2/ec826e3fa69d218fad11940ab5e06fc61649753260_main.png',
        name: 'Boba#1234'
    };

    const [value, setValue] = useState("1");

    const handleChange = (_: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
      <Container>
          <Box pb={4}>
              <TabContext value={value}>
                  <StyledCard>
                      <Box sx={{ height: 200, width: "100%", overflow: "hidden" }}>
                          <img
                            src={user.cover}
                            alt="User Cover"
                            height="100%"
                            width="100%"
                            style={{ objectFit: "cover" }}
                          />
                      </Box>

                      <FlexBox
                        flexWrap="wrap"
                        padding="0 2rem"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                          <ContentWrapper>
                              <Avatar
                                src={user?.avatar}
                                sx={{
                                    border: 4,
                                    width: 100,
                                    height: 100,
                                    borderColor: "background.paper",
                                }}
                              />

                              <Box marginLeft={3} marginTop={3}>
                                  <H3 lineHeight={1.2}>{user?.name}</H3>
                                  <Small color="text.disabled">Level 1</Small>
                              </Box>
                          </ContentWrapper>

                          <StyledTabList onChange={handleChange}>
                              <StyledTab label="Profile" value="1" />
                              <StyledTab label="Follower" value="2" />
                              <StyledTab label="Friends" value="3" />
                              <StyledTab label="Gallery" value="4" />
                          </StyledTabList>
                      </FlexBox>
                  </StyledCard>

                  <Box marginTop={3}>
                      <StyledTabPanel value="1">
                          <Profile />
                      </StyledTabPanel>

                      <StyledTabPanel value="2">
                          <Grid container spacing={3}>
                              {followers.map((item, index) => (
                                <Grid item lg={4} sm={6} xs={12} key={index}>
                                    <FollowerCard follower={item} />
                                </Grid>
                              ))}
                          </Grid>
                      </StyledTabPanel>

                      <StyledTabPanel value="3">
                          <H3>Friends</H3>
                          <SearchInput placeholder="Search Friends..." sx={{ my: 2 }} />

                          <Grid container spacing={3}>
                              {friends.map((friend, index) => (
                                <Grid item lg={4} sm={6} xs={12} key={index}>
                                    <FriendCard friend={friend} />
                                </Grid>
                              ))}
                          </Grid>
                      </StyledTabPanel>

                      <StyledTabPanel value="4">
                          <Gallery />
                      </StyledTabPanel>
                  </Box>
              </TabContext>
          </Box>
      </Container>
    );
};

const followers = [
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThrHxSnxSJWZ3xXBACzaG48dzoeSlYAJstmQ&usqp=CAU",
        name: "Mr. Breast",
        profession: "Product Designer",
        following: true,
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgMI1fmP0EYPuZv0wUJKNfypOh_Axea0-_vQ&usqp=CAU",
        name: "Ethan Drake",
        profession: "UI Designer",
        following: true,
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn9EomZSpWKBr-yKqpqpSFGKhAdusFLJeYtA&usqp=CAU",
        name: "Selena Gomez",
        profession: "Marketing Manager",
        following: false,
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXVKtMqsLPEfFmujuXSRVOxd7CM4TI27Go0Q&usqp=CAU",
        name: "Sally Becker",
        profession: "UI Designer",
        following: true,
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfIhuFamfzi3c_NWVfGSyOZoIAE9Tog1ysPA&usqp=CAU",
        name: "Dua Lipa",
        profession: "Marketing Manager",
        following: false,
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwvZJoQNTH3PYVcYJ_tahmPGFIRbUKJ-QacA&usqp=CAU",
        name: "Joe Murry",
        profession: "Product Designer",
        following: true,
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9e6dOx94F__2y_ZWDdg5VllLPDgG7Eg0iFg&usqp=CAU",
        name: "Mr. Breast",
        profession: "Product Designer",
        following: true,
    },
];

const friends = [
    {
        name: "Selena Gomez",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfhJOV20OcnvqwzQ63IPbI5qeCZJWP8dtr_A&usqp=CAU",
        profession: "Marketing Manager",
        facebookUrl: "",
        twitterUrl: "",
        instagramUrl: "",
        dribbleUrl: "",
    },
];

export default UserProfile;
