import type { NextPage } from "next";
import { styled } from "@mui/material/styles";
import { Box, Stack, Link, Container, Typography } from "@mui/material";

import LoginForm from "@/components/form/login";
import AuthSocial from "@/components/form/social";

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(8, 0),
}));

const Register: NextPage = () => {
  return (
    <Container>
      <ContentStyle>
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Sign in to Minimal
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Enter your details below.
          </Typography>
        </Stack>

        <AuthSocial />

        <LoginForm />

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

export default Register;
