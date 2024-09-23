/*
    2.10: The Phonebook Adım 5

  Uygulamanızı tek bir bileşende uyguladıysanız, uygun parçaları yeni bileşenlere çıkararak yeniden düzenleyin. Uygulamanın durumunu ve
  tüm olay işleyicilerini Uygulama kök bileşeninde koruyun.

  Uygulamadan üç bileşeni çıkarmak yeterlidir . Ayrı bileşenler için iyi adaylar, örneğin, arama filtresi, telefon rehberine yeni kişiler
  ekleme formu, telefon rehberindeki tüm kişileri gösteren bir bileşen ve tek bir kişinin ayrıntılarını gösteren bir bileşendir.

  Uygulamanın kök bileşeni yeniden düzenlemeden sonra buna benzer görünebilir. Aşağıdaki yeniden düzenlenmiş kök bileşeni yalnızca başlıkları
  işler ve çıkarılan bileşenlerin gerisini halletmesine izin verir.

const App = () => {
  // ...

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter ... />

      <h3>Add a new</h3>

      <PersonForm
        ...
      />

      <h3>Numbers</h3>

      <Persons ... />
    </div>
  )
}

  Not : Bileşenlerinizi "yanlış yerde" tanımlarsanız bu alıştırmada sorunlarla karşılaşabilirsiniz. Şimdi bölümü tekrarlamak için iyi bir zaman
  olabilir. Son bölümdeki bir bileşende bir bileşeni başka bir bileşende tanımlamayın .

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
      <h1>Phonebook</h1>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons filteredPersons={filteredPersons} />
    </div>
  )}

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <p>
      filter shown with <input value={filter} onChange={handleFilterChange} />
    </p>
  );
};

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ filteredPersons }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};
export default App