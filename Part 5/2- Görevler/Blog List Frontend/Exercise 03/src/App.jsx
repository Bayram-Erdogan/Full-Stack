import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)  // Bu satir eklendi
      setUser(user)
      setUsername('')
      setPassword('')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (event) => {
    event.preventDefault()  /*  ==> Bu satır, formun varsayılan davranışını (sayfanın yenilenmesi) engeller. Eğer bu satır olmasaydı, form
                                    gönderildiğinde sayfa yeniden yüklenir ve mevcut veri kaybolurdu.
                            */
    const blogObject = {    /*  ==> Bu kısım, kullanıcının girdiği blog verilerini (başlık, yazar ve URL) bir blogObject isimli nesnede
                                    toplar. title, author ve url bu form alanlarından alınan değerlerdir. Bu değerler form bileşenindeki
                                    state değişkenleridir (setTitle, setAuthor, setUrl ile güncellenir).
                            */
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(blogObject) /*  ==> Bu kısım, blogService adındaki bir servis üzerinden blogu sunucuya göndermeye başlar. create(blogObject)
                                  fonksiyonu, axios kullanarak bu nesneyi belirli bir URL'ye (örneğin, POST /api/blogs) gönderir.
                          */
        .then(returnedBlog => { /*  then bloğu, sunucuya blog başarılı bir şekilde eklendiğinde çalışır:  returnedBlog Sunucudan dönen yeni
                                    blog nesnesidir. Bu, blogun sunucuya başarılı bir şekilde eklendiğini gösterir.
                                */
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')

        /*
            Özet
            event.preventDefault(): Formun yenilenmesini engeller.
            blogObject: Blog bilgilerini toplar.
            blogService.create(blogObject): Blogu sunucuya gönderir.
            .then(): Blog başarıyla gönderildiğinde listeye ekler ve formu sıfırlar.
            Bu adımlar, kullanıcının formda blog bilgilerini girdikten sonra bu blogun sunucuya başarılı şekilde gönderilmesini ve ardından
            blog listesine eklenmesini sağlar.
        */
      })
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