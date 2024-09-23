/*
  2.7: The Phonebook Adım 2


  Kullanıcının telefon rehberinde zaten mevcut olan adları eklemesini engelleyin. JavaScript dizileri bu görevi gerçekleştirmek
  için çok sayıda uygun yönteme sahiptir. Javascript'te nesne eşitliğinin nasıl çalıştığını unutmayın .

  Böyle bir eylem denendiğinde alarm komutuyla bir uyarı verin :

  İpucu: Değişkenlerden gelen değerleri içeren dizeler oluştururken bir şablon dizesi kullanmanız önerilir :

`${newName} is already added to phonebook`

  newName değişkeni Arto Hellas değerini taşıyorsa , şablon dizesi ifadesi dizeyi döndürür

`Arto Hellas is already added to phonebook`

  Aynı şey, plus operatörünü kullanarak daha Java benzeri bir şekilde yapılabilir:

newName + ' is already added to phonebook'

  Şablon dizelerini kullanmak daha deyimsel bir seçenektir ve gerçek bir JavaScript profesyonelinin işaretidir.
*/
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }else{
      const addNewPerson = {
        name: newName,
      }

      setPersons(persons.concat(addNewPerson))
      setNewName('')
    }
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