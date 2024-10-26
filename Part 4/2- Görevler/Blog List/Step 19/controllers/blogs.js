const User = require('../models/user')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken'); // Bu eklendi

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 }) // find({})'in arkasina .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

// getTokenFrom fonsiyonu eklendi.
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.post("/", async (request, response) => {
  const { title, url, userId, author, likes } = request.body;

   // iki yorum satiri arasindaki decodedToken ve if blogu eklendi.
   const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
   if (!decodedToken.id) {
     return response.status(401).json({ error: 'token invalid' })
   }
   //

  if (!title || !url || !userId) {
    return response.status(400).json({ error: 'title, url, and userId are required' });
  }


    // const user = await User.findById(userId); asagidaki ile guncellendi
    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    const blog = new Blog({
      url: url,
      title: title,
      author:author,
      likes:likes,
      user: user.id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);

});

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
