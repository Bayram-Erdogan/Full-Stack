/*
 2.13: puhelinluettelo step8

  Siirrä palvelimen kanssa kommunikoinnista vastaava toiminnallisuus omaan moduuliin tämän osan materiaalissa
  olevan esimerkin tapaan.



  1- Ensin loin tiedoston, johon siirsin moduulimme. Tämä tiedosto on polussa src/services/persons.js. === ilk
     olarak modulumuzu tasiyacagim bir dosya olusturdum. Bu dosya src/services/persons.js yolunda.

  2- Sitten persons.js-tiedostossa käytin getAll-funktiota nimien hakemiseen ja Create-funktiota uuden henkilön
     lisäämiseen.  === Daha sonra persons.js dosyasinda isimleri almak icin getAll ve yeni kisi eklemek icin
     create fonskiyonlarini yaptim.

  3- Kutsuin personServicen getAll-funktiota useEffect-koukun avulla. Siten luetteloon lisätty uusi henkilö
     ilmestyy näytölle. === useEffect kancasını kullanarak personService uzerinden getAll fonksiyonunu cagirdim.
     Böylece listeye eklenen yeni kisi ekranda görunmus olacak.

  4- Lopuksi kutsuin luomistoimintoa personServicen kautta lisätäkseni uuden henkilön luetteloon. Päivitin sitten
     luetteloni niin, että syötetyt arvot näkyivät näytöllä, ja tyhjensin sitten nimen ja numeromuuttujan. === Son
     olarak listeye yeni bir kisi eklemek icin personService uzerinden create fonksiyonunu cagirdim. Daha sonra
     listemi yeniledim böylece girilen degerler ekranda görunur olacak ve  daha sonra isim ve numara degiskenini
     temizledim.
*/

import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  // 3
  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

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
      // 4
      personService.create(addNewPerson)
      .then(returnedPerson => {
        setPersons([...persons, returnedPerson]);
        setNewName("");
        setNewNumber("");
      });
      
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
