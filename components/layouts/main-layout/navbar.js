import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import { alpha, styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, Button, Tabs, Tab } from "@mui/material";
import { useState, useEffect } from "react";
import Searchbar from "./searchbar";
import AccountPopover from "./account-popover";
import LanguagePopover from "./language-popover";
import NotificationsPopover from "./notifications-popover";
import Logo from "@/components/logo";

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 48;
const APPBAR_DESKTOP = 48;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
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
export default function Navbar({
  onOpenSidebar,
  hasAccout,
  hasTabs,
  hasSearch,
}) {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(null);

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
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
        </Box>

        {hasSearch && <Searchbar />}
        <Box sx={{ flexGrow: 1 }} />
        {hasTabs && (
          <Box mt={2}>
            <Tabs value={tabIndex} onChange={handleChangeTabIndex}>
              {TABS.map(({ label }, id) => (
                <Tab id={id} key={label} label={label} />
              ))}
            </Tabs>
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }} />
        {hasAccout && (
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 0.5, sm: 1.5 }}
          >
            <LanguagePopover />
            <NotificationsPopover />
            <AccountPopover />
          </Stack>
        )}
      </ToolbarStyle>
    </RootStyle>
  );
}
