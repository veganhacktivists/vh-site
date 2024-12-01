import React from 'react';
import { render } from '@testing-library/react';

import Join from '../../pages/[locale]/join';

it('should render correctly', () => {
  const { asFragment } = render(<Join />);
  expect(asFragment()).toMatchSnapshot();
});
