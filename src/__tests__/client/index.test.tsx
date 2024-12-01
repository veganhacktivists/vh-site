import { render, screen } from '@testing-library/react';

import Home from '../../app/[locale]/page';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('renders', () => {
    render(<Home featuredProjects={[]} lastBlogEntries={[]} />);

    const tagline = screen.getByText(
      'Building for the animal protection movement since 2019',
    );

    expect(tagline).toBeInTheDocument();
  });
});
