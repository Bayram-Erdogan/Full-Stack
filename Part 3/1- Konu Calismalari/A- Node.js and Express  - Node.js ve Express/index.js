/*

************************************************************* Yeni bir uygulama baslatma ***************************************************************
console.log("Hello world!")

    1- ilk olarak C:\Users\bayra\Desktop\Ön calisma\full stack\Part 3\1- Konu Calismalari> dizinine gittim. ve bu dizinde cmd ile terminali actim.

    2- npm init ile yeni bir sablon olusturdum sablon icin sorulan sorulara cevaplarimi verdim.
        2a) ilk olarak package name: (1--konu-calismalari) ile bana bir isim önerisi verdi onu backend ile degistirdim.
        2b) version: (1.0.0) versiyon önerisi verdi onu 0.0.1 ile degistirdim.
        2c) description: istedi ona da backend proje olusturma calismasi yazdim
        2d) entry point: (index.js) giris noktasi önerdi enter ile kabul ettim.
        2e) test command: enter ile devam ettim
        2f) git repository: enter ile devam ettim
        2g) keywords: enter ile devam ettim
        2h) author: adimi yazdim
        2i) license: (ISC) enter ile devam ettim ve karsima asagidaki gibi bir nesne cikardi.

        {
            "name": "backend",
            "version": "0.0.1",
            "description": "backend proje olusturma calismasi",
            "main": "index.js",
            "scripts": {
                "test": "echo \"Error: no test specified\" && exit 1"
            },
            "author": "Bayram Erdogan",
            "license": "ISC"
            }

        2j) Is this OK? (yes) enter ile onayladim ve package.json dosyasi olusturdu ve yukarida yer alan nesneyi package.json dosyasina
            yerlestirdi.

    3-  "scripts": {
                "start": "node index.js",   ==>     Bu satiri ekledim. Böylece terminalde npm start ile kodumu calistirabilirim.
                "test": "echo \"Error: no test specified\" && exit 1"
            },

    4- Projenin kök dizinine giderek index.js dosyasi olusturdum ve icerisine console.log("Hello world!") kodunu yazdim.

    5- Terminalde kodumu node index.js ve npm start ile calistirdigimida yine terminalde Hello world! yazisi görunecektir.

***************************************************************** Basit web sunucusu *******************************************************************

const http = require('http')    ==> İlk satırda uygulama, Node'un yerleşik web sunucusu modülünü içe aktarır.

const app = http.createServer((request, response) => {      http.createServer() yöntemini kullanarak bir HTTP sunucusu oluşturuyoruz. Bu yöntem,
                                                            bir HTTP sunucusu nesnesi oluşturur ve bir istek dinleyici (request listener) belirtir.
                                                            İstek dinleyicisi, sunucuya gelen her isteği işler ve yanıtı oluşturur. İstek
                                                            dinleyicisi, bir ok işlevi ((request, response) => { ... }) olarak tanımlanır. Bu işlev,
                                                            her gelen isteği işlemek için çağrılır ve iki parametre alır: request (istek) ve
                                                            response (yanıt).

  response.writeHead(200, { 'Content-Type': 'text/plain' })     İstek dinleyicisi işlevi içinde, response.writeHead() yöntemiyle HTTP yanıt
                                                                başlıklarını (header) ayarlarız. Bu durumda, yanıt kodunu 200 (Başarılı) olarak
                                                                ayarlıyoruz ve içerik türünü "text/plain" olarak belirtiyoruz.

  response.end('Hello World')       İstek dinleyicisi işlevi içinde, response.writeHead() yöntemiyle HTTP yanıt
                                                                başlıklarını (header) ayarlarız. Bu durumda, yanıt kodunu 200 (Başarılı) olarak
                                                                ayarlıyoruz ve içerik türünü "text/plain" olarak belirtiyoruz.
})

Asagidaki JavaScript kodu, önceki kod parçacığına ek olarak bir HTTP sunucusunu belirli bir bağlantı noktasında dinlemeye başlar.

const PORT = 3001       İlk olarak, PORT adında bir sabit tanımlanır ve bu sabit 3001 değerine atanır. Bu, sunucunun hangi bağlantı noktasında
                        dinlemeye başlayacağını belirtir.

app.listen(PORT)        Ardından, app.listen() yöntemi çağrılır ve bu yöntemle sunucu belirtilen bağlantı noktasında dinlemeye başlar. app
                        değişkeni, önceki kod parçacığında oluşturulan HTTP sunucusu nesnesini temsil eder.

console.log(`Server running on port ${PORT}`)               Son olarak, console.log() kullanılarak konsola bir mesaj yazdırılır. Bu mesaj,
                                                            sunucunun hangi bağlantı noktasında dinlediğini bildirir. ${PORT} ifadesi, PORT
                                                            sabitinin değerini içeren bir dize ifadesine dönüştürülür ve mesaja eklenir.

    http://localhost:3001 adresine gittigimizde ekranda Hello World yazisini göruruz. Sunucu, URL'nin ikinci kısmından bağımsız olarak aynı
    şekilde çalışır. Yani http://localhost:3001/.... ekranda Hello World görunur.





const http = require('http')

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
  const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(notes))                     response.end() yöntemi çağrılarak yanıt gövdesi (body) belirlenir. notes adında bir
                                                            değişken kullanılır ve bu değişkenin JSON formatına dönüştürülmüş değeri, JSON.stringify()
                                                            fonksiyonu ile alınır. Bu, notes adlı bir veri yapısının JSON formatına dönüştürülmesini
                                                            sağlar. Bu JSON yanıtı, istemcilere gönderilir. Özetle, bu kod parçası, bir HTTP sunucusu
                                                            oluşturur ve istemcilere notes adlı bir veri yapısını JSON formatında yanıt olarak gönderir.
                                                            Bu, örneğin bir API uygulamasında kullanılabilir, istemcilerin veriye erişmesine olanak
                                                            sağlar.
  })

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port http://localhost:${PORT}`)

********************************************************************* Express **************************************************************************

    Yerleşik http modülüyle çalışmak için daha hoş bir arayüz sunarak, Node ile sunucu tarafı geliştirmeyi kolaylaştırmak için birçok kitaplık
    geliştirilmiştir. Bu kitaplıklar, genellikle bir arka uç sunucusu oluşturmak için ihtiyaç duyduğumuz genel kullanım durumları için daha
    iyi bir soyutlama sağlamayı amaçlamaktadır. Bu amaca yönelik en popüler kütüphane şu ana kadar Express'tir. Yani Express, web uygulamaları ve
    API'ler oluşturmak için popüler bir kutuphanedir ve Node.js'in HTTP modülünü daha kolay ve güçlü bir şekilde kullanmanıza olanak sağlar.

    Express.js, HTTP isteklerini yönetmek, rotaları yönlendirmek, URL parametrelerini işlemek, şablon motorlarını kullanmak, orta yazılım eklemek ve
    daha pek çok işlevi kolayca gerçekleştirmenizi sağlayan birçok özellik sunar.


    1-  terminal de npm install express yazarak express kutuphanesini kurduk. Kurulan dosyanin bağımlılıklari aynı zamanda package.json dosyamıza da
        eklenir

****************************************************************** Web ve Express **********************************************************************



const express = require('express')    İlk olarak, express modülü içe aktarılır ve express değişkenine atanir. Bu, Express.js çatısını kullanabilmemizi
                                      sağlar.

const app = express()     Ardından, app değişkenine, express() yöntemi çağrırarak bir Express uygulaması oluşturdum.

let notes = [       notes adında bir dizi oluşturdum. Bu dizi, örnek notlar içerecek ve basit bir veri kaynağı olarak kullanılacaktır.
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

app.get('/', (request, response) => {         app.get('/', ...) yöntemini çağirarak, kök dizinine (root route) gelen GET istekleri için bir işlem
                                              belirttim. Bu rotaya gelen isteklere, <h1>Hello World!</h1> içeriğinde bir HTML yanıtı gönderilir.
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {        app.get('/api/notes', ...) yöntemini çağirarak, '/api/notes' yoluna gelen GET istekleri için bir
                                                      işlem belirttim. Bu rotaya gelen isteklere, notes dizisinin JSON formatındaki içeriği yanıt olarak
                                                      gönderilir.

  response.json(notes)      Yalnızca Node kullandığımız önceki sürümde, JSON.stringify yöntemiyle verileri JSON biçimli dizeye dönüştürmemiz
                            gerekiyordu. Express ile bu artık gerekli değil çünkü bu dönüşüm otomatik olarak gerçekleşiyor.
})

const PORT = 3001
app.listen(PORT, () => {        app.listen() yöntemi çağrılarak, sunucunun belirtilen bağlantı noktasında dinlemesi sağlanır. Ayrıca, sunucunun
                                başlatıldığını belirten bir konsol mesajı da yazdırılır.
  console.log(`Server running on port http://localhost:${PORT}`)
})


    Özetle yukaridaki kod, Express.js kullanarak bir web sunucusu oluşturur ve "/" ve "/api/notes" rotalarına gelen isteklere yanıtlar verir. Ana
    sayfada "Hello World!" metni gösterilirken, /api/notes rotasında ise notes dizisinin JSON formatındaki içeriği gönderilir.


********************************************************************** Nodemon *************************************************************************

    Uygulamanın kodunda değişiklik yaptigimizda, değişiklikleri görmek için uygulamayı yeniden başlatmamız gerekiyor. Uygulamayı önce Ctrl+C yazarak
    kapatıyor, ardından uygulamayı yeniden başlatıyoruz. Değişiklikler yapıldıktan sonra tarayıcının otomatik olarak yeniden yüklendiği React'teki
    kullanışlı iş akışıyla karşılaştırıldığında bu biraz hantal geliyor. Bu hantalliktan kurtulmak icin nodemon'u kullaniriz.

    nodemon, nodemon'un başlatıldığı dizindeki dosyaları izleyecek ve herhangi bir dosya değişirse node uygulamanızı otomatik olarak yeniden
    başlatacaktır.

    1-  Nodemon'u terminalde yuklemek icin npm install --save-dev nodemon satirini kullaniriz.
    2-  Uygulamamıza nodemon ile şu şekilde başlayabiliriz :  node_modules/.bin/nodemon index.js . Komut uzun ve oldukça rahatsız edici, bu yüzden
        package.json dosyasında bunun için özel bir npm betiği tanımlayalım.

  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

	  Artık sunucuyu şu komutla geliştirme modunda başlatabiliriz: npm run dev bu durumda nodemon'a giden node_modules/.bin/nodemon yolunu belirtmeye
    gerek oktur , çünkü npm, dosyayı o dizinden arayacağını otomatik olarak bilir.

const express = require('express')
const app = express()

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

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)})


*********************************************************************** Rest ***************************************************************************

      Uygulamamızdaki notlar gibi tekil şeylerin RESTful düşüncede kaynak olarak adlandırıldığından önceki bölümde bahsetmiştik . Her kaynağın, kaynağın
      benzersiz adresi olan ilişkili bir URL'si vardır. Sunucumuzun kök URL'sinin www.example.com/api olduğunu varsayalım .

      Notun kaynak türünü notlar olarak tanımlarsak, 10 tanımlayıcısına sahip bir not kaynağının adresi www.example.com/api/notes/10 benzersiz adresine
      sahiptir .

      Tüm not kaynakları koleksiyonunun tamamının URL'si www.example.com/api/notes şeklindedir.

********************************************** Fetching a single resource - Tek bir kaynak getiriliyor *************************************************

    Uygulamamızı, bireysel notlar üzerinde çalışmak için bir REST arayüzü sunacak şekilde genişletelim. Öncelikle tek bir kaynağı getirmek için bir rota
    oluşturalım

    Bireysel bir not için kullanacağımız benzersiz adres, notlar/10 biçimindedir ; burada sondaki sayı, notun benzersiz kimlik numarasını ifade eder.


const express = require('express')
const app = express()

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

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

// belirli bir id'ye sahip bir notu getirmek için bir rota oluşturdum.
app.get('/api/notes/:id', (request, response) => {   ==>  İlk olarak, app.get('/api/notes/:id', ...) yöntemi çağrılarak, /api/notes/:id rotası
                                                          tanımlanır. Bu rotaya gelen istekler, :id parametresi aracılığıyla belirli bir id değeri
                                                          ile ilgili bir notu getirmeyi amaçlar.

  const id = Number(request.params.id)           ==>  const id = Number(request.params.id) satırıyla, URL'den gelen id parametresi alınır ve bir
                                                      sayıya dönüştürülür. Bu, URL'den gelen parametreyi sayısal bir değere dönüştürerek uygun bir
                                                      karşılaştırma yapmamızı sağlar.

  const note = notes.find(note => note.id === id)  ==>  const note = notes.find(note => note.id === id) satırıyla, notes dizisinde belirli bir id'ye
                                                        sahip notu bulmaya çalışılır. notes.find() fonksiyonu, belirtilen koşulu sağlayan ilk öğeyi
                                                        döndürür.

  if (note) {    ==>  Eğer note değişkeni bir değer içeriyorsa (if (note)), yani belirli bir id'ye sahip bir not bulunduysa, response.json(note)
                      satırıyla bulunan not JSON formatında istemciye gönderilir.
    response.json(note)
  } else {       ==>  Eğer note değişkeni bir değer içermiyorsa (else bloğu), yani belirli bir id'ye sahip bir not bulunamadıysa,
                      response.status(404).end() satırıyla 404 durum kodu gönderilir. Bu, istemciye belirli bir id'ye sahip notun bulunamadığını
                      bildirir.
    response.status(404).end()
  }

/*
    Özetle  Bu rota icindeki kod parcasi, belirli bir id'ye sahip bir notu getirmek için bir API rotası oluşturur ve istemciye bulunan notun JSON
    formatında gönderilmesini sağlar. Eğer belirli bir id'ye sahip bir not bulunamazsa, 404 durum kodu gönderilir.

})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)})

*********************************************************** Deleting resources - Kaynaklari silme ******************************************************

const express = require('express')
const app = express()

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

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {

  const id = Number(request.params.id)

  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }

})

//kaynakları silmek için bir rota uygulayalım. Silme işlemi, kaynağın URL'sine bir HTTP DELETE isteği yapılarak gerçekleştirilir:

app.delete('/api/notes/:id', (request, response) => {       İlk olarak, app.delete('/api/notes/:id', ...) yöntemi çağrılarak, /api/notes/:id rotası
                                                            tanımlanır. Bu rotaya gelen DELETE istekleri, :id parametresi aracılığıyla belirli bir
                                                            id değeri ile ilgili bir notu silmeyi amaçlar.

  const id = Number(request.params.id)                const id = Number(request.params.id) satırıyla, URL'den gelen id parametresi alınır ve bir sayıya
                                                      dönüştürülür. Bu, URL'den gelen parametreyi sayısal bir değere dönüştürerek uygun bir
                                                      karşılaştırma yapmamızı sağlar.

  notes = notes.filter(note => note.id !== id)        notes = notes.filter(note => note.id !== id) satırıyla, notes dizisinden belirli bir id'ye sahip
                                                      notu filtreleyerek çıkarırız. notes.filter() fonksiyonu, belirtilen koşulu sağlayan tüm öğeleri
                                                      yeni bir dizi olarak döndürür. Bu durumda, note.id !== id koşulu sağlanan tüm notları korur ve
                                                      belirtilen id'ye sahip olanı dışarıda bırakırız.

  response.status(204).end()                          response.status(204).end() satırıyla, istemciye başarılı bir yanıt gönderilir. 204 No Content durum
                                                      kodu, istemciye herhangi bir içerik gönderilmediğini ancak işlemin başarıyla gerçekleştirildiğini
                                                      bildirir.


    Bu kod parçası, belirli bir id'ye sahip bir notu silmek için bir API rotası oluşturur. İstek başarılı bir şekilde gerçekleştirildiğinde, istemciye
    204 No Content durum kodu gönderilir ve not silinir.

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)})
  })
************************************************************************ Postman ************************************************************************

    Peki silme işlemini nasıl test edeceğiz? Bunun icin Postman masaüstü istemcisini yükleyip deneyelim.

    ilk olarak URL'yi (http://localhost:3001/api/notes/2) tanımlayip ve ardından doğru istek türünü (DELETE) seçiyoruz.Daha sonra HTTP GET isteği
    yaptığımızda 2 numaralı notun artık listede olmadığını görüyoruz, bu da silme işleminin başarılı olduğunu gösteriyor.



*************************************************************** Receiving data - Veri  ekleme ***********************************************************

  Sunucuya yeni notlar eklemeyi mümkün kılalım. Not eklemek , http://localhost:3001/api/notes adresine bir HTTP POST isteği yaparak ve yeni nota ilişkin
  tüm bilgileri istek gövdesinde JSON biçiminde göndererek gerçekleşir.

  Verilere kolayca erişmek için app.use(express.json()) komutuyla kullanabileceğimiz Express json-parser'ın yardımına ihtiyacımız var .

  Json ayrıştırıcıyı etkinleştirelim ve HTTP POST istekleriyle ilgilenmek için bir başlangıç ​​işleyicisi uygulayalım

*/

