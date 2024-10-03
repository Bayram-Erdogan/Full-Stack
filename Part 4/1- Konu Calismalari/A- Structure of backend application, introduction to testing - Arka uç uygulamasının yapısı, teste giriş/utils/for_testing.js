/*
    Bu kod parçası, iki fonksiyon (reverse ve average) tanımlar ve bunları dışa aktarır.
*/
const reverse = (string) => {   //  ==>  Verilen bir dizgeyi (string) tersine çevirir.
    return string
      .split('')  //  ==> Dizgeyi karakterlerine ayırarak bir dizi (array) oluşturur. Örneğin, 'hello' dizgesi ['h', 'e', 'l', 'l', 'o'] dizisine dönüşür.
      .reverse()  //  ==> Diziyi tersine çevirir. Örneğin, ['h', 'e', 'l', 'l', 'o'] dizisi ['o', 'l', 'l', 'e', 'h'] dizisine dönüşür.
      .join('')   //  ==> Tersine çevrilmiş diziyi tekrar bir dizgeye dönüştürür. Örneğin, ['o', 'l', 'l', 'e', 'h'] dizisi 'olleh' dizgesine dönüşür.
  }


const average = array => {          //  ==> Verilen bir sayılar dizisinin (array) ortalamasını hesaplar.
    const reducer = (sum, item) => {  //  ==> reducer Fonksiyonu:  Parametreler: sum (toplam) ve item (geçerli öğe).
      return sum + item               //  ==> Geçerli öğeyi toplama ekler ve yeni toplamı döner.
    }

    return array.length === 0     /*  ==> Ortalamanın Hesaplanması array.length === 0 ? 0 : ...: Eğer dizi boşsa (array.length === 0), ortalama 0 olarak
                                          döner. Boş bir dizinin toplamı olmadığı için bu kontrol gereklidir.
                                  */
      ? 0
      : array.reduce(reducer, 0) / array.length /*  ==> reduce Metodu: Dizinin her bir öğesi üzerinde reducer fonksiyonunu çalıştırarak dizinin tüm
                                                        öğelerini toplar. 0: Başlangıç değeri, yani toplamın başlangıçta 0 olduğunu belirtir.
                                                        / array.length: Dizinin toplamını uzunluğuna böler, böylece ortalamayı hesaplar.
                                                */
  }


//Dışa Aktarma
  module.exports = {  //  reverse ve average fonksiyonlarını dışa aktarır, böylece bu fonksiyonlar başka dosyalarda kullanılabilir hale gelir.
    reverse,
    average,
  }

/*
    Özet
    Bu kod parçası:

    reverse fonksiyonu ile bir dizgeyi tersine çevirir.
    average fonksiyonu ile bir sayılar dizisinin ortalamasını hesaplar.
    Her iki fonksiyonu da dışa aktararak, uygulamanın diğer bölümlerinde kullanılabilir hale getirir.







*/