/*
*********************************************** C- Saving data to MongoDB - Verileri MongoDB'ye kaydetme ***********************************************

*********************** 1 - MongoDB ***********************

    Kaydedilen notlarımızı süresiz olarak saklamak için bir veritabanına ihtiyacımız var. Bunun icin belge veritabanı olan MongoDB'yi kullanacağız.
    MongoDB'yi bilgisayarımiza kurup çalıştırabiliriz. Ancak internet aynı zamanda kullanabileceğiniz Mongo veritabanı hizmetleriyle de doludur. Bu
    yuzden tercih edecegimiz MongoDB sağlayıcısı MongoDB Atlas olacaktır.

    1-  Ilk olarak https://www.mongodb.com/atlas/database adresine giderek ucretsiz (free shared) bir hesap actim.
    2-  Bulut sağlayıcısını (aws) ve konumunu (Stockholm) seçerek kümeyi oluşturdum.
    3-  Kullanici adi ve sifresi olusturdum.
    4-  Security sekmesi altindan Network Access'i secerek tum ip adreslerinden ( Allow access from anywhere ) ulasimi sectim.
    5-  Deployment sekmesi altinda databases'i secerek connect ile baglantimi gerceklestirdim.

        Baglanti esnasinda bana verdigi adresi kullanacagim icin kopyaladim.
        mongodb+srv://(kullaniciAdi):(kullaniciSifresi)@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority

        Suana kadar yaptiklarim ile veritabani kullanima hazir oldu.

    6-  Uygulamamda mongoose'i kullanacagim icin terminalde npm install mongoose yazarak uygulama mongoosu yukledim.
    7-  Pratik bir uygulama yapmak icin note projemin arka uç uygulamasının kökünde mongo.js adında yeni bir dosya oluşturdum. Ve bu dosyaya asagidaki
        kodu yapistirdim.

const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]      ==>   Bu satir sifremi bir degiskenine atadigim satirdir.

 const url =                          ==>   Bu satir ise daha önce kopyaladigim url'i url degiskenine atadigim satirdir. url alt satirda.
   `mongodb+srv://Bayram:${password}@cluster0.6fddm3a.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`



mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is easy',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})

    Yukarida ki kod ile database'ime content: 'HTML is easy', important: true, bilgilerini göndermis oldum. Database'imde bu veriyi görmek icin
    Browse collections butonuna tiklayip verilerimi görebiliyorum.

*********************** 2 - Schema - Sema ***********************

    Veritabanına bağlantı kurulduktan sonra bir notun şemasını ve eşleşen modeli tanımlıyoruz :

    const noteSchema = new mongoose.Schema({      ==> noteSchema değişkeninde saklanan bir notun şemasını tanımlarız. Şema, Mongoose'a not
                                                      nesnelerinin veritabanında nasıl saklanacağını anlatır.
      content: String,
      important: Boolean,
    })

    const Note = mongoose.model('Note', noteSchema) ==> Note modeli tanımında ilk "Note" parametresi modelin tekil adıdır. Mongoose kuralı olarak
                                                        şema onlara tekil olarak atıfta bulunduğunda (örneğin Note ) koleksiyonları otomatik
                                                        olarak çoğul olarak adlandıracaktır (örneğin, notes ).

    Mongo gibi belge veritabanları şemasızdır , yani veritabanının kendisi, veritabanında depolanan verilerin yapısını umursamaz. Tamamen farklı
    alanlara sahip dokümanları aynı koleksiyonda saklamak mümkündür. Ancak Mongoose'un arkasındaki fikir, veritabanında saklanan verilere,
    herhangi bir koleksiyonda saklanan belgelerin şeklini tanımlayan uygulama düzeyinde bir şema verilmesidir.

*********************** 3 - Creating and saving objects - Nesneleri oluşturma ve kaydetme ***********************

      Daha sonra uygulamada, Note modelinin yardımıyla yeni bir not nesnesi oluşturulur :

      const note = new Note({
        content: 'HTML is Easy',
        important: false,
      })

      Modeller, sağlanan parametrelere göre yeni JavaScript nesneleri oluşturan yapıcı işlevlerdir. Nesneler modelin yapıcı işleviyle oluşturulduğundan,
      nesneyi veritabanına kaydetme yöntemlerini de içeren modelin tüm özelliklerine sahiptirler.

      Nesnenin veritabanına kaydedilmesi, uygun şekilde adlandırılmış save yöntemiyle gerçekleşir ve bu, then yöntemiyle bir olay işleyicisiyle
      sağlanabilir :

      note.save().then(result => {    ==>   Nesne veritabanına kaydedildiğinde, sağlanan olay işleyicisi çağrılır. Kaydetme işleminin sonucu, olay
                                            işleyicisinin result parametresindedir.
        console.log('note saved!')
        mongoose.connection.close()   ==>   Olay işleyicisi veritabanı bağlantısını bu komutla kapatır. Bağlantı kapatılmazsa programın yürütülmesi
                                            hiçbir zaman tamamlanmayacaktır.
      })

*********************** 4 - Fetching objects from the database - Veritabanından nesneleri getirme ***********************

        Bu bölum icin gerekli degisiklikler mongo.js dosyasinda yapilmistir.

*********************** 5 - Connecting the backend to a database - Arka ucu bir veritabanına bağlama ***********************

const express = require('express')
const app = express()
const cors = require('cors')

####################################################################################

# arasinda yazilan kod blogu ile Mongoose tanımlarını kopyalayıp index.js dosyasına yapıştırdik.


const mongoose = require('mongoose')
const password = process.argv[2]

 const url =
   `mongodb+srv://Bayram:${password}@cluster0.6fddm3a.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON', {                               ==>   Bi kod blogu şemanın toJSON yöntemini değiştirmek icin eklendi.
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)
####################################################################################
app.use(cors())
app.use(express.json())

let notes = [
      {
        id: 1,
        content: "HTML is easy",
        important: true
      },
      {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
      },
      {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
      }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

##############################################################

  Daha sonranTüm notları almak için kullandigimiz (asagidaki get method) işleyiciyi

// app.get('/api/notes', (request, response) => {   ==> Bu hali eski halidir.
//   response.json(notes)
// })

app.get('/api/notes', (request, response) => {    ==> bu sekilde forma guncelledik.
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

    Böylece mongo.js dosyasi uzerinden database'e gönderdigimiz note'lari tarayıcıda görebilir hale geldik. Tarayicimizda arka uca gittigimizde
    notu'muz asagidaki gibi görunur.

    {
      _id: "662f364285c6a4a4b85fde5c",      ==>   Ön uç, her nesnenin kimlik alanında benzersiz bir kimliğe sahip olduğunu varsayar.
      content: "HTML is easy",
      important: true,
      __v: 0                                ==>   mongo sürüm oluşturma alanı __v'yi ön uca döndürmek istemiyoruz. Mongoose tarafından döndürülen
                                                  nesneleri biçimlendirmenin bir yolu, o şemayla üretilen modellerin tüm örneklerinde kullanılan
                                                  şemanın toJSON yöntemini değiştirmektir. Yöntemi değiştirmek için şemanın yapılandırılabilir
                                                  seçeneklerini değiştirmemiz gerekir, seçenekler şemanın ayarlanan yöntemi kullanılarak
                                                  değiştirilebilir
    },

##############################################################

app.get('/api/notes/:id', (request, response) => {

  const id = Number(request.params.id)

  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
     response.status(404).end()
  }

})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()

})

const generateId = () => {

  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0

  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body
  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}/api/notes`)})


*********************** 6 - Moving db configuration to its own module - Db konfigürasyonunu kendi modülüne taşıma ***********************

    Bu bölum icin note.js dosyasi olusturulup icerisine index.js'den bazi kodlar tasinmis ve bazi degisiklikler yapilmisitir.

*********************** 7 - Using database in route handlers - Rota işleyicilerinde veritabanını kullanma ***********************

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

app.get("/api/notes/:id", (request, response) => {

  Note.findById(request.params.id).then((note) => {
    if (note) {
      response.json(note);
    } else {
      response.status(404).json({
        error: "no note found",
        request: {
          id: request.params.id,
        },
      });
    }
  });
});

app.delete("/api/notes/:id", (request, response) => {
    Note.deleteOne({_id:request.params.id}).then(() => {
    response.status(204).end()
  })
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;

  return maxId + 1;
};

#####################################

  Önceki hali asagidaki gibi olan post islemi degistirilmistir.

app.post("/api/notes", (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});
#####################################


app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({                 ==>   Not nesneleri, Not yapıcı işleviyle oluşturulur.
    important: body.important || false,
  })

  note.save().then(savedNote => {         ==>   Yanıt, kaydetme işlemi için geri arama işlevinin içine gönderilir. Bu, yanıtın yalnızca
                                                işlemin başarılı olması durumunda gönderilmesini sağlar.
    response.json(savedNote)
  })
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/api/notes`);
});

*********************** 8 - Verifying frontend and backend integration - Ön uç ve arka uç entegrasyonunu doğrulama ***********************

  Arka uç genişletildiğinde, önce arka ucu tarayıcıyla , Postman'la veya VS Code REST istemcisiyle test etmek iyi bir fikirdir. Yalnızca her şeyin
  arka uçta çalıştığı doğrulandıktan sonra, ön ucun arka uçla çalıştığını test etmek iyi bir fikirdir.

*********************** 9 - Error handling - Hata yönetimi ***********************

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
##############################################

    Mevcut olmayan bir kimliğe sahip bir notun URL'sini ziyaret etmeye çalışırsak, yanıt null olacaktır .Bu davranışı değiştirelim, böylece
    verilen kimliğe sahip bir not mevcut değilse, sunucu isteğe 404 HTTP durum kodu bulunamadıyla yanıt verecektir. Ayrıca findById yönteminin
    döndürdüğü sözün reddedildiği durumları ele almak için basit bir catch bloğu uygulayalım. Bunun icin bu kod blogunu bir altta ki ile degistirecegiz.

app.get("/api/notes/:id", (request, response) => {

  Note.findById(request.params.id).then((note) => {
    if (note) {
      response.json(note);
    } else {
      response.status(404).json({
        error: "no note found",
        request: {
          id: request.params.id,
        },
      });
    }
  });
});

##############################################

      Eğer veritabanında eşleşen bir nesne bulunamazsa, notun değeri null olur ve else bloğu çalıştırılır. Bu , 404 bulunamadı durum kodunu
      içeren bir yanıtla sonuçlanır . FindById yöntemi tarafından döndürülen bir söz reddedilirse yanıtta 500 dahili sunucu hatası durum kodu bulunur.

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id)
    .then(note => {

      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })

    .catch(error => {
      console.log(error)      ==>   İstisnaya neden olan nesneyi hata işleyicisinde konsola yazdırmak iyi bir fikirdir.

      response.status(400).send({ error: 'malformatted id' })     ==>   Kimliğin formatı yanlışsa, catch bloğunda tanımlanan hata işleyicisinde
                                                                        son buluruz. Durum için uygun durum kodu 400 Hatalı İstek'tir çünkü durum
                                                                        açıklamaya mükemmel şekilde uymaktadır.
    })
})

app.delete("/api/notes/:id", (request, response) => {
  Note.deleteOne({_id:request.params.id}).then(() => {
    response.status(204).end()
  })
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;

  return maxId + 1;
};

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/api/notes`);
});

*********************** 10 - Moving error handling into middleware - Hata işlemeyi ara yazılıma taşıma ***********************

    Hata işleyicisinin kodunu kodumuzun geri kalanının arasına yazdık. Bu bazen makul bir çözüm olabilir, ancak tüm hata yönetimini
    tek bir yerde uygulamanın daha iyi olduğu durumlar da vardır. Hatalarla ilgili verileri daha sonra Sentry gibi harici bir hata
    izleme sistemine raporlamak istiyorsak bu özellikle yararlı olabilir. Bu sebeple /api/notes/:id yolunun işleyicisini, hatayı bir
    sonraki fonksiyona iletecek şekilde değiştirdik.

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

app.get('/api/notes/:id', (request, response, next) => {   ==>  Aktarılan hata bir sonraki fonksiyona parametre olarak verilir.
                                                                Eğer next argüman olmadan çağrılırsa, yürütme basitçe bir sonraki
                                                                rotaya veya ara katman yazılımına geçer. Bir sonraki işlev bir
                                                                argümanla çağrılırsa , yürütme hata işleyici ara yazılımıyla devam
                                                                eder .
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

app.delete("/api/notes/:id", (request, response) => {
  Note.deleteOne({_id:request.params.id}).then(() => {
    response.status(204).end()
  })
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;

  return maxId + 1;
};

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

    Ekspres hata işleyicileri, dört parametreyi kabul eden bir işlevle tanımlanan ara yazılımlardır. Hata işleyicimiz şuna benzer:

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

     Not  : Hata işleme ara yazılımının son yüklenen ara yazılım olması gerektiğini ve ayrıca tüm rotaların hata işleyiciden önce
     kaydedilmesi gerektiğini unutmayın!

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/api/notes`);
});

*********************** 11 - The order of middleware loading - Ara yazılım yükleme sırası ***********************

    Ara yazılımın yürütme sırası, bunların app.use işleviyle Express'e yüklenme sırasıyla aynıdır . Bu nedenle ara yazılımları tanımlarken
    dikkatli olmak önemlidir.

    Doğru sıralama şu şekildedir:

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

app.post('/api/notes', (request, response) => {
  const body = request.body
  // ...
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  // ...
}

// handler of requests with result to errors
app.use(errorHandler)

      Json-parser ara yazılımı, Express'e yüklenen ilk ara katman yazılımı arasında olmalıdır. Sipariş şu şekilde olsaydı:

app.use(requestLogger) // request.body is undefined!

app.post('/api/notes', (request, response) => {
  // request.body is undefined!
  const body = request.body
  // ...
})

app.use(express.json())

    Bu durumda, request.body bu noktada tanımsız olacağından , HTTP istekleriyle gönderilen JSON verileri, günlükçü ara yazılımı
    veya POST rota işleyicisi için kullanılamayacaktır.

    Desteklenmeyen rotaları işlemeye yönelik ara yazılımın, Express'e yüklenen son ara yazılımın yanında, hata işleyiciden hemen
    önce olması da önemlidir.

    Örneğin, aşağıdaki yükleme sırası bir soruna neden olabilir:

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

app.get('/api/notes', (request, response) => {
  // ...
})

    Artık bilinmeyen uç noktaların işlenmesi HTTP istek işleyicisinden önce sıralanıyor . Bilinmeyen uç nokta işleyicisi tüm isteklere
    404 bilinmeyen uç nokta ile yanıt verdiğinden , bilinmeyen uç nokta ara yazılımı tarafından yanıt gönderildikten sonra hiçbir rota
    veya ara katman yazılımı çağrılmaz. Bunun tek istisnası, bilinmeyen uç nokta işleyicisinden sonra en sona gelmesi gereken hata
    işleyicisidir.



*********************** 12 - Other operations - Diğer işlemler ***********************

    Bireysel bir notu silmek ve güncellemek de dahil olmak üzere uygulamamıza bazı eksik işlevler ekleyelim.

    Bir notu veritabanından silmenin en kolay yolu findByIdAndDelete yöntemini kullanmaktır:
*/

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

