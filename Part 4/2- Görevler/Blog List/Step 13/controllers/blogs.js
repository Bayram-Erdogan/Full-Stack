const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', (request, response) => {
   const blog = new Blog(request.body)

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'Title and URL are required.' });
  }

   blog
     .save()
     .then(result => {
       response.status(201).json(result)
     })
})

blogsRouter.delete("/:id", async (request,response, next) => {  /*  ==> Bu satır, HTTP DELETE metodunu kullanarak /:id yoluna gelen istekleri
                                                                        işleyecek bir rota işleyicisi tanımlar. id kısmı, silinmesi gereken
                                                                        blogun benzersiz kimliğini temsil eder. Asenkron (async) bir
                                                                        fonksiyondur. request: Gelen HTTP isteğini temsil eder. request.params.id
                                                                        ile URL'deki :id parametresine erişilir. response: HTTP yanıtını temsil
                                                                        eder. Yanıtı istemciye göndermek için kullanılır. next: Orta katman
                                                                        fonksiyonlarında hataları sonraki hata işleyicisine iletmek için
                                                                        kullanılır.
                                                                */
try {
await Blog.findByIdAndDelete(request.params.id)   /*  await: Asenkron bir işlemi beklemek için kullanılır. Mongoose'un Blog modeline ait bir
                                                      yöntemdir. request.params.id ile belirtilen ID'ye sahip blogu veritabanından bulur ve siler.
                                                  */
response.status(204).end()            /*  ==> HTTP yanıt kodunu 204 olarak ayarlar. 204 No Content, başarılı bir silme işlemi olduğunu ve yanıt
                                              gövdesi içermediğini belirtir. .end(): Yanıtı sonlandırır. Bu noktada istemciye yanıt gönderilir ve
                                              bağlantı kapatılır.
                                      */
}catch(exception) {     /*  ==> catch bloğu, try bloğunda bir hata oluştuğunda çalışır.*/
next(exception)       /*  ==> next(exception): Hata durumunda, hata nesnesi (exception) sonraki hata işleyiciye iletilir. Bu, Express.js
                              uygulamanızda tanımlanmış hata işleyicisinin hatayı ele almasına olanak tanır.
                      */
}
/*
Özet
  Bu rota işleyicisi, belirli bir ID'ye sahip bir blog gönderisini silmek için kullanılır. İşleyici, silme işlemini gerçekleştirmeyi dener. Silme
  işlemi başarılı olursa, 204 No Content yanıt kodu ile birlikte istemciye boş bir yanıt gönderir. Bir hata oluşursa, hata nesnesi Express.js
  hata işleyicisine iletilir. Bu yapı, temiz ve doğru hata yönetimi ile birlikte asenkron işlemleri kolayca ele almanızı sağlar.
*/
})

module.exports = blogsRouter
