import { useState } from 'react';

const Blog = ({ blog , updateBlog, blogs, setBlogs, removeBlog, user }) => {
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

    const updatedBlogs = blogs.map(b => {
      if (b.id === blog.id) {
        return updatedBlog;
      }
      return b;
    });

    updatedBlogs.sort((a, b) => b.likes - a.likes);
    setBlogs(updatedBlogs);
  };

  const handleRemove = async () => {
    if(confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      await removeBlog(blog.id)

    }
  }

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
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </p>
          <p>{blog.user.name}</p>
          {user && user.name === blog.user.name && ( /* Koşul Kontrolü:
                                                        * user: Bu, mevcut kullanıcıyı temsil eden bir nesne olmalıdır. Eğer user tanımlı (varsa)
                                                          ve geçerli bir kullanıcıyı temsil ediyorsa, bir sonraki koşula geçilir.
                                                        * user.name === blog.user.name: Bu ifade, mevcut kullanıcının adı ile blogun yazarının
                                                          adının aynı olup olmadığını kontrol eder. Eğer bu iki isim eşitse, kod içindeki buton
                                                          görüntülenecektir.
           */
            <button onClick={handleRemove}>remove</button>
          )}
        </div>
      )}
    </div>
  );
}

export default Blog;
