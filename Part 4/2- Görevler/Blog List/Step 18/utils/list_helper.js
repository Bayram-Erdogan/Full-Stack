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

  const authorBlogCounts = _.countBy(blogs, 'author');
  const authorOfMaxBlogs = _.maxBy(Object.keys(authorBlogCounts),
                            (author) => authorBlogCounts[author]);

    return {
      author: authorOfMaxBlogs,
      blogs: authorBlogCounts[authorOfMaxBlogs],
    };
  };

const mostLikes = (blogs) => {
    const likesOfAuthors = _(blogs)
      .groupBy('author')
      .map((blogs, author) => ({
        author,
        likes: _.sumBy(blogs, 'likes')
      }))
      .value();

    return _.maxBy(likesOfAuthors, 'likes');
  };

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }

