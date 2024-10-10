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
  /*const blogsAtStart = await helper.blogsInDb()     ==> helper.blogsInDb(): Bu yardımcı fonksiyon, veritabanındaki tüm blog gönderilerini
                                                          döndürür.
                                                          await: Asenkron fonksiyonun tamamlanmasını bekler.
                                                          blogsAtStart: Testin başında veritabanındaki tüm blog gönderilerini içeren bir dizi.
                                                  */
  const blogsInDb = await Blog.find({});
  const blogsAtStart  = await Blog.find({});
  const blogToDelete = blogsAtStart[0]            /*  ==> blogsAtStart[0]: Testin başında veritabanında bulunan ilk blog gönderisini seçer ve
                                                          silinecek blog olarak belirler.
                                                  */

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)      /*  ==> api.delete(/api/blogs/${blogToDelete.id}): supertest kullanarak belirtilen blog ID'sine
                                                          sahip blog gönderisini silmek için bir HTTP DELETE isteği gönderir.
                                                  */
    .expect(204)                                  /*  ==> .expect(204): İsteğin başarılı olmasını ve 204 No Content durum kodu ile sonuçlanmasını
                                                          bekler.*/

  const blogsAtEnd = await Blog.find({});     /*  ==> Blog gönderisi silindikten sonra, helper.blogsInDb() fonksiyonunu tekrar çağırarak
                                                          veritabanındaki mevcut blog gönderilerini alır.
                                                          blogsAtEnd: Blog gönderisi silindikten sonra veritabanındaki tüm blog gönderilerini içeren bir dizi.
                                                  */

  const titles = blogsAtEnd.map(r => r.title)     /*  ==> blogsAtEnd.map(r => r.title): blogsAtEnd dizisindeki her blog gönderisinin başlığını
                                                          içeren yeni bir dizi oluşturur.
                                                          titles: Blog gönderilerinin başlıklarını içeren bir dizi.
                                                  */
  assert(!titles.includes(blogToDelete.title))    /*  ==> assert(!titles.includes(blogToDelete.title)): titles dizisinin, silinen blog
                                                          gönderisinin başlığını içermediğini doğrular. Bu, blogun gerçekten silindiğini kontrol
                                                          eder. Bu doğrulama başarısız olursa, test hata verir.
                                                  */

  assert.strictEqual(blogsAtEnd.length, blogsInDb.length - 1) /*  ==> assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length
                                                                                - 1): Silme işleminden sonra veritabanındaki blog sayısının
                                                                                başlangıçtaki blog sayısından bir eksik olduğunu doğrular. helper.
                                                                                initialBlogs.length: Testin başında belirlenen başlangıç blog
                                                                                sayısını döndürür. Bu doğrulama başarısız olursa, test hata verir.
                                                                        */

  /*
  Özet
      Bu test, bir blog gönderisini başarıyla silebildiğinizi kontrol eder. Test, silme işleminin başarılı olduğunu doğrulamak için
      veritabanındaki blog sayısını ve başlıkları kontrol eder. Testin başında ve sonunda veritabanındaki blog gönderilerini alır, ardından
      belirtilen blog gönderisini siler ve bu blogun gerçekten silindiğini ve veritabanındaki toplam blog sayısının azaldığını doğrular.
  */
})

after(async () => {
  await mongoose.connection.close()
})