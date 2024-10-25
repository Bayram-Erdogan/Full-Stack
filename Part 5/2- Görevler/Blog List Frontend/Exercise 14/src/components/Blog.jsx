import { useState } from 'react'
import '../../css/Blog.css'



const Blog = ({ blog, updateBlog, blogs, setBlogs, removeBlog, user }) => {


  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleDetailsVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  const handleLike = async () => {
    const updatedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user,
    }

    await updateBlog(blog.id, updatedBlog)

    const updatedBlogs = blogs.map((b) => {
      if (b.id === blog.id) {
        return updatedBlog
      }
      return b
    })

    updatedBlogs.sort((a, b) => b.likes - a.likes)
    setBlogs(updatedBlogs)
  }

  const handleRemove = async () => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await removeBlog(blog.id)
    }
  }

  return (
    <div className='blog-container'>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetailsVisibility}>
          {detailsVisible ? 'hide' : 'view'}
        </button>
      </div>

      {detailsVisible && (
        <div className='detail-blogs'>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </p>
          <p>{blog.user.name}</p>
          {user &&
            user.name === blog.user.name && <button onClick={handleRemove}>remove</button>}
        </div>
      )}
    </div>
  )
}

export default Blog
