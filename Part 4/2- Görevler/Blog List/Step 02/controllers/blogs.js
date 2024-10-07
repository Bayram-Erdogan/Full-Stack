/*
    Rotaların olay işleyicilerine genellikle controllers adı verilir ve bu nedenle yeni bir controllers dizini oluşturduk.
    Bloglarla ilgili HTTP isteklerini işleyen ve ilgili işlemleri gerçekleştiren tüm rotalar artık controllers dizini altındaki
    blogs.js modülünde yer alacaktir.

*/
const blogsRouter = require('express').Router()     /*  ==> Bu satir Express'in Router metodunu kullanarak yeni bir yönlendirici
                                                            oluşturuluyor. Bu yönlendirici, bloglarla ilgili HTTP isteklerini
                                                            karşılamak için kullanılacak.
                                                    */

const Blog = require('../models/blog')              /*  ==> Bu satir Blog adında bir model dosyasıni çağrıyor. Model Mongoose
                                                            kullanılarak oluşturulmuş bir blog modelini içerir. Bu model, veritabanında blog nesnelerini temsil eden şemalar ve yöntemler
                                                            içerir.
                                                    */


blogsRouter.get('/', (request, response) => {       /*  ==> GET isteği, / yoluna yapıldığında, tüm blogları veritabanından
                                                            çeken bir işlevi gerçekleştirir ve bu blogları JSON trurunde yanıt olarak
                                                            döndürür.
                                                    */
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })

blogsRouter.post('/', (request, response) => {      /*  ==> POST isteği, / yoluna yapıldığında, gelen istek verisiyle yeni
                                                            bir blog nesnesi oluşturur ve bu nesneyi veritabanına kaydeder.
                                                            Kaydedilen blog nesnesini de JSON turunde yanıt olarak döndürür.
                                                    */
    const blog = new Blog(request.body)

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

module.exports = blogsRouter                        /*  ==> blogsRouter, bu dosyanın dışında yani başka bir dosyada kullanılmak
                                                            üzere dışa aktarılır. Bu, bu yönlendiriciyi diğerdosyalarda
                                                            kullanılabilir hale getirir.
                                                    */