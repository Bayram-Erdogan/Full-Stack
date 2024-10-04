/*
    Bu kod, Express.js kullanarak bir giriş (login) sistemi oluşturuyor.
*/
const jwt = require('jsonwebtoken') /*  ==> jsonwebtoken kütüphanesini yükler. Bu kütüphane, JSON Web Tokens (JWT) oluşturmak ve doğrulamak için kullanılır.*/
const bcrypt = require('bcrypt')    /*  ==> bcrypt kütüphanesini yükler. Bu kütüphane, şifreleri güvenli bir şekilde hashlemek ve hashleri karşılaştırmak için
                                            kullanılır.
                                    */
const loginRouter = require('express').Router() /*  ==> Express.js'in router özelliğini kullanarak yeni bir router nesnesi oluşturur. Bu router, belirli
                                                        yollar için middleware ve route'ları gruplamak için kullanılır.
                                                */
const User = require('../models/user')      /*  ==> Kullanıcı modelini yükler. Bu model, MongoDB'deki kullanıcı veritabanı koleksiyonuyla etkileşimde bulunmak
                                                    için kullanılır.
                                            */

loginRouter.post('/', async (request, response) => {    /*  ==> Kullanıcı modelini yükler. Bu model, MongoDB'deki kullanıcı veritabanı koleksiyonuyla
                                                                etkileşimde bulunmak için kullanılır.
                                                        */
  const { username, password } = request.body   /*  ==> request.body: İstek gövdesinden (request.body) gelen username ve password alanlarını çıkarır. Bu,
                                                        kullanıcının giriş formunda gönderdiği verileri içerir.
                                                */

  const user = await User.findOne({ username }) /*  ==> Veritabanında username ile eşleşen kullanıcıyı arar. await ifadesi, bu işlemin tamamlanmasını
                                                        bekler.
                                                */
  const passwordCorrect = user === null         /*  ==> Kullanıcı bulunamazsa (user === null), passwordCorrect değişkeni false olarak ayarlanır. Kullanıcı
                                                        bulunursa, bcrypt.compare fonksiyonu kullanılarak girilen şifrenin (password) kullanıcı
                                                        veritabanındaki hashlenmiş şifre (user.passwordHash) ile eşleşip eşleşmediği kontrol edilir.
                                                */
    ? false
    : await bcrypt.compare(password, user.passwordHash) /*  ==> Parolaların kendileri veritabanına kaydedilmediğinden, parolalardan hesaplanan karmalardan
                                                                dolayı, parolanın doğru olup olmadığını kontrol etmek için bcrypt.compare yöntemi kullanılır.
                                                        */

  if (!(user && passwordCorrect)) {             /*  Kullanıcı bulunamazsa veya şifre yanlışsa, bu koşul sağlanır. Kullanıcı adı veya şifre geçersiz
                                                    olduğunda, 401 (Yetkisiz) HTTP durumu ve hata mesajı ile cevap verir.
                                                */
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {                /*  ==> Şifre doğruysa jwt.sign yöntemiyle bir jeton oluşturulur. Token için kullanılacak kullanıcı bilgilerini
                                                (username ve id) içeren bir nesne oluşturur.*/
    username: user.username,
    id: user._id,
  }

  /*const token = jwt.sign(userForToken, process.env.SECRET)      /*  ==> jwt.sign fonksiyonunu kullanarak, userForToken bilgilerini ve ortam değişkenlerinden
                                                                        (process.env.SECRET) alınan bir gizli anahtarla bir JWT oluşturur.
                                                                */
  const token = jwt.sign(               /*      ==>     jwt.sign Fonksiyonu:  jwt.sign fonksiyonu, JWT (JSON Web Token) oluşturmak için kullanılır.
                                                        Bu fonksiyon, kullanıcı bilgilerini içeren bir token oluşturur ve bu token, belirli bir süre boyunca
                                                        geçerli olur.
                                        */
    userForToken,                       /*      ==>     userForToken değişkeni, token içinde saklanacak kullanıcı bilgilerini içerir. Genellikle bu, kullanıcı
                                                        kimliğini ve gerekli diğer bilgileri içeren bir nesnedir.
                                        */
    process.env.SECRET,                 /*      ==>     process.env.SECRET, token'ı imzalamak için kullanılan gizli anahtarı (secret key) belirtir. Bu gizli
                                                        anahtar, token'ın güvenliğini sağlar. Bu anahtar, genellikle bir ortam değişkeni olarak tanımlanır ve
                                                        kodda doğrudan bulunmaz.
                                        */
    { expiresIn: 60*60 }                /*      ==>     Bu nesne, token'ın ne kadar süre geçerli olacağını belirtir. expiresIn anahtarı, token'ın süresinin
                                                        ne zaman dolacağını belirtir. Bu örnekte, 60 * 60 değeri 3600 saniyeye (veya 1 saate) eşittir. Yani bu
                                                        token, oluşturulduktan sonra 1 saat boyunca geçerli olacaktır.
                                        */
  )

  response                  /*  ==> İstek başarılı olduğunda, 200 (Başarılı) HTTP durumu ve oluşturulan token, kullanıcının kullanıcı adı ve adı ile birlikte
                                    cevap olarak gönderilir.
                            */
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter        /*  ==> loginRouter nesnesini dışa aktarır, böylece bu router başka dosyalarda kullanılabilir.*/

/*
        Not     : username ve password kullanici olusturmak icin kullanilan username ve password'dur.
*/