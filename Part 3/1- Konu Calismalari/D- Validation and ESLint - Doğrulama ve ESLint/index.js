/*
**************************************************** 1- Validation and ESLint - Doğrulama ve ESLint ****************************************************

const express = require("express");
const app = express();
const cors = require("cors");
const Note = require("./models/note")


app.use(express.static("dist"));
app.use(cors());
app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get('/api/notes/:id', (request, response, next) => {

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


app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;

  return maxId + 1;
};

#############################################

  Post isleminde degisiklikler yapildi eski hali # icine alindi

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})
#############################################

app.post('/api/notes', (request, response, next) => {         Kısıtlamalardan birini ihlal eden bir nesneyi veritabanında saklamaya çalışırsak,
                                                              işlem bir istisna atacaktır. Yeni bir not oluşturmak için işleyicimizi değiştirelim,
                                                              böylece olası istisnaları hata işleyici ara yazılımına iletelim:
  const body = request.body

  if (body.content === undefined) {                           Genellikle uygulamamızın veritabanında saklanan verilere uygulamak istediğimiz
                                                              kısıtlamalar vardır. Uygulamamız, içerik özelliği eksik veya boş olan notları
                                                              kabul etmemelidir. Notun geçerliliği rota işleyicisinde kontrol edilir:

    return response.status(400).json({ error: 'content missing' })    Notun content özelliği yoksa talebe 400 bad request durum koduyla
                                                                        yanıt veririz.


      Verinin biçimini, veritabanında saklanmadan önce doğrulamanın daha akıllı bir yolu, Mongoose'da bulunan doğrulama işlevini kullanmaktır.
      Bunun icin Şemadaki her alan için özel doğrulama kuralları tanımlayabiliriz:

      mongo.js noteSchema'da degisiklik yapildi. 1. Degisiklik olarak kayda girildi.


  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
  .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

#############################################

  Eski put # icine alindi

app.put('/api/notes/:id', (request, response, next) => {
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

#############################################
  Artık arka uçta bir sorun olduğunu fark ettik: Bir notu düzenlerken doğrulamalar yapılmıyor. Belgeler , findOneAndUpdate ve ilgili yöntemler
  yürütüldüğünde doğrulamaların varsayılan olarak çalıştırılmadığını açıklayarak sorunu giderir .

  Düzeltmesi kolaydır. Rota kodunu da biraz yeniden formüle edelim:

app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})
################################

Eski errorHandler # icine alindi

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

#############################
Bu doğrulama hatalarıyla başa çıkmak için hata işleyiciyi genişletelim:
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })

  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/api/notes`);
});

******************************* 2- Deploying the database backend to production - Veritabanı arka ucunu üretime dağıtma ********************************

  Render kullanırken, veritabanı URL'si kontrol panelinde uygun env tanımlanarak verilir. Bunu MONGODB_URI olarak envoironment'e vermistim.


*********************************************************************** 3- Lint ************************************************************************

  Genel olarak lint veya linter, stilistik hatalar da dahil olmak üzere programlama dillerindeki hataları algılayan ve işaretleyen herhangi bir araçtır.
  Tüy benzeri davranış terimi bazen şüpheli dil kullanımını işaretleme sürecine uygulanır. Lint benzeri araçlar genellikle kaynak kodun statik analizini
  gerçekleştirir.

  JavaScript evreninde, statik analiz için mevcut önde gelen araç ("linting" olarak da bilinir) ESlint'tir. ESlint'i, şu komutla notların arka uç
  projesine bir geliştirme bağımlılığı olarak yükleyelim:

  npm install eslint --save-dev

  Bundan sonra şu komutla varsayılan bir ESlint yapılandırmasını başlatabiliriz:

  npx eslint --init



  1- npm install eslint --save-dev ile eslinti kurdum.
  2- npx eslint --init ile eslinti baslattim ve bana bazi sorular sordu. Sorulara asagidaki gibi cevaplar verdim.
      a) Ok to proceed? (y) => y
      b) How would you like to use ESLint? => To check syntax and find problems
      c) What type of modules does your project use? => CommonJS (require/exports)
      d) Which framework does your project use? => None of these
      e) Does your project use TypeScript? => No
      f) Where does your code run? => Node
      g) Would you like to install them now? => Yes
      h) Which package manager do you want to use? => npm

  3- npm install --save-dev @stylistic/eslint-plugin-js ile Kod stiliyle ilgili bir dizi kuralı tanımlayan bir eklenti yükledim.
  4- npx eslint ./index.js ile kodumu calistirdim ve asagidali gibi basit uyarilar aldim.

  C:\Users\bayra\Desktop\Ön calisma\full stack\Part 3\1- Konu Calismalari\D- Validation and ESLint - Doğrulama ve ESLint\index.js
  289:11  error  'result' is defined but never used               no-unused-vars
  295:7   error  'generateId' is assigned a value but never used  no-unused-vars
  354:14  error  'process' is not defined                         no-undef

✖ 3 problems (3 errors, 0 warnings)




/* eslint-disable no-undef */         /* ==>  Bu satir   347:14  error  'process' is not defined  no-undef hatasini görmezden gelmek icin eklendi.
                                              Daha sonra eslint.config.mjs asagidaki gibi tasindi.
                                              rules:{
                                                'no-undef':0
                                              }

  5-  Linting için ayrı bir npm betiği oluşturulması önerilir, böylece npm run lint komutu projedeki her dosyayı kontrol edecek hale gelir.
      Bunun icin; package.json dosyasi icindeki scripts asagidaki eklenti eklenir.

  {
  // ...
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    // ...

    "lint": "eslint ."      ==> Bu satir eklendi.
  },
  // ...
}
*/
//  6- dist dosyasini ignore etmek icin eslint.config.mjs icine

//  ust satirda kodlar var
//  {
//    ignores : ["dist/**/*", "node_modules/**/*"]  ==>   Bu satir eklendi böylece dist ve node_modules ignore edildi.
//  }

/*
{
    plugins :{stylistic},
    rules:{
      'no-undef':0,
      'eqeqeq': 'error',                                            ==> Gerekli aciklama eslint.config.mjs icindeyapildi.
      "no-trailing-spaces": "error",                                ==> Gerekli aciklama eslint.config.mjs icindeyapildi.
      "object-curly-spacing": ["error", "always"],                  ==> Gerekli aciklama eslint.config.mjs icindeyapildi.
      "arrow-spacing": ["error", { before: true, after: true }],    ==> Gerekli aciklama eslint.config.mjs icindeyapildi.
    },
  },

*/




const express = require("express");
const app = express();
const cors = require("cors");
const Note = require("./models/note")


app.use(express.static("dist"));
app.use(cors());
app.use(express.json());

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get('/api/notes/:id', (request, response, next) => {

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


app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    /*
    EsLint öncesi hali bu idi.
    .then((result) => {
      response.status(204).end()
    })
    .catch(error => next(error))*/

    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/notes', (request, response, next) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
  .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })

  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/api/notes`);
});