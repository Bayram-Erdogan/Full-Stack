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
    blogService.getAll().then(blogs => {
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);  /* sort fonksiyonu, blogs dizisini beğeni sayısına (likes) göre sıralar.
                                                                        * a ve b, sıralama sırasında kıyaslanan iki blogdur.
                                                                        * (b.likes - a.likes): Bu ifade sıralamanın azalan düzende (en çok
                                                                          beğenilenden en az beğenilene doğru) yapılmasını sağlar. b.likes - a.
                                                                          likes pozitifse, b önce gelir (daha çok beğeni), negatifse a önce gelir
                                                                          (daha az beğeni).
                                                                      */
        setBlogs(sortedBlogs);
    });
}, []);



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

  const addBlog = async (event) => {
    event.preventDefault();

    const blogObject = {
      title: title,
      author: author,
      url: url
    };

    try {
      const returnedBlog = await blogService.create(blogObject);

      returnedBlog.user = { name: user.name };

      setBlogs(blogs.concat(returnedBlog));
      setTitle('');
      setAuthor('');
      setUrl('');
      setErrorMessage(`a new blog ${returnedBlog.title} added`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

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

  const updateBlog = async (id, updatedBlog) => {
    const returnedBlog = await blogService.update(id, updatedBlog);
    setBlogs(blogs.map(blog => (blog.id === id ? returnedBlog : blog)));
  };


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
          <Blog key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          blogs ={blogs}
          setBlogs ={setBlogs}
          />
        ))}





    </div>
  )

}

export default App