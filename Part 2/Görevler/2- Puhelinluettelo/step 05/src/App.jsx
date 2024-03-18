/*
  2.10: puhelinluettelo step5

  Jos koko sovelluksesi on tehty yhteen komponenttiin, refaktoroi sitä eriyttämällä sopivia komponentteja.
  Pidä kuitenkin edelleen kaikki tila- sekä tapahtumankäsittelijäfunktiot juurikomponentissa App.

  Riittää että erotat sovelluksesta kolme komponenttia. Hyviä kandidaatteja ovat filtteröintilomake, uuden
  henkilön lisäävä lomake, kaikki henkilöt renderöivä komponentti sekä yksittäisen henkilön renderöivä
  komponentti.

  Sovelluksen juurikomponentin ei tarvitse refaktoroinnin jälkeen renderöidä suoraan muuta kuin otsikoita.
  Komponentti voi näyttää suunnilleen seuraavalta:

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
*/
import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

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

      setPersons(persons.concat(addNewPerson));
      setNewName("");
      setNewNumber("");
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

      {/* Soitin filter-operaatioon täältä. */}
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>

      {/* Soitin henkilö-lisäämisprosessiin täältä. */}
      <PersonForm
        AddPerson={AddPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      {/* Soitin henkilö-lisäämisprosessiin täältä. */}
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

// Loin komponentin nimeltä Suodatin ja siirsin filter-prosessin tähän komponenttiin.
const Filter = ({ filter, handleFilterChange }) => {
  return (
    <p>
      filter shown with <input value={filter} onChange={handleFilterChange} />
    </p>
  );
};

//Loin komponentin nimeltä PersonForm ja siirsin henkilön lisäämisprosessin tähän komponenttiin.
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

// Tein komponentti, joka näyttää lisätyt ja suodatetut yhteystiedot.
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
