/*
  2.11: puhelinluettelo step6

  Jatketaan puhelinluettelon kehittämistä. Talleta sovelluksen alkutila projektin juureen sijoitettavaan
  tiedostoon db.json:

{
  "persons":[
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
  ]
}copy

  Käynnistä JSON Server porttiin 3001 ja varmista selaimella osoitteesta http://localhost:3001/persons, että
  palvelin palauttaa henkilölistan.

  Jos saat virheilmoituksen

  events.js:182
        throw er; // Unhandled 'error' event
        ^

  Error: listen EADDRINUSE 0.0.0.0:3001
      at Object._errnoException (util.js:1019:11)
      at _exceptionWithHostPort (util.js:1041:20)copy
  on portti 3001 jo jonkin muun sovelluksen, esim. jo käynnissä olevan JSON Serverin käytössä. Sulje toinen
  sovellus tai jos se ei onnistu, vaihda porttia.

  Muuta sovellusta siten, että alkutila haetaan Axios-kirjaston avulla palvelimelta. Hoida datan hakeminen
  Effect hookilla.
*/

import { useState, useEffect } from 'react'
import axios from 'axios'

/* 
  1- Ensin lisäsin annetut tiedot db.json-tiedostoon. 
  2- Toisessa vaiheessa latasin axios-kirjaston.
  3- Kolmannessa vaiheessa asensin npm install json-server --save-dev.
  4- Neljännessä vaiheessa lisäsin "server": "json-server -p3001 --watch db.json" paketti.json-tiedoston
     komentosarjaluetteloon.
  5- Viidennessä vaiheessa avasin uuden terminaalin json-tiedoston avaamiseksi ja suoritin
     npx json-server --port=3001 --watch db.json-koodin.
  6- Kuudennessa vaiheessa latasin axiot main.jsx-tiedostoon ja määritin 
     axios.get('http://localhost:3001/persons') lupausmuuttujaan.
  7- Seitsemännellä vaiheessa Koska aion käyttää efeckt-hookit, main.jsx:ssä on vain

     import ReactDOM from "react-dom/client";
     import App from "./App";

     ReactDOM.createRoot(document.getElementById("root")).render(<App />);
  8- Koska käytän efeckt-hookitiä kahdeksannessa vaiheessa, tuon seuraavat rivit App.jsx-tiedostoon.
     
     import { useState, useEffect } from 'react'
     import axios from 'axios

     sitten

     useEffect(() => {
        axios
          .get('http://localhost:3001/persons') ===> Saan luettelon ihmisistä osoitteesta 
                                                     http://localhost:3001/persons.
          .then(response => {
            setPersons(response.data) ===> Muokkaan setPersons-sovelluksella tuomieni ihmisten nimiä
                                           ja lisään heidät persons-luetteloon. Ja niin nimet tulevat
                                           näkyviin näytöllä.
          })
     }, [])
     
*/
const App = () => {
  const [persons, setPersons] = useState([]); /* ===> Tyhjensin luettulun. Näytölle tulevat nimet ovat
                                                      peräisin tiedostosta db.json. */
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {  // ==> UseEffectiä käytettiin tietojen hakemiseen palvelimelta.
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
