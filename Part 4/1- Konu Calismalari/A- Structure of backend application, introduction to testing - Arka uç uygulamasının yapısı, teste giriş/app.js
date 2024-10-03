/*
    Tabii, bu kod parçası bir Express.js uygulamasının ana dosyasıdır ve çeşitli modülleri yükleyerek, MongoDB veritabanına bağlanarak ve gerekli
    middleware'leri tanımlayarak uygulamayı yapılandırır.
*/

//    Gerekli Modüllerin Yüklenmesi
const config = require('./utils/config')            //  ==> Uygulamanın yapılandırma ayarlarını içerir (örneğin, MongoDB URI'si).
const express = require('express')                  //  ==> Express.js framework'ünü yükler.
const app = express()                               //  ==> Express uygulamasını oluşturur.
const cors = require('cors')                        //  ==> CORS (Cross-Origin Resource Sharing) middleware'ini yükler.
const notesRouter = require('./controllers/notes')  //  ==> Notlar için tanımlanan router'ı yükler
const middleware = require('./utils/middleware')    //  ==> Özel middleware fonksiyonlarını içerir (örneğin, request logger, error handler).
const logger = require('./utils/logger')            //  ==> Uygulama boyunca loglama işlevlerini gerçekleştiren modül.
const mongoose = require('mongoose')                //  ==> MongoDB ile çalışmak için kullanılan Mongoose ORM.


//MongoDB Bağlantısı
mongoose.set('strictQuery', false)                  //  ==> Mongoose'un strict query modunu kapatır. Bu, daha esnek sorgulamalara izin verir.

logger.info('connecting to', config.MONGODB_URI)    //  ==> MongoDB'ye bağlanma girişimini loglayarak ekrana yazdirir.

mongoose.connect(config.MONGODB_URI)                //  ==> MongoDB veritabanına bağlanır.
  .then(() => {                                     //  ==> Bağlantı başarılı olursa, başarılı bağlantı mesajını ekrana yazdirir.
    logger.info('connected to MongoDB')
  })
  .catch((error) => {                               //  ==> ağlantı hatası olursa, hata mesajını ekrana yazdirir.
    logger.error('error connecting to MongoDB:', error.message)
  })

//Middleware Kullanımı ve Route Tanımlamaları
app.use(cors())                     //  ==> CORS middleware'i kullanılarak, farklı origin'lerden gelen isteklerin kabul edilmesi sağlanır.
app.use(express.static('dist'))     /*  ==> dist klasörünü statik dosya sunucusu olarak kullanır. Bu, genellikle derlenmiş frontend dosyalarını sunmak için
                                            kullanılır.*/
app.use(express.json())             //  ==> Gelen isteklerin JSON formatında parse edilmesini sağlar.
app.use(middleware.requestLogger)   //  ==> Her isteği loglayan özel middleware fonksiyonunu kullanır.
app.use('/api/notes', notesRouter)  //  ==> /api/notes yolundaki istekler için notesRouter'ı kullanır. Bu, notlar ile ilgili tüm CRUD işlemlerini yönetir.
app.use(middleware.unknownEndpoint) //  ==> Tanımlanmamış endpoint'lere yapılan istekler için özel middleware fonksiyonunu kullanır.
app.use(middleware.errorHandler)    //  ==> Hata durumlarında özel hata işleyici middleware fonksiyonunu kullanır.

//Uygulamanın Dışa Aktarılması
module.exports = app

/*
    Özet
    Bu kod parçası, bir Express.js uygulamasının ana yapılandırma dosyasıdır. Aşağıdaki işlemleri gerçekleştirir:

    Gerekli modülleri yükler.
    MongoDB'ye bağlanır ve bağlantı durumunu ekrana yazdirir.
    CORS, statik dosya sunma ve JSON parselleme gibi temel middleware'leri tanımlar.
    Notlar için CRUD işlemlerini yöneten bir router tanımlar.
    Tanımlanmamış endpoint'ler ve hata durumları için özel middleware'ler kullanır.
    Uygulamayı dışa aktararak başka dosyalarda kullanılabilir hale getirir.
*/