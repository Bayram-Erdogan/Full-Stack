import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')  //  Kullanici adini tutan degisken ile degisiklikleri saglayan fonksiyon
  const [password, setPassword] = useState('')  //  Kullanici sifresini tutan degisken ile degisiklikleri saglayan fonksiyon
  const [user, setUser] = useState(null)        /*  user: Şu an oturum açmış kullanıcıyı tutar. Başlangıçta null (yani, kullanıcı
                                                    giriş yapmamış). setUser: Kullanıcı giriş yaptığında ya da değiştiğinde user'ın
                                                    değerini günceller.*/

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()    /*  ==> formun varsayılan davranışını (örneğin, sayfanın yeniden yüklenmesini) engeller. Bu,
                                      formun gönderilmesi sırasında sayfanın yenilenmemesi için önemlidir.
                              */
      const user = await loginService.login({ /*  ==> Kullanıcıdan alınan username ve password bilgileriyle loginService.login
                                                      fonksiyonuna bir nesne gönderilir. loginService, genellikle API ile etkileşime
                                                      geçmek için kullanılan bir hizmettir ve burada giriş yapmak için bir HTTP isteği
                                                      gönderir.
                                              */
        username, password,
      })
      setUser(user) /*  ==>  kullanıcı nesnesi duruma (state) atanır. Bu, kullanıcı arayüzünde kullanıcının giriş yaptığını gösterir.*/

      /*  ==> setUsername(''); ve setPassword(''); ile giriş formundaki alanlar sıfırlanır, böylece kullanıcı adı ve şifre alanları
              temizlenir. */
      setUsername('')
      setPassword('')
  }

  if (user === null) {  /* Eger kullanici giris yapmamissa veya giris islemi basarisizsa gösterilecek olan formu kosula bagladim. */
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

  return (  /*  Eger kullanici girisi basarili ise asagidaki kodlar gösterilir. */
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged-in</p>
      {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  )

}

export default App