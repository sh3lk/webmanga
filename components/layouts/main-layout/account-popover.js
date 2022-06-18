import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import homeFill from "@iconify/icons-eva/home-fill";
import personFill from "@iconify/icons-eva/person-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
import Link from "next/link";
import { alpha } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react"
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import MenuPopover from "@/components/menu-popover";

const account = {
  displayName: "Jaydon Frankie",
  email: "demo@minimals.cc",
  photoURL: "/static/mock-images/avatars/avatar_default.jpg",
};

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: homeFill,
    linkTo: "/",
  },
  {
    label: "Profile",
    icon: personFill,
    linkTo: "/me",
  },
  {
    label: "Settings",
    icon: settings2Fill,
    linkTo: "/me/settings",
  },
];

// export default function Component() {
//   const { data: {user} = {} } = useSession()
//   console.log(session.user)
//   if (session) {
//     return (
//       <>
//         Signed in as {session.user.email} <br />
//         <button onClick={() => signOut()}>Sign out</button>
//       </>
//     )
//   }
//   return (
//     <>
//       Not signed in <br />
//       <button onClick={() => signIn()}>Sign in</button>
//     </>
//   )
// }


export default function AccountPopover() {
  const router = useRouter();
  const { data: session } = useSession()
  const {user} = session || {}
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return user ? (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar src={user.image} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {user.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <Link key={option.label} href={option.linkTo}>
            <MenuItem
              component={"a"}
              onClick={handleClose}
              sx={{ typography: "body2", py: 1, px: 2.5 }}
            >
              <Box
                component={Icon}
                icon={option.icon}
                sx={{
                  mr: 2,
                  width: 24,
                  height: 24,
                }}
              />
              {option.label}
            </MenuItem>
          </Link>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }} >
          <Button onClick={() => signOut()} fullWidth color="inherit" variant="outlined">
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  ) : (<>
      <IconButton onClick={() => signIn()}>
        <Icon icon={personFill} width={24} height={24} />
      </IconButton>
  </>)
}
