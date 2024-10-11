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

blogsRouter.delete("/:id", async (request,response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', (request, response, next) => {  /*  ==> Belirli bir notu güncellemek için bu rotaya bir PUT isteği gönderilir. Gelen
                                                                isteği (request), cevabı (response) ve bir sonraki middleware'i çağırmak için
                                                                next fonksiyonunu alır.
                                                        */
const body = request.body;      /*  ==> İstek gövdesindeki verileri (request.body) alır ve body değişkenine atar. Bu, güncellenmek istenen notun
                                        yeni verilerini içerir.
                                */

const blog = {                  /*  ==> Yeni bir blog nesnesi oluşturur. Bu nesne, güncellenmiş likes alanını içerir.*/
title: body.title,
author: body.author,
url: body.url,
likes: body.likes,
};

Blog.findByIdAndUpdate(request.params.id, blog, { new: true })  /*  ==> Blog modeli kullanarak veritabanındaki belirli bir blogu günceller.
                                                                        request.params.id ile hangi blog'un güncelleneceği belirtilir. blog
                                                                        nesnesi ise güncellenmiş verileri içerir. { new: true } seçeneği,
                                                                        güncellenmiş blogun veritabanından döndürülmesini sağlar.
                                                                        findByIdAndUpdate metodu, güncellenen belgeyi döndürür ve bu belgeyi
                                                                        updatedBlog değişkenine atar.
                                                                */
.then(updatedBlog => {
response.json(updatedBlog);         /*  ==> Güncelleme işlemi başarılı olursa, güncellenmiş notu JSON formatında yanıt olarak döner.*/
})
.catch(error => next(error));         /*  ==> Güncelleme işlemi sırasında bir hata oluşursa, bu hatayı bir sonraki hata işleyici middleware'e
                                              (next(error)) geçirir.
                                      */
});

module.exports = blogsRouter
