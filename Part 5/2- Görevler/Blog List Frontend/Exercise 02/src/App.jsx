import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {   /* ==>  Bu useEffect hook'u, React bileşeni render edildiğinde bir kez çalışır ve kullanıcının tarayıcısındaki
                              localStorage'da oturum bilgilerinin olup olmadığını kontrol eder. Eğer oturum bilgileri varsa, kullanıcıyı
                              otomatik olarak giriş yapmış gibi gösterir.
                      */
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(    // Bu block eklendi kullanici girisini yerel depoya aliyor
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
  }

  const handleLogout = () => {      // Bu fonksiyon eklendi kullanici ciktigi zaman yerel depodaki veriyi siliyor
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p  style={{ display: 'inline', marginRight: '10px' }}>{user.name} logged in</p>
      <button onClick={handleLogout}>Logout</button>  {/* Kullanici cikisi icin bir buton olusturdum. */}

      {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  )

}

export default App