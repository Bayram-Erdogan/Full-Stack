/*
    Bu kod parçası, Node.js'in yerleşik test modülünü (node:test) kullanarak bir dizi test tanımlar. Bu testler, bir reversefonksiyonunun doğru çalışıp
    çalışmadığını kontrol eder.
*/


//Gerekli Modüllerin Yüklenmesi
const { test } = require("node:test");    //  ==> Node.js'in yerleşik test modülünden test fonksiyonunu alır. Bu fonksiyon, test tanımlamak için kullanılır.
const assert = require("node:assert");    /*  ==> Node.js'in yerleşik assert modülünü alır. Bu modül, değerlerin beklenen sonuçlara eşit olup olmadığını
                                                  doğrulamak için kullanılır.
                                          */
//reverse Fonksiyonunun Yüklenmesi
const reverse = require("../utils/for_testing").reverse;  /*  ==> ../utils/for_testing dosyasından reverse fonksiyonunu alır. Bu fonksiyonun, bir dizgenin
                                                                  (string) tersini döndürdüğünü varsayıyoruz.
                                                          */

describe("average", () => {
  test("reverse of a", () => {
    const result = reverse("a");

    assert.strictEqual(result, "a");
  });

  test("reverse of react", () => {
    const result = reverse("react");

    assert.strictEqual(result, "tcaer");
  });

  test("reverse of saippuakauppias", () => {          //  ==> 'saippuakauppias' dizgesinin ters çevrilmesini test eder.
    const result = reverse("saippuakauppias");        /*  ==> 'saippuakauppias' dizgesini ters çevirir. Bu dizge palindrom olduğundan, ters çevrildiğinde
                                                              kendisiyle aynı kalır. Beklenen sonuç yine 'saippuakauppias''dır.
                                                      */
    assert.strictEqual(result, "saippuakauppias");    //  result değişkeninin 'saippuakauppias' değerine eşit olduğunu doğrular.
  });

  test("Bayram", () => {
    const result = reverse("Bayram");

    assert.strictEqual(result, "maryaB");
  });
});

/*
    Özet
    Bu kod parçası, reverse fonksiyonunun doğru çalışıp çalışmadığını test etmek için üç test tanımlar. Her bir test, reverse fonksiyonunun farklı bir
    girdiyle doğru sonuç verdiğini doğrulamak için assert.strictEqual kullanır:

    'a' karakterinin ters çevrilmesini test eder.
    'react' dizgesinin ters çevrilmesini test eder.
    'saippuakauppias' palindrom dizgesinin ters çevrilmesini test eder.
    'Bayram' dizgesinin ters çevrilmesini test eder.

    Bu testler, reverse fonksiyonunun beklenen şekilde çalıştığını doğrulamak için kullanılır. Eğer fonksiyon doğru çalışıyorsa, tüm testler geçer; aksi
    takdirde, testler hata verir ve hangi testin başarısız olduğunu belirtir.
*/
