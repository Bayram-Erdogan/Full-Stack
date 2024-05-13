/*
********************************************* Deploying app to internet - Uygulamayi internete dagitma *********************************************

********************* 1- Same origin policy and CORS - Aynı menşe politikası ve CORS *********************

    Aynı menşe politikası sorunu tarayıcıda çalışan bir uygulamanın JavaScript kodunun varsayılan olarak yalnızca aynı kaynaktaki bir sunucuyla
    iletişim kurabilmesidir. Sunucumuzun localhost bağlantı noktası 3001'de  iken ön uçumuzun localhost bağlantı noktası 5173'tedir. Bu yuzden aynı
    kökene sahip değiller. Ve bu sorun olusturur.


  1-  ilk olarak terminalde npm install cors yazarak cors'u uygulamama yukledim.
  2-  Daha sonra

          const cors = require('cors')    =>  cors degiskeni olusturarak  projemin bağımlılıklarına "cors" paketinin eklenmesini sağladim.
          app.use(cors())                 =>  Tarayıcıların güvenlik politikalarını geçmek için gerekli olan CORS başlıklarının otomatik olarak
                                              eklenmesini sağladim. Bu sayede, farklı kökenlerden gelen isteklere sunucunun yanıt vermesi
                                              engellenmez.

********************* 2- Application to the Internet - Internete basvuru *********************

  Uygulamamızı internette yayinlamak icin render veya fly.io kullanabililiriz. Uygulamanizi yayinlamak icin arka uçtaki index.js dosyasının alt
  kısmında uygulamamızın kullandığı portun tanımını şu şekilde değiştirmemiz gerekiyor

  const PORT = process.env.PORT || 3001  ==>  Bu satir degistirilidi önceki hali const PORT = 3001 idi. Su andan itibaren ortam değişkeninde
                                              tanımlanan bağlantı noktasını veya PORT ortam değişkeni tanımlanmamışsa bağlantı noktası olarak
                                              3001'i kullanıyoruz. Fly.io ve Render, uygulama bağlantı noktasını bu ortam değişkenine göre
                                              yapılandırır.
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

    Render ile yayinlama.
    1-  Ilk olarak https://dashboard.render.com/ adresine giderek githubimiz ile giris yapiyoruz.
    2-  Daha sonra New butonunu tiklayarak Web Service'i secerek devam ediyoruz.
    3-  Sonra acilan sayfadan Build and deploy from a Git repository'i secerek Next diyoruz.
    4-  Acilan sayfada Public Git repository basligi altinda github'ta public olan url'imizi yapistirip Continue diyoruz.
    5-  Acilan sayfada
        a Service'imize isim veriyoruz.
        b Region kismini default olarak kabul edebilecegimiz gibi seceneklerden secebilirizde
        c Branch kismi main olacak sekilde birakiyoruz
        d Runtime Node olacak sekilde ayarliyoruz
        e Build Command icin npm install yaziyoruz
        f Start Command icin npm start yaziyoruz
        g free secenegini secerek Create Web Service butonuna tikliyoruz. Herhangi bir sorun ile karsilasmazsak sayfamiz internette yayinlaniyor.

********************* 3- Frontend production build - Ön uç üretim yapısı *********************

    Şu ana kadar React kodunu geliştirme modunda çalıştırdık . Geliştirme modunda uygulama, net hata mesajları verecek, kod değişikliklerini
    tarayıcıya anında aktaracak ve benzeri şekilde yapılandırılmıştır.

    Uygulama dağıtıldığında, bir üretim yapısı veya uygulamanın üretim için optimize edilmiş bir sürümünü oluşturmamız gerekir. Bunun icin
    uygulamanin ön yuzundeki package.json dosyasinda yer alan script nesnesinde ki build'i uzerinde cikan rum komutu ile calistirmaliyiz.
    Bunu calistirdiktan sonra uygulamamızın tek HTML dosyasını ( index.html ) ve dizin varlıklarını içeren dist adında bir dizin oluşturur.

********************* 4- Serving static files from the backend - Statik dosyaların arka uçtan sunulması *********************

    Ön ucu dağıtmak için üretim yapısını ( dist dizini) arka uç deposunun köküne kopyalamak ve arka ucu, ön ucun ana sayfasını
    ( dist/index.html dosyası ) ana sayfası olarak gösterecek şekilde yapılandırmaktır.Bunun icin 3 adimda ön ucta olusturdugumuz
    dist dizini kopyalayarak arka uctaki projemizin kökune yapistiririz. Daha sonra index.js dosyamiza Ara katman yazılımlarının
    bildirimlerinin arasına app.use(express.static('dist')) satirini ekleriz. Express bir HTTP GET isteği aldığında ilk önce dist
    dizininde isteğin adresine karşılık gelen bir dosya içerip içermediğini kontrol eder. Doğru dosya bulunursa Express dosyayı
    geri verecektir.

    Artık www.serversaddress.com/index.html veya www.serversaddress.com adresine yapılan HTTP GET istekleri React ön ucunu gösterecektir.
    www.serversaddress.com/api/notes adresine yapılan GET istekleri arka uç kodu tarafından işlenecektir.

    Uygulamayı bir geliştirme ortamında çalıştırmanın aksine, artık her şey localhost:3001'de çalışan aynı düğümde/ekspres-arka uçtadır.
    Tarayıcı sayfaya gittiğinde index.html dosyası oluşturulur. Bu, tarayıcının React uygulamasının üretim sürümünü getirmesine neden olur.
    Çalışmaya başladığında json verilerini localhost:3001/api/notes adresinden alır.

********************* 5- Streamlining deploying of the frontend - Ön ucun dağıtımını kolaylaştırma *********************

    Ekstra manuel çalışma gerektirmeden ön uçta yeni bir üretim yapısı oluşturmak için, arka uç deposunun package.json dosyasına bazı npm
    komut dosyaları ekleyelim.

    Render icin;
    Not: Arka ucunuzu Render'a dağıtmaya çalıştığınızda, arka uç için ayrı bir deponuz olduğundan emin olun ve bu github deposunu Render
    aracılığıyla dağıtın

    Render durumunda, komut dosyaları aşağıdaki gibi görünür

{
  "scripts": {
    //...
    "build:ui": "rm -rf dist && cd ../frontend && npm run build && cp -r dist ../backend",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push"
  }
}

    npm run build:ui    ==>   betiği ön ucu oluşturur ve üretim sürümünü arka uç deposunun altına kopyalar.
    npm run deploy:full ==>   arka uç deposunu güncellemek için gerekli git komutlarını da içerir.


********************* 6- Proxy *********************

    Ön uçtaki değişiklikler, arka uçla bağlantıli çalışmadığından, geliştirme modunda artık ( npm run dev komutuyla başlatıldığında) çalışmamasına
    neden oldu.

    Bunun nedeni, arka uç adresinin göreceli bir URL olarak değiştirilmesidir:

    const baseUrl = '/api/notes'

    Geliştirme modunda ön uç localhost:5173 adresinde olduğundan , arka uçtaki istekler yanlış localhost:5173/api/notes adresine gider . Arka uç
    localhost:3001 adresindedir .

    Proje Vite ile oluşturulduysa bu sorunun çözülmesi kolaydır. Frontend repositorynin vite.config.js dosyasına aşağıdaki bildirimi eklemeniz
    yeterlidir .

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {               ==> Bu satirdan
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    }
  },    ==> Bu satira kadar her iki satirda dahil olacak sekilde
})


    Yeniden başlatmanın ardından React geliştirme ortamı proxy olarak çalışacaktır . React kodu , http://localhost:5173 adresindeki, React
    uygulamasının kendisi tarafından yönetilmeyen bir sunucu adresine HTTP isteğinde bulunursa (yani istekler uygulamanın CSS'sini veya
    JavaScript'ini getirmekle ilgili değilse), istek şu adrese yönlendirilecektir: http://localhost:3001 adresindeki sunucu .
*/
const express = require('express')
const app = express()
const cors = require('cors')//  1.2

app.use(cors())// 1.2

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
    console.log(`Server running on port http://localhost:${PORT}`)})