const express = require('express')
const app = express()
app.use(express.json())     /*  app.use(express.json()) satırıyla, Express.js uygulamasına gelen isteklerin JSON veri gövdesini analiz etmesi
                                için bir middleware eklenir. Bu middleware, gelen isteklerdeki JSON veriyi analiz ederek request.body nesnesine
                                dönüştürür ve bu şekilde işlenmesini sağlar. */

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

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

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

const generateId = () => {    /*   const generateId = () => { ... } fonksiyonu, notlara benzersiz bir id oluşturur. */

  const maxId = notes.length > 0    /*  İlk olarak, notes dizisindeki mevcut en yüksek id'yi bulur. */

    ? Math.max(...notes.map(n => n.id)) /*  Math.max(...notes.map(n => n.id)) ifadesiyle notların id özelliklerini içeren bir dizi oluşturulur
                                            ve bu dizi içerisindeki en yüksek id değeri bulunur. Ancak, Notes.map(n => n.id) bir dizi olduğundan
                                            Math.max öğesine doğrudan parametre olarak verilemez. Dizi, "üç nokta ... " yayılma sözdizimi kullanılarak
                                            ayrı sayılara dönüştürülebilir.*/

    : 0     /*  Eğer notes dizisi boş ise, yani içinde hiçbir not bulunmuyorsa, maxId değişkenine 0 atanır. */

  return maxId + 1    /*  Daha sonra, bu id'den bir fazlasını yeni bir id olarak kullanır. Bu, notların id'lerini otomatik olarak artırmak
                          için kullanılır. */
}

