import type { AppProps } from 'next/app'
import MainLayout from '@/components/layouts/main-layout'
import ThemeConfig from "@/components/theme";
import GlobalStyles from "@/components/theme/globalStyles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeConfig>
      <GlobalStyles />
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ThemeConfig>
  )
}

export default MyApp
