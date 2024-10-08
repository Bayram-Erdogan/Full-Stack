const _ = require('lodash');
const dummy = (blogs) => {
    return 1
  }

const totalLikes =(blogs) => {
    let total=0
    for (let i = 0; i < blogs.length; i++) {
        total += blogs[i].likes;
      }
      return total;
  }

const favoriteBlog = (blogs) => {
    let favorite = blogs[0];

    blogs.forEach((blog) => {
      if (blog.likes > favorite.likes) {
        favorite = blog;
      }
    });

    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes,
    };
  };

const mostBlogs = (blogs) => {

  const authorBlogCounts = _.countBy(blogs, 'author');  /*  ==> lodash kutuphanesinden countBy fonksiyonunu kullanarak,blogs
                                                                  dizisindeki her elemanını gruplandırarak author özelliğine
                                                                  göre blog sayisini sayar ve bir nesne döndurur. Döndurulen
                                                                  deger authorBlogCounts adlı bir nesnedesaklanir.
                                                          */
  const authorOfMaxBlogs = _.maxBy(Object.keys(authorBlogCounts),
                            (author) => authorBlogCounts[author]); /*  ==> maxBy fonksiyonu, bir koleksiyondaki en büyük değere sahip
                                                                           elemanı döner. Bu durumda, authorBlogCounts nesnesinin anahtarlarını
                                                                           (Object.keys(authorBlogCounts)) kullanarak her yazarınblog sayısını
                                                                           karşılaştırır ve en çok blog yazan yazarı bulur.*/

    return {                                    /*  ==> return ile encok bloga ait yazari ve blogs miktarini döndururuz. */
      author: authorOfMaxBlogs,
      blogs: authorBlogCounts[authorOfMaxBlogs],
    };
  };

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  }

