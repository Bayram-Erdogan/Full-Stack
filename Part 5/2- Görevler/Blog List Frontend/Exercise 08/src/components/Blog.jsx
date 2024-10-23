import { useState } from 'react';
import blogServise from '../services/blogs'   // Bu sarir eklendi

const Blog = ({ blog , updateBlog }) => {  // uptadeBlog props olarak verildi
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

  const handleLike = async () => {  // artisi kontrol etmesi icin bir fonksiyon olusturuldu.
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
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes <button onClick={handleLike}>like</button>  {/* ve butona tiklaninca cagirilacak olan fonksiyon eklendi */}
          </p>
          <p>{blog.user.name}</p>
        </div>
      )}
    </div>
  );
}

export default Blog;
