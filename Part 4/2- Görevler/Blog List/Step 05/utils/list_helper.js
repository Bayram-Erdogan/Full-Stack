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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }

