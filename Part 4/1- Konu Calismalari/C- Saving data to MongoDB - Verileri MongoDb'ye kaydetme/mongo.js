const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

//console.log("process.argv",process.argv[2])

 const url =
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

/*    Alttaki kod blogu index.js icindeki 4. maddeye göre bir altaki haline dönusuruldu.

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
*/

/*
    index.js deki 4. madde geregince degistirilen altta ki kod blogu; bir notu MongoDB'ye kaydetmek için kullanılır ve kaydetme işlemi
    başarıyla tamamlandıktan sonra tüm notları bulur ve konsola yazdırır. Son olarak, MongoDB bağlantısını kapatır.
*/
note.save().then(result => {      /*  ==>   Bu kısım, yeni bir notu MongoDB'ye kaydetmek için kullanılır. save() yöntemi bir Promise
                                            döndürür, bu nedenle then() yöntemi ile asenkron olarak işlemin tamamlanmasını bekleriz.
                                            Kaydetme işlemi tamamlandığında, result parametresiyle geri dönen sonucu alırız.Burada
                                            sadece "note saved!" metnini konsola yazdırıyoruz.
                                  */
  console.log('note saved!')
  Note.find({}).then(result => {  /*  ==>   Bu kısım, tüm notları MongoDB'den bulmak için kullanılır. find() yöntemi, belirli bir
                                            koşulu sağlayan tüm belgeleri bulmak için kullanılır. Burada boş bir nesne {} kullanarak
                                            tüm notları buluyoruz. Sonuç olarak, bir Promise döner ve then() yöntemiyle asenkron olarak
                                            işlemin tamamlanmasını bekleriz. Bulunan notları result parametresiyle alırız ve her bir
                                            notu konsola yazdırırız. Eger aramamizi sadece önemli notlari döndurecek sekilde ayarlamak
                                            isteseydik, kodumuzu Note.find({ important: true }).then(result => {}) seklinde yazardik.
                                  */
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()   /*  ==>   Son olarak, MongoDB bağlantısını kapatırız. Bu, veritabanı işlemlerinin tamamlandığını ve
                                            veritabanıyla olan bağlantının artık gerekli olmadığını belirtir.
                                  */
  })
})