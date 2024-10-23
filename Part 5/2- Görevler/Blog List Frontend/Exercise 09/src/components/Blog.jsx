import { useState } from 'react';


const Blog = ({ blog , updateBlog }) => {
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

  const handleLike = async () => {
    const updatedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user,
    };
    await updateBlog(blog.id, updatedBlog);
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
          <p>{blog.url }</p>
          <p>
            likes {blog.likes } <button onClick={handleLike}>like</button>
          </p>
          <p>{blog.user.name}</p>
        </div>
      )}
    </div>
  );
}

export default Blog;
