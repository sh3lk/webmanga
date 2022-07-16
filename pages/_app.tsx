import Head from "next/head";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { CacheProvider } from "@emotion/react";
import { EmotionCache } from "@emotion/cache";
import CssBaseline from "@mui/material/CssBaseline";

import MainLayout from "components/layouts/main-layout";
import GlobalStyles from "components/theme/global-styles";
import ThemeConfig from "components/theme";

import ApolloProvider from "lib/apollo/provider";
import { createEmotionCache } from "lib/common/utils";
import { REVALIDATE_INTERVAL } from "lib/constants";

import { AnimatePresence } from "framer-motion";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache: EmotionCache;
}

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
  router
}: MyAppProps) {

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeConfig>
        <CssBaseline />
        <GlobalStyles />
        <SessionProvider
          session={session}
          refetchInterval={REVALIDATE_INTERVAL.session}
        >
          <ApolloProvider>
            <MainLayout>
              <AnimatePresence exitBeforeEnter>
                  <Component {...pageProps} key={router.route} />
              </AnimatePresence>
            </MainLayout>
          </ApolloProvider>
        </SessionProvider>
      </ThemeConfig>
    </CacheProvider>
  );
};

export default MyApp;
