import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css';
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false) // Bu satir eklendi

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

  const loginForm = () => { /*  Bu loginForm fonksiyonel bileşeni, giriş formunun görünürlüğünü kontrol eden bir yapı sağlar. Giriş formu ya
                                görünür olur ya da gizlenir ve kullanıcı giriş yapmak istediğinde ya da formu iptal etmek istediğinde duruma
                                (state) göre form açılır veya kapanır.
                            */

    const hideWhenVisible = { display: loginVisible ? 'none' : '' } /*  Eğer loginVisible değeri true ise, bu stil display: 'none' olarak
                                                                        ayarlanır ve giriş butonu gizlenir. Aksi durumda boş bir değer ('')
                                                                        verilir, yani buton görünür olur.
                                                                    */

    const showWhenVisible = { display: loginVisible ? '' : 'none' } /*  Eğer loginVisible true ise, giriş formu görünür olur (display: ''),
                                                                        eğer false ise form gizlenir (display: 'none')
                                                                    */

    return (
      <div> {/* Bu blok, "log in" butonunu içeren bir <div> içerir. */}
        <div style={hideWhenVisible}>   {/* style={hideWhenVisible}: Butonun görünür olup olmayacağını belirler. Eğer loginVisible false ise
                                            bu buton görünür olur, true ise gizlenir.
                                        */}
          <button onClick={() => setLoginVisible(true)}>log in</button> {/* <button onClick={() => setLoginVisible(true)}>log in</button>
                                                                          Butona tıklandığında, setLoginVisible(true) çağrılır ve bu işlemle
                                                                          giriş formu görünür hale getirilir. Yani loginVisible durumu true
                                                                          yapılır.
                                                                      */}
        </div>

        <div style={showWhenVisible}> {/* Bu blokta, giriş formu görünür olduğunda gösterilen bileşenler yer alır. style={showWhenVisible}
                                          Bu stil sayesinde giriş formu sadece loginVisible true olduğunda görüntülenir.
                                      */}

        {/*  Önceden tanımladığımız LoginForm bileşeni burada çağrılır. Bu bileşene bazı özellikler (props) geçilir: */}
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

      {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}

      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>



    </div>
  )

}

export default App