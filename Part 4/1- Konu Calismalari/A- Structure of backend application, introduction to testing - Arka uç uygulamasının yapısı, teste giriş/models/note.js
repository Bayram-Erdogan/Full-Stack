/*
    Bu kod parçası, Mongoose kullanarak bir MongoDB veritabanında notlar için bir model tanımlar.
*/

//Gerekli Modülün Yüklenmesi
const mongoose = require("mongoose");   //  ==> MongoDB ile çalışmak için kullanılan Mongoose ORM'yi yükler.

//Şema Tanımlaması
const noteSchema = new mongoose.Schema({    //  ==> Bir Mongoose şeması tanımlar. Bu şema, Note koleksiyonundaki belgelerin (dokümanların) yapısını belirtir.
  content: {          //  ==> Notun içeriğini temsil eden bir alan
    type: String,     //  ==> İçeriğin veri türü String olmalıdır.
    required: true,   //  ==> Bu alan zorunludur, yani bir not oluşturulurken mutlaka belirtilmelidir.
    minlength: 5      //  ==> İçeriğin en az 5 karakter uzunluğunda olması gerekmektedir.
  },
  important: Boolean, //  ==> Notun önemli olup olmadığını belirten bir alan. Veri türü Boolean olup, true veya false değerlerini alabilir.
})

//toJSON Dönüşümü
noteSchema.set("toJSON", {    //  ==> toJSON: Bu ayar, Mongoose şemasının JSON'a dönüştürülmesi sırasında uygulanacak özel bir dönüşüm işlemi tanımlar.
  transform: (document, returnedObject) => {  /*  ==> transform fonksiyonu, belge (document) ve döndürülen nesne (returnedObject) olmak üzere iki parametre
                                                      alır.
                                              */
    returnedObject.id = returnedObject._id.toString();  //  ==> MongoDB tarafından oluşturulan _id alanı id olarak dönüştürülür ve String formatına çevrilir.
    delete returnedObject._id;                          //  ==> Orijinal _id alanı JSON çıktısından kaldırılır.
    delete returnedObject.__v;                          //  ==> Mongoose'un dahili olarak kullandığı __v alanı JSON çıktısından kaldırılır.
  },
});

//  Modelin Dışa Aktarılması
const Note = mongoose.model("Note", noteSchema);

module.exports = Note   //  ==> Bu modelin dışa aktarılmasını sağlar, böylece uygulamanın diğer bölümlerinde kullanılabilir hale gelir.

/*
    Özet
    Bu kod parçası:

    Mongoose kullanarak bir noteSchema tanımlar. Bu şema, notların content ve important alanlarını içerir.
    JSON dönüşümü sırasında _id alanını id olarak yeniden adlandırır ve __v alanını kaldırır.
    Note isimli bir Mongoose modelini dışa aktarır. Bu model, uygulamanın diğer bölümlerinde notları oluşturmak, okumak, güncellemek ve silmek için
    kullanılabilir.
    Bu yapı, veritabanındaki notların belirli bir yapıya sahip olmasını ve JSON çıktısının temiz ve anlaşılır olmasını sağlar.
*/