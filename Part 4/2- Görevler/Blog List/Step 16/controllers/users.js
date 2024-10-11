const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  /* Kullanıcı adı ve şifre kontrolü */
  if(!username || !password) {
    return response.status(400).json({error:"username and password are requered"})
  }

  /* Kullanıcı adı ve şifre uzunluk kontrolü */
  if (username.length < 3 || password.length <3) {
    return response.status(400).json({ error: "username and password must be at least 3 characters long" });
  }
/*  Benzersizlik kontrolü */
  const isUniqe = await User.findOne({ username });
  if (isUniqe) {
    return response.status(400).json({ error: "expected `username` to be unique" });
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async(request, response) => {
    const users= await User.find({})
    response.json(users)
})

module.exports = usersRouter