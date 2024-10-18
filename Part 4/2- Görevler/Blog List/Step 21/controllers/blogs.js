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

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'invalid token' });
    }

    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: 'blog not found' });
    }

    if (blog.user.toString() !== decodedToken.id.toString()) {
      return response.status(403).json({ error: 'forbidden: only the creator can delete this blog' });
    }

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();

  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put('/:id', async (request, response, next) => { // part 5 task 9 icin
  const body = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' });
  }

  const updatedBlog = {
    likes: body.likes,
  };

  try {
    const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
      .populate('user', { username: 1, name: 1 });
      response.json(blog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter
