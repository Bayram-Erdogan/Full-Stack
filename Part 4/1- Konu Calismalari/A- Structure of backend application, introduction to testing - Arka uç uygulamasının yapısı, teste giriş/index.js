/*
************************** 1- Structure of backend application, introduction to testing - Arka uç uygulamasının yapısı, teste giriş **************************

************************************************************* A- Project structure - Proje yapısı ************************************************************

    Projemizin dizin yapısında değişiklik yaptığımızda aşağıdaki yapıya ulaşacağız:

    ├── index.js
    ├── app.js
    ├── dist
    │   └── ...
    ├── controllers
    │   └── notes.js
    ├── models
    │   └── note.js
    ├── package-lock.json
    ├── package.json
    ├── utils
    │   ├── config.js
    │   ├── logger.js
    │   └── middleware.js

    Şu ana kadar koddan farklı bilgileri yazdırmak için console.log ve console.error'ı kullandık. Ancak bu, işleri yapmanın pek iyi bir yolu değildir.
    Konsoldaki tüm yazdırma işlemlerini utils/logger.js modülüne ayıralım: Logger dosyasinin iki işlevi vardır; normal günlük mesajlarını yazdırmak için
    info ve tüm hata mesajları içine error islevleridir.

    const info = (...params) => {   ==>   normal günlük mesajlarını yazdırir. ...params ile belirtilen parametreler, bu fonksiyonun birden fazla ve her
                                          türden argüman alabileceğini ifade eder. Bu, JavaScript'in "rest parameter" (geriye kalan parametreler)
                                          sözdizimidir.
      console.log(...params)
    }

    const error = (...params) => {  ==>   hata mesajlarını yazdırir.
      console.error(...params)      ==>   console.error(...params) ifadesi, aldığı parametreleri JavaScript'in yerleşik console.error fonksiyonuna
                                          ileterek konsola hata mesajı olarak yazdırır. ...params, "spread operator" kullanılarak params dizisinin
                                          elemanlarını tek tek console.error'a geçirir.
    }

    module.exports = {              ==>   Bu fonksiyonları dışa aktarır, böylece başka dosyalarda kullanılabilir hale getirir.
      info, error
    }


    Ortam değişkenlerinin işlenmesi ayrı bir utils/config.js dosyasına çıkarılır:

    require('dotenv').config()

    const PORT = process.env.PORT
    const MONGODB_URI = process.env.MONGODB_URI

    module.exports = {
      MONGODB_URI,
      PORT
    }

    Uygulamanın diğer bölümleri, yapılandırma modülünü içe aktararak ortam değişkenlerine erişebilir:

    const config = require('./utils/config')

    logger.info(`Server running on port ${config.PORT}`)

    Uygulamayı başlatmak için kullanılan index.js dosyasının içeriği şu şekilde basitleştirilmiştir:

    const app = require('./app') // the actual Express application
    const config = require('./utils/config')
    const logger = require('./utils/logger')

    app.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`)

    index.js dosyası yalnızca asıl uygulamayı app.js dosyasından içe aktarır ve ardından uygulamayı başlatır. Logger modülünün info fonksiyonu,
    uygulamanın çalıştığını bildiren konsol çıktısı için kullanılır.


    Rota işleyicileri de özel bir modüle taşındı. Rotaların olay işleyicilerine genellikle Controllers adı verilir ve bu nedenle yeni bir Controllers
    dizini oluşturduk. Notlarla ilgili tüm rotalar artık Controllers dizini altındaki Notes.js modülünde bulunmaktadır .

    Notes.js modülünün içeriği aşağıdaki gibidir:

    const notesRouter = require('express').Router()       ==>   notesRouter: Express.js'in Router fonksiyonunu kullanarak yeni bir router oluşturur.
    const Note = require('../models/note')                ==>   Veritabanındaki notlar için kullanılan model ice aktarilir.

    notesRouter.get('/', (request, response) => {
      Note.find({}).then(notes => {
        response.json(notes)
      })
    })

    notesRouter.get('/:id', (request, response, next) => {   ==>  notesRouter araciligi ile get request yapilir.
      Note.findById(request.params.id)
        .then(note => {
          if (note) {
            response.json(note)
          } else {
            response.status(404).end()
          }
        })
        .catch(error => next(error))
    })

    notesRouter.post('/', (request, response, next) => {
      const body = request.body

      const note = new Note({
        content: body.content,
        important: body.important || false,
      })

      note.save()
        .then(savedNote => {
          response.json(savedNote)
        })
        .catch(error => next(error))
    })

    notesRouter.delete('/:id', (request, response, next) => {   ==>   Rota işleyicilerindeki yolların kısaldığını belirtmekte fayda var. Önceki
                                                                      versiyonda şunları yaptık:

                                                                      app.delete('/api/notes/:id', (request, response, next) => {

                                                                      Ve mevcut sürümde şunlara sahibiz:

                                                                      notesRouter.delete('/:id', (request, response, next) => {
      Note.findByIdAndDelete(request.params.id)
        .then(() => {
          response.status(204).end()
        })
        .catch(error => next(error))
    })

    notesRouter.put('/:id', (request, response, next) => {
      const body = request.body

      const note = {
        content: body.content,
        important: body.important,
      }

      Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
          response.json(updatedNote)
        })
        .catch(error => next(error))
    })

    module.exports = notesRouter



    Gerçek uygulamayı oluşturan app.js dosyası , yönlendiriciyi aşağıda gösterildiği gibi kullanıma alır:

    const notesRouter = require('./controllers/notes')
    app.use('/api/notes', notesRouter)

    İsteğin URL'si /api/notes ile başlıyorsa daha önce tanımladığımız yönlendirici kullanılır . Bu nedenle, NotesRouter nesnesinin yalnızca rotaların
    ilgili bölümlerini, yani boş yolu / veya yalnızca /:id parametresini tanımlaması gerekir .

    Bu değişiklikleri yaptıktan sonra app.js dosyamız şu şekilde görünecektir:

    const config = require('./utils/config')
    const express = require('express')
    const app = express()
    const cors = require('cors')
    const notesRouter = require('./controllers/notes')
    const middleware = require('./utils/middleware')
    const logger = require('./utils/logger')
    const mongoose = require('mongoose')

    mongoose.set('strictQuery', false)

    logger.info('connecting to', config.MONGODB_URI)

    mongoose.connect(config.MONGODB_URI)
      .then(() => {
        logger.info('connected to MongoDB')
      })
      .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
      })

    app.use(cors())
    app.use(express.static('dist'))
    app.use(express.json())
    app.use(middleware.requestLogger)

    app.use('/api/notes', notesRouter)

    app.use(middleware.unknownEndpoint)
    app.use(middleware.errorHandler)

    module.exports = app



    Özel ara yazılımımız yeni bir utils/middleware.js modülüne taşındı :

    const logger = require('./logger')

    const requestLogger = (request, response, next) => {
      logger.info('Method:', request.method)
      logger.info('Path:  ', request.path)
      logger.info('Body:  ', request.body)
      logger.info('---')
      next()
    }

    const unknownEndpoint = (request, response) => {
      response.status(404).send({ error: 'unknown endpoint' })
    }

    const errorHandler = (error, request, response, next) => {
      logger.error(error.message)

      if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
      } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
      }

      next(error)
    }

    module.exports = {
      requestLogger,
      unknownEndpoint,
      errorHandler
    }
    })

    Veritabanına bağlantı kurma sorumluluğu app.js modülüne verilmiştir . Modeller dizini altındaki note.js dosyası yalnızca notlar için Mongoose şemasını
    tanımlar.

    const mongoose = require('mongoose')

    const noteSchema = new mongoose.Schema({
      content: {
        type: String,
        required: true,
        minlength: 5
      },
      important: Boolean,
    })

    noteSchema.set('toJSON', {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      }
    })

    module.exports = mongoose.model('Note', noteSchema)

************************************************ B- Testing Node applications - Node uygulamalarını test etme ************************************************

    Birim testlerine bakarak test yolculuğumuza başlayalım. Uygulamamızın mantığı o kadar basit ki birim testlerle test etmenin pek bir anlamı yok. Yeni bir
    utils/for_testing.js dosyası oluşturalım ve test yazma pratiği için kullanabileceğimiz birkaç basit fonksiyon yazalım:

    const reverse = (string) => {
      return string
        .split('')
        .reverse()
        .join('')
    }

    const average = (array) => {
      const reducer = (sum, item) => {
        return sum + item
      }

      return array.reduce(reducer, 0) / array.length
    }

    module.exports = {
      reverse,
      average,
    }


    Günümüzde Node ayrıca kursun ihtiyaçlarına çok uygun olan yerleşik bir test kütüphanesi node:test'e sahiptir.

    Testin yürütülmesi için scripts dizisi icine npm komut dosyası testini tanımlayalım :

    {
      "scripts": {
        //...
        "test": "node --test"
      },
    }

    Testlerimiz için testler adı verilen ayrı bir dizin oluşturalım ve aşağıdaki içeriklere sahip revers.test.js adında yeni bir dosya oluşturalım :

    const { test } = require('node:test')
    const assert = require('node:assert')

    const reverse = require('../utils/for_testing').reverse

    test('reverse of a', () => {
      const result = reverse('a')

      assert.strictEqual(result, 'a')
    })

    test('reverse of react', () => {
      const result = reverse('react')

      assert.strictEqual(result, 'tcaer')
    })

    test('reverse of saippuakauppias', () => {
      const result = reverse('saippuakauppias')

      assert.strictEqual(result, 'saippuakauppias')
    })


    Ortalama işlevine ilişkin testleri, testler/ortalama.test.js adlı yeni bir dosyaya koyalım .

    const { test, describe } = require('node:test')

    // ...

    const average = require('../utils/for_testing').average

    describe('average', () => {
      test('of one value is the value itself', () => {
        assert.strictEqual(average([1]), 1)
      })

      test('of many is calculated right', () => {
        assert.strictEqual(average([1, 2, 3, 4, 5, 6]), 3.5)
      })

      test('of empty array is zero', () => {
        assert.strictEqual(average([]), 0)
      })
    })

*/

const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port http://localhost:${config.PORT}`)
})