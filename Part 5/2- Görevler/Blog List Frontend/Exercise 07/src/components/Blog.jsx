import { useState } from 'react';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [detailsVisible, setDetailsVisible] = useState(false);

  const toggleDetailsVisibility = () => {
    setDetailsVisible(!detailsVisible);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetailsVisibility}>
          {detailsVisible ? 'hide' : 'view'}
        </button>
      </div>

      {detailsVisible && (
        <div>
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes <button>like</button>
          </p>
          <p>{blog.user.name}</p>
        </div>
      )}
    </div>
  );
}

export default Blog;
