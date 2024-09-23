/*
    2.14: The Phonebook Adım 9

    Kullanıcıların telefon rehberinden girişleri silmesini mümkün kılın. Silme, telefon rehberi listesindeki her kişi için özel bir
    düğme aracılığıyla yapılabilir. Kullanıcının eylemi window.confirm yöntemini kullanarak onaylayabilirsiniz:

    Arka uçtaki bir kişiyle ilişkili kaynak, kaynağın URL'sine bir HTTP DELETE isteği yapılarak silinebilir. Örneğin 2 kimliğine sahip
    bir kişiyi siliyorsak, localhost:3001/persons/2 URL'sine bir HTTP DELETE isteği yapmamız gerekir . İstekle birlikte hiçbir veri
    gönderilmez.

    HTTP DELETE isteğini , diğer tüm istekleri yaptığımız gibi axios kütüphanesiyle de yapabilirsiniz.

    Not: JavaScript'te ayrılmış bir kelime olduğu için bir değişken için delete ismini kullanamazsınız. Örneğin aşağıdakiler mümkün
    değildir:

    // use some other name for variable!
    const delete = (id) => {
      // ...
    }
*/
import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }else{
      const addNewPerson = {
        name: newName,
        number: newNumber
      }

      personService
        .create(addNewPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
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

  const deletePerson = (id) => {
    const deleteThePerson = persons.find((person) => person.id === id);
    const message = `Delete ${deleteThePerson.name}?`;
    const isConfirmed = window.confirm(message);

    if (isConfirmed) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

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

      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
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

const Persons = ({ filteredPersons, deletePerson }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};
export default App