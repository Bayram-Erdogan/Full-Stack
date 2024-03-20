/*
  2.12: The Phonebook step 7

  Let's return to our phonebook application.

  Currently, the numbers that are added to the phonebook are not saved to a backend server. Fix this situation.
*/

import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const AddPerson = (event) => {
    event.preventDefault();

    const isNameOnList = persons.find((person) => person.name === newName);

    if (isNameOnList) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const addNewPerson = {
        name: newName,
        number: newNumber,
      };
      /*
        Lähetämme tiedot db.jsoniin oxsios avulla. Siten lisäämme tietoja palvelimellemme === axios ile db.json'a veri post ediyoruz.
        Böylece sunucumuza veri eklemis oluyoruz.
      */
      axios
      .post('http://localhost:3001/persons', addNewPerson)
      .then(response => {
        /*
          Post-prosessin jälkeen se varmistaa, että then-lohkon tiedot näkyvät sivulla ilman sivun päivittämistä. === post islemi
          sonrasinda then block'unun icindeki  verilerin sayfada, sayfanin yenilenmeden gösterilmesini saglar.
        */
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");

      })

    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm
        AddPerson={AddPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <p>
      filter shown with <input value={filter} onChange={handleFilterChange} />
    </p>
  );
};

const PersonForm = ({
  AddPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={AddPerson}>
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

export default App;
