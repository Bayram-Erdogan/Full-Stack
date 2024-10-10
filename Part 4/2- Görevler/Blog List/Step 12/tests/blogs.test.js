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
  const newBlog = {       /*  ==> title icerigi olmayan bir blog objesi olusturdum.*/
    author: "User name",
    url: "user url",
    likes:8
  };

  await api               /*  ==> olusturdugum blogu gönderdim ve yanit olarak status kodunu 400 bekledigimi belirttim. */
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");   /*  ==> Gönderme isleminden sonra verileri get edip response degiskenine atadim. */
  assert.strictEqual(response.body.length, blogsInDb.length);  /*  ==> Daha sonra response body uzunlugu ile ilk bastaki uzunlugu
                                                                          karsilatirdim. Uzunluk esit ise test gecer, esit degilse test gecmez
                                                                          cunku basliksiz veriyi kaydetmis anlamina gelir. */
});

test("Post request without url  ", async () => {
  const blogsInDb = await Blog.find({});
  const newBlog = {       /*  ==> url icerigi olmayan bir blog objesi olusturdum.*/
    title : "Test for whitout url",
    author: "User name",
    likes:8
  };

  await api               /*  ==> olusturdugum blogu gönderdim ve yanit olarak status kodunu 400 bekledigimi belirttim. */
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");   /*  ==> Gönderme isleminden sonra verileri get edip response degiskenine atadim. */
  assert.strictEqual(response.body.length, blogsInDb.length);  /*  ==> Daha sonra response body uzunlugu ile ilk bastaki uzunlugu
                                                                          karsilatirdim. Uuznluk esit ise test gecer, esit degilse test gecmez
                                                                          cunku basliksi veriyi kaydetmis anlamina gelir. */
});

after(async () => {
  await mongoose.connection.close()
})