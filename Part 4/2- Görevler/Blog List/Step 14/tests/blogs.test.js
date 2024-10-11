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
  const blogsInDb = await Blog.find({});
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  assert.strictEqual(response.body.length, blogsInDb.length);

  response.body.forEach(blog => {
    assert.ok(blog.id);
  });
});

test("a valid blog can be added", async () => {
  const blogsInDb = await Blog.find({});
  const newBlog = {
    title: "User add a new blog",
    author: "User name",
    url: "user url",
    likes: 5,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const titles = response.body.map((r) => r.title);

  assert.strictEqual(response.body.length, blogsInDb.length + 1);
  assert(titles.includes("User add a new blog"));
});

test("if likes is missing, it default is 0  ", async () => {
   const newBlog = {
    title: "User add a new blog without like property",
    author: "User name",
    url: "user url",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.likes || 0, 0);

});

test("Post request without title  ", async () => {
  const blogsInDb = await Blog.find({});
  const newBlog = {
    author: "User name",
    url: "user url",
    likes:8
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, blogsInDb.length);
});

test("Post request without url  ", async () => {
  const blogsInDb = await Blog.find({});
  const newBlog = {
    title : "Test for whitout url",
    author: "User name",
    likes:8
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, blogsInDb.length);
});

test('a blog can be deleted', async () => {
  const blogsInDb = await Blog.find({});
  const blogsAtStart  = await Blog.find({});
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await Blog.find({});

  const titles = blogsAtEnd.map(r => r.title)
  assert(!titles.includes(blogToDelete.title))

  assert.strictEqual(blogsAtEnd.length, blogsInDb.length - 1)
})

test('a blog can be updated', async () => {
  const blogsAtStart  = await Blog.find({});      /*  ==> test başlamadan önce veritabanında bulunan tüm blogları alır. helper.blogsInDb()
                                                          fonksiyonu, veritabanındaki tüm blogları döner.
                                                  */
  const blogToUpdate = blogsAtStart[0];           /*  ==> güncellenecek blogu belirler. blogsAtStart dizisinin ilk elemanını seçer ve blogToUpdate
                                                          değişkenine atar.
                                                  */

  const updatedBlogData = { likes: blogToUpdate.likes + 1 };  /*  ==> Güncelleme için kullanılacak verileri belirler. Bu durumda, blogun beğeni
                                                                      sayısını bir artırır.
                                                              */

  const response = await api    /*  ==> belirli bir blogun güncellenmesini sağlayan HTTP PUT isteğini gerçekleştirir. işlemin sonucu response
                                        değişkenine atanır.
                                */
    .put(`/api/blogs/${blogToUpdate.id}`)     /*  ==> api.put(/api/blogs/${blogToUpdate.id}): Güncellenecek blogun URL'si.*/
    .send(updatedBlogData)                    /*  ==> .send(updatedBlogData): Güncellenmiş blog verilerini gönderir.*/
    .expect(200)                              /*  ==> .expect(200): HTTP durum kodunun 200 (Başarılı) olmasını bekler.*/
    .expect('Content-Type', /application\/json/); /*  ==> Yanıtın Content-Type başlığının application/json olmasını bekler.*/

  const updatedBlog = response.body;    /*  ==> Güncellenmiş blog verilerini response.body den alır ve updatedBlog değişkenine atar.*/

  assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 1);  /*  ==> güncellenmiş blogun beğeni sayısının beklenen değerle eşit olup
                                                                          olmadığını kontrol eder.*/


  /*  Özet
      Bu test, veritabanındaki ilk blogun beğeni sayısını bir artırır ve güncelleme işleminin başarılı olup olmadığını kontrol eder. Test, güncellemeisteği başarılı olduğunda ve yanıtın JSON formatında ve doğru içerikte olduğunda başarılı sayılır. Güncellenmiş blogun beğeni sayısı, orijinal
      beğeni sayısının bir fazlası olmalıdır.
  */
});

after(async () => {
  await Blog.deleteMany({});
  await mongoose.connection.close();
});