/*
 2.17*: puhelinluettelo step12

  Avaa sovelluksesi kahteen selaimeen. Jos poistat jonkun henkilön selaimella 1 hieman ennen kuin yrität muuttaa
  henkilön numeroa selaimella 2, tapahtuu virhetilanne:

  Korjaa ongelma osan 2 esimerkin promise ja virheet hengessä ja siten, että käyttäjälle ilmoitetaan operaation
  epäonnistumisesta. Onnistuneen ja epäonnistuneen operaation ilmoitusten tulee erota toisistaan:

  HUOM: Vaikka käsittelet poikkeuksen koodissa, virheilmoitus tulostuu silti konsoliin.

  Muokkasin viestiä näytettäväksi setErrorMessage-viestillä catchissä niin, että päivitys- ja poistoprosessi
  näyttää viestin näytöllä heti, kun se havaitsee virheitä. ===  Update ve delete islemine hatalari yakaladigi
  anda eranda mesaj göstermesi icin catch icerisinde setErrorMessage ile göruntulenecek mesaji duzenledim.
*/

import { useState, useEffect } from "react";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");


  const [errorMessage, setErrorMessage] = useState(null)

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
        const updatedPerson = {
          ...isNameOnList,
          number: newNumber,
        };

        personService
          .update(isNameOnList.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== isNameOnList.id ? person : returnedPerson
              )
            )

            setErrorMessage(
              `Updated ${returnedPerson.name}`
            )

            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)

            setNewName("");
            setNewNumber("");
          })

          /*
            Jos update-prosessin aikana vastaanotetaan virhe, catch-koodi suoritetaan ja määrittämäni irheviesti
            ilmestyy näytölle. === update isleminde bir hata alinirsa catch icindeki kod calisacak ve ekranda
            belirledigim hata mesaji görunecek.
          */
          .catch((error) => {
            setErrorMessage(
              `Information of ${isNameOnList.name} has already been removed from server`
            );

            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    } else {
      const addNewPerson = {
        name: newName,
        number: newNumber,
      };

      personService.create(addNewPerson).then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);

        setErrorMessage(
          `Added ${returnedPerson.name}`
        )

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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

        setErrorMessage(
          `Deleted ${deleteThePerson.name}`
        )

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      /*
        Jos virheilmoitus vastaanotetaan delete-prosessin aikana, catch-koodi suoritetaan ja määrittämäni
        virhesanoma ilmestyy näytölle. === delete isleminde bir hata alinirsa catch icindeki kod calisacak
        ve ekranda belirledigim hata mesaji görunecek.
      */
      .catch((error) => {
        setErrorMessage(
          `Information of ${deleteThePerson.name} has already been removed from server`
        );

        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
    }
  };

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="error">
        {message}
      </div>
    )
  }

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
      <Notification message={errorMessage} />

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
