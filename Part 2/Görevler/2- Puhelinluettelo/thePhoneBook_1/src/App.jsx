/*
2.6: The Phonebook Adım 1

  Basit bir telefon rehberi oluşturalım. Bu bölümde sadece telefon rehberine isim ekleyeceğiz.

  Telefon rehberine kişi ekleme işlemini gerçekleştirerek başlayalım.

  Uygulamanızın Uygulama bileşeni için başlangıç noktası olarak aşağıdaki kodu kullanabilirsiniz :

import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App

  newName durumu , form giriş öğesini kontrol etmek içindir.

  Bazen hata ayıklama amacıyla durumu ve diğer değişkenleri metin olarak oluşturmak yararlı olabilir. İşlenen bileşene geçici
  olarak aşağıdaki öğeyi ekleyebilirsiniz:

<div>debug: {newName}</div>

  Birinci bölümün React uygulamalarında hata ayıklama bölümünde öğrendiklerimizi iyi bir şekilde kullanmak da önemlidir . React
  Developer araçları uzantısı, uygulamanın durumunda meydana gelen değişiklikleri izlemek için inanılmaz derecede kullanışlıdır.

  Yukarıdaki resimde React Developer araçları uzantısının kullanımına dikkat edin!

  Not:

  kişinin adını anahtar özelliğinin değeri olarak kullanabilirsiniz
  HTML formlarını gönderme varsayılan eylemini engellemeyi unutmayın!
*/
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const addNewPerson = {
      name: newName,
    }

    setPersons(persons.concat(addNewPerson))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map((person) =>(
          <div key ={person.name}> {person.name}</div>
        ))}
    </div>
  )
}

export default App