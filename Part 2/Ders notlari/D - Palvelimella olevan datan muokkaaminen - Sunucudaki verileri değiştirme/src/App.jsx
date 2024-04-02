/*
                                                      Sunucudaki verileri değiştirme

**************************************************************   REST   **************************************************************

  Bir notu depolamak için yeni bir kaynak oluşturmak, json sunucusunun uyduğu REST kuralına göre notların URL'sine bir HTTP POST
  isteği yapılarak yapılır. Yeni not kaynağına ilişkin veriler, isteğin gövdesinde gönderilir .


******************************************************* Sunucuya Veri Gönderme *******************************************************

  Yeni bir not oluşturmaktan sorumlu olay işleyicisinde aşağıdaki değişiklikleri yapalım:

  axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      console.log(response)
    })
  

**************************************************** Notların Önemini Değiştirme *****************************************************

    Her nota, önemini değiştirmek için kullanılabilecek bir düğme ekleyelim.

    Note bileşeninde aşağıdaki değişiklikleri yapıyoruz :

    const Note = ({ note, toggleImportance }) => {
      const label = note.important
        ? 'make not important' : 'make important'

      return (
        <li>
          {note.content} 
          <button onClick={toggleImportance}>{label}</button>
        </li>
      )
    }

    Daha sonra App bileseninde

    const toggleImportanceOf = id => {
      const url = `http://localhost:3001/notes/${id}`
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }

      axios.put(url, changedNote).then(response => {
        setNotes(notes.map(n => n.id !== id ? n : response.data))
    })


    toggleImportance={() => toggleImportanceOf(note.id)}   kodlarini ekliyoruz
}

import { useState, useEffect } from 'react'
import axios from 'axios' 
import Note from './components/Note'


const App = () => { 
  const [notes, setNotes] = useState([]) 
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

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

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {  
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
    axios // ==> Axios blogu sunucuya veri göndermek icin eklendi.
    .post('http://localhost:3001/notes', noteObject) // ==> post islemi verilen adrese noteObject icindeki veriyi gönderir. 
    .then(response => {
      setNotes(notes.concat(response.data))
      setNewNote('')
      
    })

    // setNotes(notes.concat(noteObject)) 
    // setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)  
  }

  const notesToShow = showAll 
    ? notes
    : notes.filter(note => note.important)
    
  const toggleImportanceOf = id => { // Bu kod blogu notlarin önemini degistirmek icin eklendi.
    const url = `http://localhost:3001/notes/${id}` // Bu satir kimliğine göre her not kaynağının benzersiz URL'sini tanımlar.
    const note = notes.find(n => n.id === id) // Değiştirmek istediğimiz notayı bulmak için dizi find yöntemini kullanırız ve 
                                              // ardından  bunu note değişkenine atarız.
    const changedNote = { ...note, important: !note.important } ==> değerin çevrildiği (doğrudan yanlışa veya yanlıştan doğruya)
                                                                   önemli özelliğin dışında, eski notun tam bir kopyası olan yeni
                                                                   bir nesne olustururuz. Uygulamada, { ...note }, not nesnesindeki
                                                                   tüm özelliklerin kopyalarını içeren yeni bir nesne oluşturur.
                                                                   Yayılma nesnesinden sonra küme parantezlerinin içine özellikler
                                                                   eklediğimizde, örneğin { ...note, önemli: true } , yeni nesnenin
                                                                   önemli özelliğinin değeri true olacaktır . Örneğimizde önemli
                                                                   özellik,(!) orijinal nesnedeki önceki değerinin olumsuzluğunu alır.
                                                                
    
    axios.put(url, changedNote).then(response => { // Yeni not daha sonra bir PUT isteğiyle birlikte eski nesnenin yerini alacağı
                                                   // arka uca gönderilir.

      setNotes(notes.map(n => n.id !== id ? n : response.data)) ==> Map yöntemi, eski dizideki her öğeyi yeni dizideki bir öğeye
                                                                   eşleyerek yeni bir dizi oluşturur. Örneğimizde, yeni dizi
                                                                   koşullu olarak yaratılmıştır, böylece not.id !== id doğruysa;
                                                                   öğeyi eski diziden yeni diziye kopyalıyoruz. Koşul yanlışsa,
                                                                   bunun yerine sunucunun döndürdüğü not nesnesi diziye eklenir.
                                                                
    })
  }

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
      
      
        Alt satirda Note cagira islemina toggleImportance={() => toggleImportanceOf(note.id)}  notlarin önemini degistirmek
        icin eklendi.
      
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/> 
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
*/

/*
********************************************* Arka Uçla İletişimi Ayrı Bir Modüle Çıkarma ********************************************

   src dosyasi altinda services klosöru olusturup ve icine Notes.js adında bir dosya ekleyelim ve icerisine asagidaki kodlari
   ekledim

    import axios from 'axios'
    const baseUrl = 'http://localhost:3001/notes'

    const getAll = () => {
      return axios.get(baseUrl)
    }

    const create = newObject => {
      return axios.post(baseUrl, newObject)
    }

    const update = (id, newObject) => {
      return axios.put(`${baseUrl}/${id}`, newObject)
    }

    export default { 
      getAll: getAll, 
      create: create, 
      update: update 
    }
*/
import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }
  
    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const toggleImportanceOf = id => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
        .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(
          `the note '${note.content}' was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const handleNoteChange = (event) => {
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
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
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