/*
app.delete("/api/notes/:id", (request, response) => {
  Note.deleteOne({_id:request.params.id}).then(() => {
    response.status(204).end()
  })
});

*/

app.delete('/api/notes/:id', (request, response, next) => {     /*    Bir kaynağın silinmesinin "başarılı" olduğu her iki durumda da,
                                                                      arka uç 204 no content durum koduyla yanıt verir . İki farklı durum
                                                                      var olan bir notun silinmesi ve veritabanında bulunmayan bir notun
                                                                      silinmesidir. result geri çağırma parametresi bir kaynağın gerçekten
                                                                      silinip silinmediğini kontrol etmek için kullanılabilir ve gerekli
                                                                      görürsek bu bilgiyi iki durum için farklı durum kodlarını döndürmek
                                                                      için kullanabiliriz . Ortaya çıkan herhangi bir istisna, hata
                                                                      işleyicisine iletilir.
                                                                */
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

//  Bir notun öneminin değiştirilmesi findByIdAndUpdate yöntemiyle kolayca gerçekleştirilebilir.

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body  /* İsteğin gövdesinden (request.body) gelen verileri body değişkenine atar. Bu, genellikle bir JSON formatında
                                gönderilen verileri içerir. */

  const note = {             /* Gelen verilerden (body) bir note nesnesi oluşturur. Bu nesne, bir notun içeriği (content) ve önem derecesi
                                (important) bilgilerini içerir. Bu veriler, istemci tarafından gönderilen notun içeriğini ve önem derecesini
                                temsil eder.*/
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })    /*  MongoDB veritabanında Note modelinde belirtilen ID'ye sahip bir notu
                                                                        günceller. request.params.id, isteğin URL'sinden alınan notun benzersiz
                                                                        kimliğini temsil eder. note ise güncellenmiş notun içeriğini ve önem
                                                                        derecesini temsil eder. { new: true } seçeneği, güncellenmiş notun dönüş
                                                                        değerinde güncel veriyi almayı sağlar. */

    .then(updatedNote => {          /*  Güncellenmiş not başarıyla bulunduğunda, istemciye JSON formatında güncellenmiş notu içeren bir yanıt
                                        döndürülür. */
      response.json(updatedNote)
    })
    .catch(error => next(error))    /*  Herhangi bir hata durumunda, hata nesnesi next fonksiyonuna iletilir. Bu, hatanın işlenmesini sağlar
                                        ve uygun bir hata yanıtı oluşturulmasına yardımcı olur. */
})

/*
    Yukarıdaki put requestte ki kodda notun içeriğinin düzenlenmesine de izin veriyoruz.

    findByIdAndUpdate yönteminin bağımsız değişken olarak Note yapıcı işleviyle oluşturulan yeni bir not nesnesi değil, normal bir
    JavaScript nesnesi aldığına dikkat edin .

    FindByIdAndUpdate yönteminin kullanımıyla ilgili önemli bir detay var . Varsayılan olarak, olay işleyicisinin güncellenenNot
    parametresi, orijinal belgeyi değişiklikler olmadan alır . { new: true }Olay işleyicimizin orijinal belge yerine yeni değiştirilmiş
    belgeyle çağrılmasına neden olacak isteğe bağlı parametreyi ekledik .
*/
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;

  return maxId + 1;
};

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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/api/notes`);
});
