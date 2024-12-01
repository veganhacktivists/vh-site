import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

import InfoBox from '../../components/infoBox';

import lampImage from '~images/Services-icon-project.png';

it('should display the title correctly', () => {
  const { getByText } = render(
    <InfoBox
      title='Have an idea for a project?'
      icon={lampImage}
      iconBgColor='green'
      iconAccentColor='green-dark'
    >
      Lorem impsum dolor etc.
    </InfoBox>,
  );

  const title = getByText('Have an idea for a project?');
  expect(title).toBeInTheDocument();
});

it('should display the content correctly', () => {
  const { getByText } = render(
    <InfoBox
      title='Have an idea for a project?'
      icon={lampImage}
      iconBgColor='green'
      iconAccentColor='green-dark'
    >
      <h1>Content</h1>
      <p>In the form of HTML, instead of a string</p>
    </InfoBox>,
  );

  const content = getByText('Content');
  expect(content).toBeInTheDocument();
});

it('should align the info box correctly', () => {
  const { container } = render(
    <InfoBox
      title='Have an idea for a project?'
      icon={lampImage}
      iconBgColor='green'
      iconAccentColor='green-dark'
      align='right'
    >
      Blablabla
    </InfoBox>,
  );

  const element = container.querySelector('.flex-row-reverse');
  expect(element).toBeInTheDocument();
});
