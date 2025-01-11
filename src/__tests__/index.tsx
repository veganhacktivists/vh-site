import { render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import Home from '../app/[locale]/page';

import type { IBlogEntry, IProject } from '../types/generated/contentful';

const featuredProjects: IProject[] = [];
const lastBlogEntries: IBlogEntry[] = [];

const props = { featuredProjects, lastBlogEntries };

test('Application renders without failing', () => {
  render(<Home {...props} />);
});

test('Application renders correctly', () => {
  const { asFragment } = render(<Home {...props} />);
  expect(asFragment()).toMatchSnapshot();
});
