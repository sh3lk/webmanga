import PropTypes from "prop-types";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { alpha, styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, Typography, Tabs, Tab, Link } from "@mui/material";
import { useState, useEffect } from "react";
import Searchbar from "./searchbar";
import AccountPopover from "./account-popover";
import SitePopover from "./site-popover";
import NotificationsPopover from "./notifications-popover";
import Logo from "components/logo";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 32;
const APPBAR_DESKTOP = 48;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

Navbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};
const TABS = [
  {
    label: "Catalog",
    href: "/catalog",
    match: "",
  },
  {
    label: "News",
    href: "/news",
    match: "",
  },
  {
    label: "Persons",
    href: "/persons",
    match: "",
  },
  {
    label: "Wiki",
    href: "/wiki",
    match: "",
  },
];


function AuthRouteComponent({route}) {  
  const router = useRouter();
  const isLogin = router.route.includes("login");
  const isRegister = router.route.includes("register");

  if(isLogin) {
    return (
      <Typography
      variant="body2"
      color="#212B36"
    >
  Don’t have an account? &nbsp;
  <Link
    underline="none"
    variant="subtitle2"
    // component={RouterLink}
    // to="/authentication/register"
  >
    Get started
  </Link>
    </Typography>
    );
  }
  
  if(isRegister) {
    return (
      <Typography
      variant="body2"
      color="#212B36"
    >
                Already have an account? &nbsp;
                <Link
                  underline="none"
                  variant="subtitle2"
                  // component={RouterLink}
                  // to="/authentication/login"
                >
                  Login
                </Link>
      </Typography>
    );
  }
  return null;
}
export default function Navbar({
  onOpenSidebar,
  hasAuthSupport,
  hasTabs,
  hasSearch,
}) {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChangeTabIndex = (event) => {
    const index = Number(event.target.id);
    const tab = TABS[index];
    setTabIndex(index);
    router.push(tab.href);
  };

  useEffect(() => {
    setTabIndex(null);

    for (const _index in TABS) {
      const index = Number(_index);

      if (router.route === TABS[index].href) {
        setTabIndex(index);
      }
    }
  }, [router]);

  return (
    <RootStyle>
      <ToolbarStyle>
        <Box margin={2}>
          <NextLink href="/">
            <a>
              <Logo />
            </a>
          </NextLink>
        </Box>

        {hasSearch && <Searchbar />}
        <Box sx={{ flexGrow: 1 }} />
        {hasTabs && !isMobile && (
          <Box mt={2}>
            <Tabs value={tabIndex} onChange={handleChangeTabIndex}>
              {TABS.map(({ label }, id) => (
                <Tab id={id} key={label} label={label} />
              ))}
            </Tabs>
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }} />
        {!hasAuthSupport ? (
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 0.5, sm: 1.5 }}
          >
            <SitePopover />
            <NotificationsPopover />
            <AccountPopover />
          </Stack>
        ) : <AuthRouteComponent/>}
      </ToolbarStyle>
      {hasTabs && isMobile && (
          <Tabs sx={{color: "#212B36"}} variant="scrollable"
                 scrollButtons
                 allowScrollButtonsMobile  value={tabIndex} onChange={handleChangeTabIndex}>
            {TABS.map(({ label }, id) => (
                <Tab id={id} key={label} label={label} />
            ))}
          </Tabs>
      )}
    </RootStyle>
  );
}
