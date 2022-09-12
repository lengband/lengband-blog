import App, { AppContext } from 'next/app'
import type { AppProps } from 'next/app'
import Layout from 'components/Layout';
import { Entry } from "contentful";
import { ICategory } from 'lib/contentful';
import { fetchEntries } from 'lib/contentful';

import '../styles/globals.css'

interface PageProps {
  categories: Entry<ICategory>[]
}

function MyApp({ Component, pageProps }: AppProps<PageProps>) {

  return (
    <Layout categories={pageProps.categories}>
      <Component {...pageProps} />
    </Layout>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const categoryEntrys = await fetchEntries('category', 10);

  appProps.pageProps.categories = categoryEntrys.items;
  
  return { ...appProps }
}

export default MyApp
