import { Box, useTheme } from "@mui/material";
import FlexBox from "@/components/flex-box";
import { H1, Paragraph } from "@/components/typography";
import { FC } from "react";

const ErrorPage: FC = () => {
  const theme = useTheme();

  return (
    <FlexBox
      p={4}
      height="100%"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Box maxWidth={350}>
        <img
          src="/404.jpg"
          width="100%"
          alt="Error 404"
        />
      </Box>
      <H1 fontSize={64} fontWeight={700} color="primary.main" mt={3}>
        Ooops...  500!
      </H1>
      <Paragraph color="text.disabled" fontWeight="500">
        Internal Server Error
      </Paragraph>

      <a
        style={{
          display: "block",
          marginTop: "1.5rem",
          fontWeight: 600,
          textDecoration: "underline",
          color: theme.palette.primary.main,
        }}
      >
        Back to index
      </a>
    </FlexBox>
  );
};

export default ErrorPage;
