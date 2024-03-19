/*
                                                        Sunucudaki verileri alma

**************************************************** Yürütme ortamı olarak tarayıcı ****************************************************

  1-  ilk olarak Projenin kök dizininde db.json dosyasını oluşturdum ve bu dosyanin icine  asagidaki kodu yapistirdim. Bu kod main.jsx
      dosyasinda yer alan array'in icindeki kod blogudur.

{
    "notes": [
        {
        "id": 1,
        "content": "HTML is easy",
        "important": true
        },
        {
        "id": 2,
        "content": "Browser can execute only JavaScript",
        "important": false
        },
        {
        "id": 3,
        "content": "GET and POST are the most important methods of HTTP protocol",
        "important": true
        }
    ]
}

  2- Axios kütüphanesini tarayıcı ile sunucu arasındaki iletişim için kullanacağım. Bu yuzden package.json icinde yer alan dependencies
     listesine axios'u eklemek icin terminal de npm install axios satiri ile axios'i yukledim.

  3- json-server'ı geliştirme bağımlılığı olarak yuklemek icin terminal de npm install json-server --save-dev satirini calistirdim.

  4- parametre tanımları olmadan json sunucusunu proje kök dizininden şu komutla rahatlıkla baslatabilmek icin package.json dosyasının
     scriptler kısmına asagidaki satiri ekledim :

     "server": "json-server -p3001 --watch db.json"  

     böylece terminalde npm run server ile server'imi rahatlikla calistirabilcegim.

  5- Efekt kancalarini kullanacagim icin main.jsx icini asagidaki gibi sadelestirdim.

     import ReactDOM from "react-dom/client";
     import App from "./App";

     ReactDOM.createRoot(document.getElementById("root")).render(<App />);

  6- App bilesenine 

     import { useState, useEffect } from 'react'
     import axios from 'axios'

     const App = () => {
     const [notes, setNotes] = useState([])

     useEffect(() => {
      console.log('effect')
      axios
        .get('http://localhost:3001/notes')
        .then(response => {
          console.log('promise fulfilled')
          setNotes(response.data)
        })
     }, [])
      console.log('render', notes.length, 'notes')
   
*/

import { useState, useEffect } from 'react'// bu satir degisti, önceki hali ==> import { useState } from 'react'
import axios from 'axios' // Bu satir eklendi.
import Note from './components/Note'


const App = () => { // Bu satir degisti, önceki hali ==> const App = (props) => {
  const [notes, setNotes] = useState([]) //  Bu satir degisti, önceki hali ==> const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => { // Bu kod blogu eklendi.
    console.log('effect')
    axios 
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {  
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
    setNotes(notes.concat(noteObject)) 
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)  
  }

  const notesToShow = showAll 
    ? notes
    : notes.filter(note => note.important) 

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}> 
        
          show {showAll ? 'important' : 'all' }
        </button>
      </div>

      <ul>
      {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
      
      <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App