/*  ilk olarak bu class icin gerekli olan modulleri yukluyorum. */
const { test, describe } = require('node:test') /*  ==> Test yazmak için kullanılan bir modüldür. describe ve test
                                                        fonksiyonları, testleri organize etmek ve çalıştırmak için
                                                        kullanılır.
                                                */
const assert = require('node:assert')           /*  ==> Doğrulama yapmak için kullanılan bir modüldür.
                                                        assert.strictEqual ile iki değerin eşit olup olmadığını
                                                        kontrol eder.
                                                */
const listHelper = require('../utils/list_helper')  /*  ==> Test edilen yardımcı fonksiyonların bulunduğu modüldür.*/

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe("favorite blog", () => {
  const blogs = [
        {
            "_id": "66f12f54eb068cf7bb2551fd",
            "title": "Introduction to Node.js",
            "author": "Jane Smith",
            "url": "https://example.com/intro-to-nodejs",
            "likes": 78,
            "__v": 0
          },
          {
            "_id": "66f12f61eb068cf7bb2551ff",
            "title": "Understanding JavaScript Closures",
            "author": "John Doe",
            "url": "https://example.com/javascript-closures",
            "likes": 42,
            "__v": 0
          },
          {
            "_id": "66f17f9418e6962226edd589",
            "title": "To Kill a Mockingbird",
            "author": "Harper Lee",
            "url": "",
            "likes": 86,
            "__v": 0
          },
          {
            "_id": "66f17fb018e6962226edd58b",
            "title": "1984",
            "author": "George Orwell",
            "url": "",
            "likes": 103,
            "__v": 0
          },
  ];

  test("returns the blog with the most likes", () => {
    const result = listHelper.favoriteBlog(blogs);
    const expected = {
      title: "1984",
      author: "George Orwell",
      likes: 103,
    };
    assert.deepStrictEqual(result, expected);
  });
});

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]
/*
    Son olarak testi tanimlayip calistiracak kodu yazdim.
*/
  test('when list has only one blog, equals the likes of that', () => {   /*  ==> test: Tek bir test tanımlar. Bu
                                                                                  testin açıklaması "when list has
                                                                                  only one blog, equals the likes
                                                                                  of that" şeklindedir.
                                                                          */
    const result = listHelper.totalLikes(listWithOneBlog)   /*  ==> listHelper modülündeki totalLikesfonksiyonu
                                                                    çağrılır ve listWithOneBlog parametresi ile
                                                                    çalıştırılır. Bu fonksiyon, blog listesindeki
                                                                    toplam beğeni sayısını hesaplar.
                                                            */
    assert.strictEqual(result, 5)       /*  ==> result ile 5 strictEqual kullanılarak karşılaştırılır. Yani result
                                                değeri 5'e eşit olmalıdır. Eğer bu değerler eşit değilse, test
                                                başarısız olur ve hata verir.
                                        */
  })


  test('of empty list is zero', () => {
      const emptyList = []
      const result = listHelper.totalLikes(emptyList)
      assert.strictEqual(result, 0)
    })

    test('of a bigger list is calculated right', () => {
      const listWithMultipleBlogs = [
          {
              "_id": "66f12f54eb068cf7bb2551fd",
              "title": "Introduction to Node.js",
              "author": "Jane Smith",
              "url": "https://example.com/intro-to-nodejs",
              "likes": 78,
              "__v": 0
            },
            {
              "_id": "66f12f61eb068cf7bb2551ff",
              "title": "Understanding JavaScript Closures",
              "author": "John Doe",
              "url": "https://example.com/javascript-closures",
              "likes": 42,
              "__v": 0
            },
            {
              "_id": "66f17f9418e6962226edd589",
              "title": "To Kill a Mockingbird",
              "author": "Harper Lee",
              "url": "",
              "likes": 86,
              "__v": 0
            },
            {
              "_id": "66f17fb018e6962226edd58b",
              "title": "1984",
              "author": "George Orwell",
              "url": "",
              "likes": 103,
              "__v": 0
            }
      ]
      const result = listHelper.totalLikes(listWithMultipleBlogs)
      assert.strictEqual(result, 309)
    })

})

describe("most blogs", () => {
const blogs = [
  {
    "_id": "66f12f54eb068cf7bb2551fd",
    "title": "Introduction to Node.js",
    "author": "Jane Smith",
    "url": "https://example.com/intro-to-nodejs",
    "likes": 78,
    "__v": 0
  },
  {
    "_id": "66f12f61eb068cf7bb2551ff",
    "title": "Understanding JavaScript Closures",
    "author": "John Doe",
    "url": "https://example.com/javascript-closures",
    "likes": 42,
    "__v": 0
  },
  {
    "_id": "66f17f9418e6962226edd589",
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "url": "",
    "likes": 86,
    "__v": 0
  },
  {
    "_id": "66f17fb018e6962226edd58b",
    "title": "1984",
    "author": "George Orwell",
    "url": "",
    "likes": 103,
    "__v": 0
  },
  {
    "_id": "66f18e4e5069a50567dad8c0",
    "title": "Go Set a Watchman",
    "author": "Harper Lee",
    "url": "",
    "likes": 18,
    "__v": 0
  }
];

test("returns the author with the most blogs", () => {    /*   mostBlogs fonksiyonunun "en çok blog yazan yazarı döndürmesi" bekleniyor.*/

const result = listHelper.mostBlogs(blogs);     /*  ==> listHelper class'indan mostBlogs fonksiyonu cagirilir ve blogs dizisi parametre
                                                        olarak verilir. Gelen sonuc result degiskenine atanir. */

const expected = {          /*  ==> Beklenilen deger belirlenir. */
author: "Harper Lee",
blogs: 2,
};
assert.deepStrictEqual(result, expected);   /*  ==> Gerceklesen deger ile beklenen deger kontrol edilerek testin basarili olup olmadigina
                                                    bakilir. */
});
});