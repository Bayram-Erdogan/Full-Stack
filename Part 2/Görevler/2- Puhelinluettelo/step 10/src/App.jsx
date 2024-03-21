/*
 2.15*: puhelinluettelo step10

  Muuta toiminnallisuutta siten, että jos jo olemassa olevalle henkilölle lisätään numero, korvaa lisätty numero aiemman
  numeron. Korvaaminen kannattaa tehdä HTTP PUT ‑pyynnöllä.

  Jos henkilön tiedot löytyvät jo luettelosta, voi ohjelma kysyä käyttäjältä varmistuksen:

  ***************************************************** Työjarjestus ****************************************************

  1- {Ensin tarkistin, oliko lisättävä henkilö listalla. Jos henkilö oli listalla, näytin käyttäjälle varoituksen näytöllä
     ja kysyin häneltä, tekisikö hän muutoksia listalla olevan henkilön numeroon. Jos käyttäjä hyväksyy muutoksen,
     päivitän henkilön numeron. Jos henkilö ei ole listalla, lisäsin henkilön tiedot listaan.} === { Ilk olarak eklenecek
     kisinin listede olup olmadigina baktim. Kisi eger listede ise ekranda kullaniciya bir uyari göstererek listede var
     olan kisinin numarasinda herhangi bir degisiklik yapip yapmayacagini sordum. Kullanici degisiklik yapmayi onaylarsa
     kisini numarasini guncelledim. Eger kisi liste de yok ise kisinin bilgilerini listeye ekledim.}
*/

import { useState, useEffect } from "react";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const AddPerson = (event) => {
    event.preventDefault();

    const isNameOnList = persons.find((person) => person.name === newName);

    if (isNameOnList) {
      const isConfirmed = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (isConfirmed) {
        /*
          {Loin kopion luettelossamme olevista yhteystiedoista ja määritin äskettäin lisätyn numeron numeromuuttujaan.} ===
          {Listemizde var olan kisilerin bir kopyasini olusturdum ve numara degiskenine yeni eklenen numarayi atadim.}
        */
        const updatedPerson = {
          ...isNameOnList,
          number: newNumber,
        };

        /*
          {Soitin updatePerson-toiminnolle personServicen kautta. Ja lisäsin parametreiksi päivitettävän henkilön tunnuksen
          ja päivitettävät tiedot.} === {personService uzerinden updatePerson fonksiyonunu cagirdim. Ve guncellenecek
          kisinin id dgeri ile guncellenecek bilgileri parametre olarak ekledim.}
        */

        personService
          .update(isNameOnList.id, updatedPerson)
          /*
           { Määritin palvelimen lähettämän päivitetyn henkilön returnedPerson-muuttujaan.} === {Sunucunun gönderdigi
            guncellenmis kisiyi returnedPerson degiskenine atadim.}
          */
          .then((returnedPerson) => {
            /*
              {Katsoin henkilön tiedot listalta ja jos tiedot eivät olleet ajan tasalla, lisäsin päivitetyt tiedot listaan.}
              === {Listede kisinin bilgilerine baktim eger bilgiler guncel degilse guncel bilgiyi listeye ekledim.}
            */
            setPersons(
              persons.map((person) =>
                person.id !== isNameOnList.id ? person : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
          });
      }
    } else {
      const addNewPerson = {
        name: newName,
        number: newNumber,
      };

      personService.create(addNewPerson).then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deletePerson = (id) => {
    const deleteThePerson = persons.find((person) => person.id === id);
    const message = `Delete ${deleteThePerson.name}?`;
    const isConfirmed = window.confirm(message);

    if (isConfirmed) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
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
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
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

const Persons = ({ filteredPersons, deletePerson }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}{" "}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
