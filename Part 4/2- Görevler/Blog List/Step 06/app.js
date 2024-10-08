/*
    Bu kod dosyası, Express uygulamasının yapılandırılmasını ve temel işlemlerini gerçekleştiren ana dosyadır.

    Express uygulaması, belirli bir port üzerinde çalışan bir HTTP sunucusu olarak davranır ve belirli istekleri
    işlemek için yönlendiricileri ve ara yazılımları kullanır.

    Uygulama başlatıldığında, bu dosya yürütülür ve sunucu belirtilen bağlantı noktasında çalışmaya başlar. Bu, temel
    yapılandırmaların ve middleware'lerin bir araya getirildiği yerdir ve uygulamanın genel akışını belirler.

*/

const config = require('./utils/config')        /*  ==> Bu satır, yapılandırma dosyasını içe aktarır. Yapılandırma
                                                        dosyası, uygulamanın çeşitli ayarlarını (örneğin, MongoDB URI'si,
                                                        bağlantı noktası vb.) içerir.
                                                */

const express = require('express')              /*  ==> Bu satir ile Express modülü uygulamaya dahil edilir. */

const app = express()                           /*  ==> Bu satir ile Express uygulaması oluşturulur. */

const cors = require('cors')                    /*  ==> CORS (Cross-Origin Resource Sharing) modülü uygulamaya dahil
                                                        edilir. Bu, uygulamanın farklı kökenlerden gelen istekleri kabul
                                                        etmesini sağlar.
                                                */

const blogsRouter = require('./controllers/blogs')  /*  ==> Bu satir ileBlog yönlendiricisi, bloglarla ilgili HTTP
                                                            isteklerini işlemek üzere içe aktarılır.
                                                    */

const mongoose = require('mongoose')            /*  ==> Bu satir ile  Mongoose modülü MongoDB veritabanına bağlanmak
                                                        için kullanılır. */

mongoose.set('strictQuery', false)              /*  ==> Bu satir ile  Mongoose sorgularının katı modunu devre dışı
                                                        bırakılir. Bu, MongoDB'ye yapılan sorguların daha esnek
                                                        olmasını sağlar.
                                                */

mongoose.connect(config.MONGODB_URI)            /*  MongoDB'ye bağlanma işlemi gerçekleştirilir ve bağlantı başarılı
                                                    olduğunda bir bilgi günlüğü oluşturulur, aksi takdirde bir hata
                                                    günlüğü oluşturulur */
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())                         /*  ==> Bu satir ile CORS ara yazılımı uygulamaya eklenir. Bu, uygulamanın
                                                farklı kökenlerden gelen istekleri kabul etmesini sağlar.
                                        */

app.use(express.json())                 /*  ==> Bu satir ile Express uygulamasının JSON verilerini işleyebilmesi için
                                                gerekli olan ara yazılım eklenir.
                                        */

app.use('/api/blogs', blogsRouter)      /*  ==> Bu satir ile /api/blogs yoluna gelen isteklerin blog yönlendiricisine
                                                yönlendirilmesi sağlanır.
                                        */


module.exports = app                    /*  ==> Bu satir ile Express uygulaması dışa aktarılır. Bu, uygulamanın başka
                                                dosyalarda kullanılabilmesini sağlar.
                                        */