app.post('/api/notes', (request, response) => {   /*  app.post('/api/notes', ...) yöntemi çağrılarak, /api/notes rotası tanımlanır.
                                                      Bu rotaya gelen POST istekleri, yeni bir not oluşturmayı amaçlar. */

  const body = request.body /*  const body = request.body satırıyla, istek gövdesindeki JSON verisi alınır ve body değişkenine atanır.
                                Bu, istemcinin gönderdiği not verisini içeren bir JavaScript nesnesini temsil eder */

  if (!body.content) {  /*  if (!body.content) { ... } bloğu, notun içeriğinin olup olmadığını kontrol eder. */

    return response.status(400).json({  /*    Eğer notun içeriği eksikse,yetersiz istek hatası (400 Bad Request) ile birlikte bir hata
                                              mesajı döndürülür. */
      error: 'content missing'
    })
  }

  const note = {    /*  Eğer notun içeriği eksik değilse, const note = { ... } satırıyla, yeni bir not nesnesi oluşturulur. Bu nesne,
                        istemciden gelen content ve important alanlarına dayanarak oluşturulur ve ayrıca benzersiz bir id'ye sahip olacak
                        şekilde generateId() fonksiyonu kullanılarak id atanır. */

    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }

  notes = notes.concat(note)  /*  notes = notes.concat(note) satırıyla, oluşturulan yeni not, notes dizisine eklenir. */

  response.json(note)   /*  Son olarak, response.json(note) satırıyla, oluşturulan yeni not JSON formatında istemciye geri gönderilir. */

  /*
    Özetle  : Yukarida ki kod parçası, bir POST isteği alarak istemciden gelen not verisini alır, bu veriyi işler ve ardından istemciye
    geri gönderir. Bu, bir API rotası aracılığıyla yeni notların oluşturulmasını sağlar. Ayrıca, notlara benzersiz bir id eklemek için
    generateId() fonksiyonunu kullanır ve notun içeriğinin eksik olup olmadığını kontrol eder.
  */
})

const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)})