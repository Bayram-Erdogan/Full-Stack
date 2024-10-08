/*
    Cevresel değişkenlerin (process.env) .env dosyasından yüklenmesini ve bunların diğer dosyalarda kullanılabilmesini sağlamak
    icin config.js isimli dosyayi olusturdum.
*/
require('dotenv').config()      /*  ==> Bu satır, dotenv modülünü projeye dahil eder ve .env dosyasından çevresel değişkenlerin
                                        yüklenmesini sağlar. .env dosyası, genellikle gizli veya değişkenlerin depolandığı bir
                                        dosyadır ve bu dosya anahtar-değer çiftleri içerir.
                                */

const PORT = process.env.PORT   /*  ==> Bu kod, PORT değişkenini çevresel değişkenlerden (process.env.PORT) alır. process.env.
                                        PORT, uygulamanın hangi bağlantı noktasında çalışacağını belirtir.
                                */
const MONGODB_URI = process.env.MONGODB_URI     /*  ==> Bu kod, MONGODB_URI değişkenini çevresel değişkenlerden
                                                        (process.env.MONGODB_URI) alır. process.env.MONGODB_URI, MongoDB
                                                        veritabanına bağlanmak için kullanılacak URI'yi belirtir
                                                */

module.exports = {              /*  ==> Bu kod, MONGODB_URI ve PORT değişkenlerini dışa aktarır. Böylece, bu değişkenler
                                        diğer dosyalarda kullanılabilir hale gelir. Bu, bu değişkenlerin tek bir dosyada
                                        toplanmasını ve diğer dosyalarda kolayca erişilebilir olmasını sağlar.
                                */
  MONGODB_URI,
  PORT
}