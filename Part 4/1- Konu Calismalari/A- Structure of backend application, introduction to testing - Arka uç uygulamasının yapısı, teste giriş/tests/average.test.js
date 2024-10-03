/*
    Bu kod parçası, average (ortalama) fonksiyonunu test etmek için node:test modülünü kullanarak testler tanımlar.
*/

//Gerekli Modüllerin Yüklenmesi
const { test, describe } = require('node:test')   /*  ==>   Node.js'in yerleşik test modülünden test fonksiyonunu alır. Bu fonksiyon, bireysel testleri
                                                            tanımlamak için kullanılır. estleri gruplamak için kullanılan bir fonksiyon. Testleri daha
                                                            organize hale getirir.
                                                  */
const assert = require('node:assert')             /*  ==>   Node.js'in yerleşik assert modülünü alır. Bu modül, değerlerin beklenen sonuçlara eşit olup
                                                            olmadığını doğrulamak için kullanılır.
                                                  */
//Average Fonksiyonunun Yüklenmesi
const average = require('../utils/for_testing').average   /*  ==> ../utils/for_testing dosyasından average fonksiyonunu alır. Bu
                                                                  fonksiyon, bir dizideki sayıların ortalamasını hesaplar.
                                                          */

//Testlerin Tanımlanması
describe('average', () => {           /*  ==> average fonksiyonuna yönelik testleri gruplar. Bu grup, average fonksiyonunun farklı
                                              durumlarda nasıl davrandığını test eder.
                                      */
  test('of one value is the value itself', () => {
    assert.strictEqual(average([1]), 1)
  })

  test('of many is calculated right', () => {
    assert.strictEqual(average([1, 2, 3, 4, 5, 6]), 3.5)
  })

  test('of empty array is zero', () => {
    assert.strictEqual(average([]), 0)
  })
})

/*
    Özet
    Bu kod parçası, average fonksiyonunu test etmek için üç test tanımlar ve bu testleri bir grup altında toplar:

    Tek bir değerin ortalamasını test eder.
    Birden fazla değerin ortalamasını doğru hesaplar.
    Boş bir dizinin ortalamasının 0 olduğunu kontrol eder.

    Bu testler, average fonksiyonunun farklı durumlarda doğru sonuçlar verdiğini doğrular. Eğer fonksiyon doğru çalışıyorsa, tüm
    testler geçer; aksi takdirde, testler hata verir ve hangi testin başarısız olduğunu belirtir.
*/