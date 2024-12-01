import React from 'react';
import { render } from '@testing-library/react';

import CandidateRequirement from 'components/layout/join/candidateRequirement';

import heartLogo from '~images/joinUs/VH-join-mini-icon-heart.png';

it('should render correctly', () => {
  const { asFragment } = render(
    <CandidateRequirement color='orange' description='foo' image={heartLogo} />,
  );
  expect(asFragment()).toMatchSnapshot();
});
