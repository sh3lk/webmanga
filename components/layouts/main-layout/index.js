import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Navbar from './navbar';
import { useRouter } from 'next/router';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));


export default function MainLayout({ children }) {
  const [open, setOpen] = useState(false);
  const {route} = useRouter();
  const isAuthRoute = route.includes('/auth/');
  return (
    <RootStyle>
      <Navbar hasAuthSupport={isAuthRoute} hasTabs={!isAuthRoute} hasSearch={!isAuthRoute} onOpenSidebar={() => setOpen(true)} />
      <MainStyle>
        {children}
      </MainStyle>
    </RootStyle>
  );
}
