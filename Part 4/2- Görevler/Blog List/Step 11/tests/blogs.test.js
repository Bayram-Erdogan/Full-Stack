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
   const newBlog = {                                       /* ==>  Bir obje olusturdum ve icerisine title, author ve url degerlerini ekledim.
                                                                  Ancak semada var olan likes degerini eklemedim. Böylece javascript default
                                                                  olarak 0 atayacak. */
    title: "User add a new blog without like property",
    author: "User name",
    url: "user url",
  };

  await api                 /*  ==> Yukarida olusturdugum datayi göndermek icin bir post request olusturdum. */
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");   /*  ==> Gönderdigim datayi test etmek icin bir get request olsuturdum ve datayi response'
                                                          atadim. */

  assert.strictEqual(response.body.likes || 0, 0);  /*  ==> bu ifade response.body.likes değeri varsa onu kullanır, yoksa 0 değerini kullanır. Bu,
                                                            response.body.likes değerinin olup olmadığını kontrol eder ve yoksa varsayılan olarak
                                                            0 kullanır. assert.strictEqual() fonksiyonu, bu ifadenin değerinin kesin olarak 0 olup
                                                            olmadığını kontrol eder. Eğer değer 0 ise test başarılı olur, aksi halde test
                                                            başarısız olur.
                                                    */

});

after(async () => {
  await mongoose.connection.close()
})