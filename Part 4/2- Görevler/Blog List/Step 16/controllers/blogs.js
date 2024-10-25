const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', (request, response) => {
   const blog = new Blog(request.body)

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'Title and URL are required.' });
  }

   blog
     .save()
     .then(result => {
       response.status(201).json(result)
     })
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
