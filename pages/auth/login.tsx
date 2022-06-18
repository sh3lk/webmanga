import type { NextPage } from "next";
import { styled } from "@mui/material/styles";
import { Stack, Link, Container, Typography } from "@mui/material";

import LoginForm from "@/components/form/login";
import AuthSocial from "@/components/form/social";
import { signIn } from "next-auth/react";
const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(8, 0),
}));

const Login: NextPage = () => {
  const handleSingIn = (policy: string, credentials: any) =>
    signIn(policy, credentials);
  const singInByCredentials = (credentials: any) =>
    signIn("credentials", credentials);

  return (
    <Container>
      <ContentStyle>
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Sign in to webmanga
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Enter your details below.
          </Typography>
        </Stack>

        <AuthSocial onSubmit={handleSingIn} />

        <LoginForm onSubmit={singInByCredentials} />

        <Typography
          variant="body2"
          align="center"
          sx={{ color: "text.secondary", mt: 3 }}
        >
          By registering, I agree to Minimal&nbsp;
          <Link underline="always" sx={{ color: "text.primary" }}>
            Terms of Service
          </Link>
          &nbsp;and&nbsp;
          <Link underline="always" sx={{ color: "text.primary" }}>
            Privacy Policy
          </Link>
          .
        </Typography>

        {/* <MHidden width="smUp">
        <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
          Already have an account?&nbsp;
          <Link to="/login" component={RouterLink}>
            Login
          </Link>
        </Typography>
      </MHidden> */}
      </ContentStyle>
    </Container>
  );
};

export default Login;
