const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const assert = require('node:assert')
const Blog = require('../models/blog')

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs are returned as json and have an id property', async () => {
  const blogsInDb = await Blog.find({});  /*  ==> Bu satır, MongoDB veritabanından Mongoose kütüphanesi kullanılarak tüm Blog belgelerini
                                                  (document) sorgulayan bir komuttur. Bu kod, Mongoose'un find metodunu kullanarak belirli bir
                                                  koleksiyondan (bu durumda Blog koleksiyonundan) verileri alır. */
  const response = await api
    .get('/api/blogs')  /*  ==> /api/blogs endpoint'ine bir GET isteği gönderdim.. */
    .expect(200)        /*  ==> Gelen cevabın HTTP durum kodunun 200 olmasını bekledigimi belirttim.*/
    .expect('Content-Type', /application\/json/); /*  ==> Gelen cevabın Content-Type başlığının application/json olmasını bekledigimi belirttim.
                                                          Ve bu kontroller başarıyla geçerse gelen cevab `response` değişkenine  atanair.*/

  assert.strictEqual(response.body.length, blogsInDb.length);  /*  ==> Bu satır, `response.body.length` (gelen blogların sayısı) ile
                                                                          `initialBlogs.length` (başlangıç bloglarının sayısı) eşit olup olmadığını
                                                                          kontrol ediyor. Eğer eşit değillerse, test başarısız olur.
                                                                  */

  response.body.forEach(blog => {   /*  Bu kod blogu, her blog objesinin `id` özelliğinin tanımlı olup olmadığını kontrol eder. Eğer `id` özelliği
                                        tanımlı değilse, test başarısız olur.
                                    */
    assert.ok(blog.id);
  });
});

after(async () => {
  await mongoose.connection.close()
})