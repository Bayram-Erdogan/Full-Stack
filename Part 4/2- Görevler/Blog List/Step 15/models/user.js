// Bu kod parçacığı MongoDB'de bir User (Kullanıcı) modelini tanımlar ve yapılandırır.
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,         //  Kullanıcının kullanıcı adını tutan bir String alanı.
  name: String,             //  Kullanıcının adını tutan bir String alanı.
  passwordHash: String,     /*  Kullanıcının şifre hash'ini tutan bir String alanı. Şifreyi düz metin yerine hashlenmiş halde tutmak
                                güvenlik açısından önemlidir.*/
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,     //  Bu alanın her elemanının ObjectId türünde olduğunu belirtir.
      ref: 'Blog'                               /*  'Blog': Bu referansın Blog koleksiyonundaki belgelere işaret ettiğini belirtir.
                                                    Böylece, blogs alanı bu kullanıcının yazdığı blog yazılarına referans verir.
                                                */
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {    /*  Bu, şemadaki belgeler JSON formatına dönüştürülürken nasıl görüneceğini belirleyen
                                                    bir dönüşüm fonksiyonudur. document : Dönüştürülen orijinal belge. returnedObject: JSON
                                                    olarak döndürülen, dönüştürülmüş belge.
                                                */
    returnedObject.id = returnedObject._id.toString()   //  _id alanını id olarak değiştirir ve String türüne çevirir.
    delete returnedObject._id                           //  _id alanını siler.
    delete returnedObject.__v                           //  __v alanını (Mongoose sürüm anahtarı) siler.
    delete returnedObject.passwordHash                  /*  passwordHash alanını siler, bu da hassas verileri istemciye gönderirken güvenli
                                                            olmasını sağlar.*/
    delete returnedObject.blogs;
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User

/*
    Özet
    Bu kod parçası, kullanıcı bilgilerini ve kullanıcıların yazdığı blog yazılarının referanslarını içeren bir User modelini tanımlar. JSON
    dönüşümü sırasında bazı hassas bilgileri (şifre hash gibi) kaldırarak ve _id alanını id olarak değiştirerek daha temiz ve güvenli bir
    çıktı sağlar.
*/