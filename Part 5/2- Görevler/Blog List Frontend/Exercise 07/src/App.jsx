import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css';
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (event) => {
    event.preventDefault()

      const blogObject = {
        title: title,
        author: author,
        url: url
      }

      blogService
        .create(blogObject)
          .then(returnedBlog => {
            setBlogs(blogs.concat(returnedBlog))
            setTitle('')
            setAuthor('')
            setUrl('')
            setErrorMessage(`a new blog ${returnedBlog.title} added`)
            setTimeout(() => {
            setErrorMessage(null)
       }, 5000)
          })

  }

  const Notification = ({ message, type = 'error' }) => {
    if (message === null) {
      return null
    }

    const typeStyle = type === 'successful' ? 'successful' : 'error';

    return (
      <div className={typeStyle}>
        {message}
      </div>
    )
  }

  const loginForm = () => {

    const hideWhenVisible = { display: loginVisible ? 'none' : '' }

    const showWhenVisible = { display: loginVisible ? '' : 'none' }
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>

        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const blogForm = () => (
    <BlogForm
    title={title}
    author={author}
    url={url}
    user ={username}
    handletitleChange={({ target }) => setTitle(target.value)}
    handleAuthorChange={({ target }) => setAuthor(target.value)}
    handleUrlChange={({ target }) => setUrl(target.value)}
    handleSubmit={addBlog}
    />
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} type='error'/>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} type='successful'/>
      <p  style={{ display: 'inline', marginRight: '10px' }}>{user.name} logged in</p>
      <button onClick={handleLogout}>Logout</button>
      <Togglable buttonLabel="create new blog">
        {blogForm()}
      </Togglable>
      {blogs.map(blog => (
          <Blog key={blog.id} blog={blog}  />
        ))}





    </div>
  )

}

export default App