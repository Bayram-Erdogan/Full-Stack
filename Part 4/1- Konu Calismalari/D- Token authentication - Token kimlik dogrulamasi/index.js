/*
******************************************************* D- Token authentication - Token kimlik dogrulamasi *******************************************************

  Kullanıcıların uygulamamıza giriş yapabilmesi gerekir ve bir kullanıcı giriş yaptığında, kullanıcı bilgilerinin oluşturdukları yeni notlara otomatik olarak
  eklenmesi gerekir.

  Artık arka uçta belirteç tabanlı kimlik doğrulama desteğini uygulayacağız.

  * Kullanıcı, React ile uygulanan bir giriş formunu kullanarak giriş yaparak başlar
  * Bu, React kodunun kullanıcı adını ve şifreyi bir HTTP POST isteği olarak /api/login sunucu adresine göndermesine neden olur .
  * Kullanıcı adı ve parola doğruysa sunucu, oturum açan kullanıcıyı bir şekilde tanımlayan bir belirteç oluşturur. Belirteç dijital olarak imzalanır ve
    sahteciliği imkansız hale getirir (kriptografik araçlarla)
  * Arka uç, işlemin başarılı olduğunu belirten bir durum koduyla yanıt verir ve yanıtla birlikte belirteci döndürür.
  * Tarayıcı, jetonu örneğin bir React uygulamasının durumuna kaydeder.
  * Kullanıcı yeni bir not oluşturduğunda (veya tanımlama gerektiren başka bir işlem yaptığında), React kodu istekle birlikte tokenı sunucuya gönderir.
  * Sunucu, kullanıcıyı tanımlamak için belirteci kullanır

  Öncelikle oturum açma işlevini uygulayalım. JSON web belirteçleri oluşturmamıza olanak tanıyan jsonwebtoken kitaplığını yükleyin .

  npm install jsonwebtoken

  Oturum açma işlevine ilişkin kod, controllers/login.js dosyasına gider.

  const jwt = require('jsonwebtoken')
  const bcrypt = require('bcrypt')
  const loginRouter = require('express').Router()
  const User = require('../models/user')

  loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response
      .status(200)
      .send({ token, username: user.username, name: user.name })
  })

  module.exports = loginRouter



  Artık oturum açma kodunun, yeni yönlendiriciyi app.js dosyasına ekleyerek uygulamaya eklenmesi gerekiyor

  const loginRouter = require('./controllers/login')

  //...

  app.use('/api/login', loginRouter)

************************* 1- Limiting creating new notes to logged-in users - Yeni not oluşturmayı oturum açmış kullanıcılarla sınırlama *************************

  Yeni notlar oluşturmayı değiştirelim, böylece bu yalnızca gönderi isteğine geçerli bir belirteç eklenmişse mümkün olur. Not daha sonra belirteç tarafından
  tanımlanan kullanıcının notlar listesine kaydedilir.

  Belirteci tarayıcıdan sunucuya göndermenin birkaç yolu vardır. Authorization başlığını kullanacağız . Başlık ayrıca hangi kimlik doğrulama şemasının
  kullanıldığını da belirtir. Sunucu kimlik doğrulama için birden fazla yol sunuyorsa bu gerekli olabilir. Şemanın tanımlanması, sunucuya ekli kimlik bilgilerinin
  nasıl yorumlanması gerektiğini söyler.

  Bearer şeması ihtiyaçlarımıza uygundur.

  Pratikte bu, eğer belirteç örneğin eyJhbGciOiJIUzI1NiIsInR5c2VybmFtZSI6Im1sdXVra2FpIiwiaW dizesiyse Yetkilendirme başlığının şu değere sahip olacağı anlamına
  gelir:

  Bearer eyJhbGciOiJIUzI1NiIsInR5c2VybmFtZSI6Im1sdXVra2FpIiwiaW

  Yeni notlar oluşturmak şu şekilde değişecektir ( controllers/notes.js ):


  const jwt = require('jsonwebtoken')       ==>   Yeni satir.

  // ...

  const getTokenFrom = request => {                    ==>   Yeni kod blogu.
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
  }

  notesRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)       ==>   Yeni satir.
    if (!decodedToken.id) {                                                          ==>   Yeni kod blogu.
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)                                ==>   Yeni satir.

    const note = new Note({
      content: body.content,
      important: body.important === undefined ? false : body.important,
      user: user._id
    })

    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    response.json(savedNote)
  })

  Yardımcı işlev getTokenFrom, token'i yetkilendirme başlığından ayırır. Token'in geçerliliği jwt.verify ile kontrol edilir. Yöntem ayrıca token'in
  kodunu çözer veya token'in temel aldığı Nesneyi döndürür.


  Token eksikse veya geçersizse JsonWebTokenError istisnası ortaya çıkar. Bu özel durumu ele almak için hata işleme ara yazılımını genişletmemiz gerekiyor:

  const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
      return response.status(400).json({ error: 'expected `username` to be unique' })
    } else if (error.name ===  'JsonWebTokenError') {                       =====> Bu else-if blogu eklendi.
      return response.status(401).json({ error: 'token invalid' })
    }

    next(error)
  }


  Token'dan kodu çözülen nesne , sunucuya isteği kimin yaptığını bildiren kullanıcı adı ve kimlik alanlarını içerir.

  Token'dan kodu çözülen nesne kullanıcının kimliğini içermiyorsa ( decodedToken.id tanımsız), yetkisiz hata durum kodu 401 döndürülür ve
  hatanın nedeni yanıt gövdesinde açıklanır.

  Talebi yapanın kimliği belirlendiğinde yürütme eskisi gibi devam eder.

  Yetkilendirme başlığına doğru değer verilirse artık Postman kullanılarak yeni bir not oluşturulabilir ; Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ
  dizesi; burada ikinci değer, oturum açma işlemi tarafından döndürülen token'dir.


************************************** 2- Problems of Token-based authentication - Token tabanlı kimlik doğrulama sorunları **************************************

  Token kimlik doğrulamasının uygulanması oldukça kolaydır ancak bir sorun içerir. API kullanıcısı örneğin; Bir React uygulaması bir kez bir token aldığında
  API'nin token sahibine kör bir güveni vardır. Peki ya token sahibinin erişim hakları iptal edilirse?

  Sorunun iki çözümü var. Daha kolay olanı bir tokenın geçerlilik süresini sınırlamaktır:

  loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    // token expires in 60*60 seconds, that is, in one hour
    const token = jwt.sign(                 =====> oklar arasi eklendi
      userForToken,
      process.env.SECRET,
      { expiresIn: 60*60 }
    )                                       <=====

    response
      .status(200)
      .send({ token, username: user.username, name: user.name })
  })

  Belirtecin süresi dolduğunda istemci uygulamasının yeni bir belirteç alması gerekir. Genellikle bu, kullanıcıyı uygulamaya yeniden giriş yapmaya
  zorlayarak gerçekleşir.

  Hata işleme ara yazılımı, süresi dolmuş bir belirteç durumunda uygun bir hata verecek şekilde genişletilmelidir:

  const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
      return response.status(400).json({
        error: 'expected `username` to be unique'
      })
    } else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({
        error: 'invalid token'
      })
    } else if (error.name === 'TokenExpiredError') {
      return response.status(401).json({
        error: 'token expired'
      })
    }

    next(error)
  }

  Son kullanma süresi ne kadar kısa olursa çözüm o kadar güvenli olur. Dolayısıyla, token yanlış ellere geçerse veya kullanıcının sisteme erişiminin iptal
  edilmesi gerekirse, token yalnızca sınırlı bir süre için kullanılabilir. Öte yandan, son kullanma süresinin kısa olması kullanıcıyı potansiyel olarak
  sıkıntıya sokuyor, sisteme daha sık giriş yapmak gerekiyor.

  Diğer çözüm ise her bir token hakkındaki bilgiyi arka uç veritabanına kaydetmek ve tokenlara karşılık gelen erişim haklarının hala geçerli olup olmadığını
  her API isteğini kontrol etmektir. Bu şema ile erişim hakları istenildiği zaman iptal edilebilir. Bu tür bir çözüme genellikle sunucu tarafı oturumu denir.

  Sunucu tarafı oturumlarının olumsuz yönü, arka uçtaki karmaşıklığın artması ve ayrıca veritabanına yapılan her API isteği için belirteç geçerliliğinin kontrol
  edilmesi gerektiğinden performans üzerindeki etkisidir. Veritabanı erişimi, belirtecin kendisinin geçerliliğini kontrol etmeye kıyasla oldukça yavaştır. Bu
  nedenle, bir tokena karşılık gelen oturumu Redis gibi bir anahtar-değer veri tabanına kaydetmek oldukça yaygındır

  Sunucu tarafı oturumları kullanıldığında, belirteç çoğunlukla yalnızca rastgele bir dizedir ve jwt belirteçleri kullanıldığında oldukça sık olduğu gibi
  kullanıcı hakkında herhangi bir bilgi içermez. Her API isteği için sunucu, kullanıcının kimliğiyle ilgili bilgileri veritabanından alır. Yetkilendirme
  başlığını kullanmak yerine, belirteci istemci ile sunucu arasında aktarma mekanizması olarak çerezlerin kullanılması da oldukça olağandır .
*/

const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port http://localhost:${config.PORT}`)
})