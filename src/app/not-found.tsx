'use server';

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { defaultLocale } from '../../translation/defaultLocale';

import getServerIntl from './intl';
import Layout from './[locale]/layout';

import ErrorPage from 'components/layout/errorPage';
import { serverLocale } from 'lib/serverutils/serverLocale';

import type { Metadata } from 'next';
import type { ErrorProps } from 'components/layout/errorPage';

interface Props {
  params?: {
    locale?: string;
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const locale =
    (await serverLocale({ errorIfUnavailable: false })) ?? defaultLocale;
  const intl = getServerIntl(locale);

  return {
    title: intl.formatMessage({
      id: 'page.not-found.next-seo.title',
      defaultMessage: 'Page not found',
    }),
  };
}

const NotFound: React.FC<Props> = async () => {
  const locale =
    (await serverLocale({ errorIfUnavailable: false })) ?? defaultLocale;
  const intl = getServerIntl(locale);

  const notFoundErrorProps: ErrorProps['error'] = {
    statusCode: StatusCodes.NOT_FOUND,
    name: ReasonPhrases.NOT_FOUND,
    message: intl.formatMessage({
      id: 'page.not-found.error-message',
      defaultMessage: 'The page you requested does not exist',
    }),
  };

  return (
    <Layout params={{ locale }}>
      <ErrorPage error={notFoundErrorProps} />
    </Layout>
  );
};

export default NotFound;
