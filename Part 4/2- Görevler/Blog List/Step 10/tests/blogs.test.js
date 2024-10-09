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
  const newBlog = {                 /*  ==> yeni bir blog göndermek icin datami olusturdum. Ve onu bir ojeye yerlestirdim.*/
    title: "User add a new blog",
    author: "User name",
    url: "user url",
    likes: 5,
  };

  await api
    .post("/api/blogs") /*  ==> Gönderilecek olan endpoint'i verdim */
    .send(newBlog)      /*  ==> send ile olusturdugum datayi gönderdim. */
    .expect(201)        /*  ==> Bekledigim status code'un 201 oldugunu belirttim */
    .expect("Content-Type", /application\/json/); /*  ==> Bekledigim content type'in application json oldugunu belirttim */

  const response = await api.get("/api/blogs");   /*  ==> Göndermis oldugum datayi test etmek icin verileri get ettim. */
  const titles = response.body.map((r) => r.title); /*  ==> title'lari alarak bir titles dizi'sine yerlestirdim. */
  assert.strictEqual(response.body.length, blogsInDb.length + 1);  /*  ==> Mevcut dizi uzunlugu ile aldigim yeni dizinin uzunlugunu 1 artiigini
                                                                           dogruladim.*/

  assert(titles.includes("User add a new blog"));             /*  titles dizisinin vermis oldugum dize yi icerdigini dogruladim. */
});

after(async () => {
  await mongoose.connection.close()
})