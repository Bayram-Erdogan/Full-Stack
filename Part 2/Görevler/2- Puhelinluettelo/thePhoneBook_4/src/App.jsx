/*
      2.9: The Phonebook Adım 4

  	Kişi listesini ada göre filtrelemek için kullanılabilecek bir arama alanı uygulayın:

    Arama alanını HTML formunun dışına yerleştirilen bir giriş öğesi olarak uygulayabilirsiniz . Resimde gösterilen filtreleme Mantığı
    büyük/ küçük harfe duyarlı değildir ; bu, Arto arama teriminin aynı zamanda Arto'yu büyük A harfiyle içeren sonuçları da döndürdüğü
    anlamına gelir.

    Not: Yeni işlevsellik üzerinde çalışırken, bazı sahte verileri uygulamanıza "kodlamak" genellikle yararlı olur;

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  // ...
}

    Bu, yeni işlevselliğinizi test etmek için uygulamanıza manuel olarak veri girmenizi gerektirmez.

*/
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }else{
      const addNewPerson = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(addNewPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <p>
      filter shown with <input value={filter} onChange={handleFilterChange} />
    </p>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  )
}

export default App