import type { AppProps } from "next/app";
import MainLayout from "components/layouts/main-layout";
import ThemeConfig from "components/theme";
import GlobalStyles from "components/theme/globalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { EmotionCache } from "@emotion/cache";
import { SessionProvider } from "next-auth/react";
import { createEmotionCache } from "lib/common/utils";
import { REVALIDATE_INTERVAL } from "lib/constants";
import ApolloProvider from "lib/apollo/provider";
const clientSideEmotionCache = createEmotionCache();
import { AnimatePresence } from "framer-motion"
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
}

export default MyApp;
