//Gerekli Modüllerin ve Router'ın Tanımlanması
const bcrypt = require('bcrypt')        //  Şifrelerin güvenli bir şekilde hashlenmesi için kullanılan bir kütüphane
const usersRouter = require('express').Router() /*  Express.js router nesnesi. Bu nesne, kullanıcılarla ilgili HTTP isteklerini (örn. POST, GET)
                                                    işlemek için kullanılır.
                                                */
const User = require('../models/user')  //  Kullanıcı modelini tanımlayan ve MongoDB ile etkileşime geçmek için kullanılan Mongoose modeli.

//  POST İsteği ile yeni kullanıcı oluşturma
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body     /*  request.body içindeki username, name, ve password alanları, gelen HTTP POST
                                                            isteğinden alınır.*/

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)  /*  bcrypt.hash(password, saltRounds) fonksiyonu, verilen şifreyi belirli bir
                                                                    sayıda tuzlama (salt) işlemiyle hashler. saltRounds, hashleme işleminin
                                                                    karmaşıklığını belirler (10 burada yaygın kullanılan bir değerdir).
                                                                */

  const user = new User({       /*  User modeli kullanılarak yeni bir kullanıcı nesnesi oluşturulur. password alanı yerine hashlenmiş şifre
                                    (passwordHash) kullanılır.
                                */
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()   /*  user.save() fonksiyonu, kullanıcıyı MongoDB veritabanına kaydeder. Bu da asenkron bir işlemdir,
                                            bu yüzden await kullanılır.
                                        */

  response.status(201).json(savedUser)  /*  Yeni oluşturulan kullanıcı belgesi (JSON formatında) ve HTTP durum kodu 201 Created ile istemciye
                                            geri döndürülür.
                                        */
})

//  Get İsteği ile tum kullanicilari getirme
usersRouter.get('/', async(request, response) => {
    const users= await User.find({})
    response.json(users)
})

module.exports = usersRouter

/*
    Özet
    Bu kod parçası, yeni kullanıcıların kaydedilmesi için bir POST isteğini işler. İstekten alınan kullanıcı adı, isim ve şifre verilerini
    alır, şifreyi güvenli bir şekilde hashler ve ardından bu bilgileri MongoDB veritabanına kaydeder. İşlem tamamlandıktan sonra, yeni
    oluşturulan kullanıcı belgesini JSON formatında ve 201 Created HTTP durum kodu ile istemciye geri gönderir.
*/