/*
********************************************* Deploying app to internet - Uygulamayi internete dagitma *********************************************

********************* 1- Same origin policy and CORS - Aynı menşe politikası ve CORS *********************
  1-  ilk olarak terminalde npm install cors yazarak cors'u uygulamama yukledim.
  2-  Daha sonra

          const cors = require('cors')    =>  cors degiskeni olusturarak  projemin bağımlılıklarına "cors" paketinin eklenmesini sağladim.
          app.use(cors())                 =>  Tarayıcıların güvenlik politikalarını geçmek için gerekli olan CORS başlıklarının otomatik olarak eklenmesini
                                              sağladim. Bu sayede, farklı kökenlerden gelen isteklere sunucunun yanıt vermesi engellenmez.

********************* 2- Application to the Internet - Internete basvuru *********************

  const PORT = process.env.PORT || 3001  ==>  Bu satir degistirilidi önceki hali const PORT = 3001 idi. Su andan itibaren ortam değişkeninde tanımlanan
                                              bağlantı noktasını veya PORT ortam değişkeni tanımlanmamışsa bağlantı noktası olarak 3001'i kullanıyoruz.
                                              Fly.io ve Render, uygulama bağlantı noktasını bu ortam değişkenine göre yapılandırır.
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
*/
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json())

let notes = [
      {
        id: 1,
        content: "HTML is easy",
        important: true
      },
      {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
      },
      {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
      }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {

  const id = Number(request.params.id)

  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
     response.status(404).end()
  }

})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()

})

const generateId = () => {

  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0

  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body
  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)})