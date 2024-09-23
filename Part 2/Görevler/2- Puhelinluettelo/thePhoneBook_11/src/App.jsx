/*
    2.16: The Phonebook Adım 11


    Başarılı bir işlem gerçekleştirildikten sonra (bir kişi eklendiğinde veya bir numara değiştirildiğinde) birkaç saniye süren bir
    bildirim göstermek için, 2. bölümdeki iyileştirilmiş hata mesajı örneğini kılavuz olarak kullanın :
*/
import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

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

      if(confirm(`${newName} is already added to phonebook, replace  the old number with a new one?`)){

        const updatePerson ={
        name : newName,
        number: newNumber
        }

        personService
          .update(persons.find(person => person.name === newName).id, updatePerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== persons.find(person => person.name === newName).id ? person : returnedPerson
              )
            );

            setErrorMessage(
              `Updated ${returnedPerson.name}`
            )

            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setNewName("");
            setNewNumber("");
          }
        )
      }
    }else{
      const addNewPerson = {
        name: newName,
        number: newNumber
      }

      personService
        .create(addNewPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))

          setErrorMessage(
            `Added ${returnedPerson.name}`
          )

          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

          setNewName('')
          setNewNumber('')
        }
      )
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

          setErrorMessage(
            `Deleted ${deleteThePerson.name}`
          )

          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

        });
    }
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
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

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

export default App