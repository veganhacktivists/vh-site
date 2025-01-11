import { StatusCodes } from 'http-status-codes';

import ErrorPage from '../components/layout/errorPage_pages';

import type { NextPageContext } from 'next';

export const getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode =
    res?.statusCode || err?.statusCode || StatusCodes.NOT_FOUND;

  return {
    props: { statusCode },
  };
};

export default ErrorPage;
