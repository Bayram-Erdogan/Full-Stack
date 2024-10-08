/*
    MongoDB için bir Mongoose şeması oluşturmak ve şema temelinde bir Model tanimlamak icin bu dosyayi olusturdum.
*/
const mongoose = require("mongoose");       /*  ==> Mongoose, MongoDB işlemlerini kolaylaştıran bir kütüphanedir. Bu satır,
                                                    Mongoose kütüphanesini projeye dahil ediyor.
                                            */

const blogSchema = new mongoose.Schema({    /*  ==> Bu kod blogu, blog nesnesini temsil eden bir Mongoose şeması oluşturur.
                                                    Bu şema, blogun hangi alanlara sahip olduğunu ve bu alanların hangi türde
                                                    veri tuttuğunu belirtir. Burada blogun title, author, url ve likes gibi
                                                    özellikleri olduğu belirtilmiştir.
                                            */
    title: String,
    author: String,
    url: String,
    likes: Number
  })

const Blog = mongoose.model('Blog', blogSchema)     /*  ==> Bu satir, Mongoose tarafından tanımlanan bir Model oluşturur.
                                                            Blog adında bir model oluşturulur ve bu model, blogSchema
                                                            şemasına dayanır. Bu, MongoDB'deki blogs koleksiyonuna karşılık
                                                            gelir ve bu koleksiyonda title, author, url ve likes alanlarını
                                                            içeren belgelerin bulunması beklenir.
                                                    */

module.exports = Blog                       /*  ==> Bu satir ile oluşturulan Blog modeli, dışa aktarılır. Böylece, bu model
                                                    diğer dosyalarda kullanılabilecek hale gelir.
                                            */