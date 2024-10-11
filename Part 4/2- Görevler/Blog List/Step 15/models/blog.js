const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,     /*  ==> Bu, user alanının bir ObjectId türünde olduğunu belirtir. ObjectId, MongoDB'de her
                                                      belgeye otomatik olarak atanan benzersiz bir tanımlayıcıdır. Bu, başka bir koleksiyondaki
                                                      (bu durumda "User" koleksiyonu) belgelere referans vermek için kullanılır. Yani, her blog
                                                      belgesi, kullanıcı belgesine bir ObjectId ile referans verebilir.
                                              */
    ref: 'User'                               /*  ==> Bu, user alanının referans verdiği koleksiyonu belirtir. 'User', User modeline işaret
                                                      eder. Bu şekilde, Blog belgesindeki user alanı, User koleksiyonundaki belirli bir belgeye
                                                      referans verir.
                                              */

    /*  Özet:
        Bu yapı, MongoDB'de ilişkisel veritabanlarındaki gibi, belgeler arasında ilişki kurmanıza izin verir. Blog belgelerindeki user alanı,
        User koleksiyonundaki belgelerden birine referans verir, bu sayede hangi kullanıcının (yazarın) hangi blog yazısını yazdığını takip
        edebilirsiniz.
    */
  }
})

blogSchema.set("toJSON", {
   transform: (document, returnedObject) => {
     returnedObject.id = returnedObject._id.toString();
     delete returnedObject._id;
     delete returnedObject.__v;
   },
});

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog