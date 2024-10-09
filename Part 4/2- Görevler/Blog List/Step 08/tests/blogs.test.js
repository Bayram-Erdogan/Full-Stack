const { test, after } = require('node:test')  /*  ==>   'node:test' modülünden 'test' ve 'after' fonksiyonlarını içe aktarır.*/
const mongoose = require('mongoose')          /*  ==>   Mongoose kütüphanesini içe aktarır. Mongoose, MongoDB ile çalışmayı kolaylaştıran bir
                                                        kütüphanedir.*/
const supertest = require('supertest')        /*  ==>   Supertest kütüphanesini içe aktarır. Bu kütüphane HTTP assertion testleri yapmayı
                                                        kolaylaştırır.*/
const app = require('../app')                 /*  ==> '../app' dosyasını içe aktarır. Bu dosya genellikle Express.js uygulamanızı tanımlar.*/
const api = supertest(app)                    /*  ==> Supertest ile app (Express uygulaması) üzerinde test yapabilmek için bir API oluşturur.*/

test('blogs are returned as json', async () => {  /*  ==> 'node:test' modülünden 'test' fonksiyonunu kullanarak bir test tanımlar. Testin adı:
                                                                'bloglar JSON olarak döndürülüyor'.*/
  await api
    .get('/api/blogs')                        /*  ==> '/api/blogs' endpointine bir GET isteği gönderir.*/
    .expect(200)                              /*  ==> İstek sonucunda HTTP durum kodunun 200 (OK) olmasını bekler.*/
    .expect('Content-Type', /application\/json/)  /*  ===>  Ve ayrıca dönen içeriğin JSON formatında olmasını bekler.*/
})

after(async () => {                           /*  ==> Tüm testler bittikten sonra çalışacak bir 'after' bloğu tanımlar.*/
  await mongoose.connection.close()           /*  ==> Mongoose bağlantısını kapatır. Bu, veritabanı bağlantısını temizlemek için gereklidir.*/
})