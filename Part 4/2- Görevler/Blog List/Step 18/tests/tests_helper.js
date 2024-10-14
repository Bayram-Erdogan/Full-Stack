const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Ve daglar yankilandi",
    author: "Khalled Hosseini",
    url: "http://example.com/first",
    likes: 103,
  },
  {
    title: "Limon agaci",
    author: "Sandy Tolan",
    url: "http://example.com/second",
    likes: 144,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
};
