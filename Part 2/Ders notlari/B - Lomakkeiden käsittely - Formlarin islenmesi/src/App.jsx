 /*
                                                        Formlarin Islenmesi

**************************************  1- Note'larin bilesene (Komponent) kaydedilmesi ***************************************



import { useState } from 'react'      ==> React kutuphanesinden useState import ediliyor.
import Note from './components/Note'  ==> Note.jsx uzerinden note'lar import ediliyor.

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)   ==> props araciligiyla note'ler notes icine aliniyor.
  

   return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>            ==> notes icindeki note'larin her birine map araciligi ile ulasilip ekranda gösterilmesi
                                          saglaniyor.
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}

export default App

************************************

import { useState } from 'react'
import Note from './components/Note'


const App = (props) => {
  const [notes, setNotes] = useState([])   ==> Boş bir not listesiyle başlamak isteseydik, başlangıç değerini boş bir dizi ([])
                                               olarak ayarlardık ve props kullanılmayacağı için props parametresini fonksiyon
                                               tanımından çıkarabilirdik.
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}

export default App 

************************************

import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)

  const addNote = (event) => {  ==> Girilecek olan verinin gönderilmesi icin gönder butonu tıklandığında çağrılacak form
                                    öğesine olay işleyicisi olarak eklendi.

    event.preventDefault()      ==> Bu satir form gönderme islemini engeller. Ayrica sayfanin yeniden yuklenmesine neden olur.

    console.log('button clicked', event.target) ==> event.target ise saklanan olayin hedefini consolea yazdirir. Burada form
                                                    tag'larini arasida kalanlara yazdirir.
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>

      <form onSubmit={addNote}>               ==> Ekranda form göstermek icin yazildi. Submit butonuna tiklandiginda
                                                  onSubmit={addNote} addNote durum isleyicisi cagrilmis olacak.

        <input />                             ==> Ekranda ki veri girmek icin olusturulan text kutusunu temsil eder.

        <button type="submit">save</button>   ==> Ekranda ki save butonunu temsil eder.

      </form>   
    </div>
  )
}

export default App


***************************************************  2 - Kontrollu Bilesen  ***************************************************


import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)

  const [newNote, setNewNote] = useState(  ==> Kullanıcı tarafından gönderilen girişi depolamak için newNote adında yeni bir
                                               durum parçası ekledik ve bunu giriş öğesinin değer özelliği olarak ayarladik.

    'a new note...'   ==> Bu satir textbox'da görunen yer tutucuyu temsil eder. useState bu text'i newNote degiskenine ekler.
  ) 

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>

        <input value={newNote} />   ==> Yukaridan gelen newNote  degiskenidir.Burada input textbox'averilen yerr tutucudur.
                                        Ancak textbox'a deger giremiyoruz. Ve bu deger form'a iletilmiyor. 
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App

************************************


import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)

  const [newNote, setNewNote] = useState( 
    'a new note...'  
  ) 

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
  }

  
  const handleNoteChange = (event) => {  ==> Giriş öğesinin düzenlenmesini etkinleştirmek için, girişte yapılan değişiklikleri
                                             bileşenin durumuyla senkronize eden bir olay işleyicisini olusturduk.
    console.log(event.target.value)
    setNewNote(event.target.value)       ==> Olay nesnesinin target özelliği artık kontrollü giriş öğesine karşılık gelir ve
                                             event.target.value bu öğenin giriş değerini ifade eder.
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
      
       
        
        
      
      
      <input
          value={newNote}
          onChange={handleNoteChange} ==> Formun imput öğesinin onChange niteliğine bir olay işleyicisi kaydettik. Imput
                                          elemanında her değişiklik meydana geldiğinde event işleyicisi çağrılır. Olay
                                          işleyici event'i, event nesnesini event parametresi olarak alır.
        />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App

************************************

import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)

  const [newNote, setNewNote] = useState( 
    'a new note...'  
  ) 

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {  ==> Öncelikle not için, içeriğini bileşenin newNote durumundan alacak, noteObject adlı yeni bir
                              nesne oluşturuyoruz .
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
  
    setNotes(notes.concat(noteObject))  ==> Yöntem, orijinal notlar dizisini değiştirmez , bunun yerine sonuna eklenen yeni
                                            öğeyle dizinin yeni bir kopyasını oluşturur . Bu önemlidir çünkü React'te durumu
                                            asla doğrudan değiştirmemeliyiz!

    setNewNote('')  ==> Olay işleyicisi ayrıca newNote durumunun setNewNote işlevini çağırarak kontrollü giriş öğesinin
                        değerini sıfırlar
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)  
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
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

********************************************  3- Görüntülenen Öğeleri Filtreleme  *********************************************
  
  Uygulamamıza yalnızca önemli notları görüntülememizi sağlayacak yeni işlevler ekleyelim.


import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)  ==> Hangi notların görüntülenmesi gerektiğini takip eder.

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

  const notesToShow = showAll ==> Bu bilesen Ternary mantigi ile calismaktadir. Yani showAll degeri true use notes, false ise
                                  notes.filter(note => note.important) calisir. Yani const[showAll,setShowAll] = useState(true)
                                  degeri false olarak degistirilirse bu kod false degerini alir ve
                                  notes.filter(note => note.important) kismi calisir Bu da notes dizisinden important degeri
                                  false olanlari filtreleyerek göster demektir.
    ? notes
    : notes.filter(note => note.important) // note.important degeri zaten true veya false olarak gelir.

  return (
    <div>
      <h1>Notes</h1>
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

************************************

    
*/

import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

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
      {/*
        Kullanıcıların uygulamanın showAll durumunu kullanıcı arayüzünden değiştirmesine olanak tanıyan işlevsellik 
        ekliyoruz..
      */}
      <div>
        {/*  
         Buton'a tiklandiginda const [showAll, setShowAll] = useState(true) degeri true'dan false döner. Böylece important
         degeri false olanlar filtrelenir.
        */}
        <button onClick={() => setShowAll(!showAll)}> 
        {/* 
          Buton uzerinde const [showAll, setShowAll] = useState(true) degeri true iken  show important gösterilir. Ancak butona
          tiklandiginda const [showAll, setShowAll] = useState(true) degeri false'a döndugu icin buton uzerinde show all 
          gösterilir.
        */}
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