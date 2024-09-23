/*
  2.8: The Phonebook Adım 3

  Kullanıcıların telefon rehberine telefon numaraları eklemesine izin vererek uygulamanızı genişletin. Forma ikinci bir giriş öğesi eklemeniz gerekecek (kendi olay işleyicisiyle birlikte):

<form>
  <div>name: <input /></div>
  <div>number: <input /></div>
  <div><button type="submit">add</button></div>
</form>

*/
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number:'040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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


  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map((person) =>(
          <div key ={person.name}> {person.name} {person.number}</div>
        ))}
    </div>
  )
}

export default App