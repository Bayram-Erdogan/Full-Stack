import { render } from '@testing-library/react';
import Blog from './Blog';
import { describe } from 'vitest';

describe('Blog Component', () => {
  test('renders blog content with title', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
    };

    const { container } = render(<Blog blog={blog} />);

    const div = container.querySelector('.blog-container')
    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
  });

  test('renders blog content with author', () => {
    const blog = {
      author: 'Test author 2',
    };

    const { container } = render(<Blog blog={blog} />);

    const div = container.querySelector('.blog-container')
    expect(div).toHaveTextContent(
      'Test author 2'
    )
  });

  test('renders blog content with title and author', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Test author 2',
    };

    const { container } = render(<Blog blog={blog} />);

    const div = container.querySelector('.blog-container')
    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(div).toHaveTextContent(
      'Test author 2'
    )

  });
});