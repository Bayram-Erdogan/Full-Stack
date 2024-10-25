const User = require('../models/user')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken');


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, url, author, likes } = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' });
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(404).json({ error: 'User not found' });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
})

blogsRouter.delete("/:id", async (request,response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', (request, response, next) => {
const body = request.body;

const blog = {
title: body.title,
author: body.author,
url: body.url,
likes: body.likes,
};

Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
.then(updatedBlog => {
response.json(updatedBlog);
})
.catch(error => next(error));
});

module.exports = blogsRouter
