/*
 2.16: puhelinluettelo step11

  Toteuta osan 2 esimerkin parempi virheilmoitus tyyliin ruudulla muutaman sekunnin näkyvä ilmoitus, joka kertoo
  onnistuneista operaatioista (henkilön lisäys ja poisto sekä numeron muutos):



  1- Ensin loin taulukon, joka tallentaa muuttujan, joka näyttää virheilmoituksen, ja toiminnon, joka tekee
     muutoksia virheilmoitukseen.  === ilk olarak error mesajini göstrecek degiskeni ve error mesajinda degisiklik
     yapacak olan fonksiyonu saklayan bir dizi olusturdum.

  2- Jos toisessa vaiheessa syötettävä nimi on listassa ja tähän nimeen kuuluvaan numeroon on tehtävä muutos,
     näytin ruudulla viestin, joka ilmoitti, että muutos on tehty ja joka pysyy näytöllä 5 sekuntia. === ikinci
     adimda girilecek olan isim listede var ise ve bu isime ait olan numarada degisiklik yapilacak ise ekranda
     degisikligin yapildigini belirten ve 5 saniye sure ile ekranda kalacak olan mesaji gösterdim.

     Jos lisättävä henkilö ei ole listalla, näytin sen listalle lisäämisen jälkeen ruudulla viestin, että henkilö
     on lisätty listalle. === Eger eklenecek olan kisi lsitede yoksa listeye ekleme gerceklestikten sonra kisinin
     listeye eklendigine dair mesaji ekranda gösterdim.

  3- Kolmannessa vaiheessa, kun listalla oleva henkilö poistettiin listalta, näytin näytöllä viestin, että henkilö
     on poistettu listalta. === Ucuncu adimda listedeki kisi listeden silindiginde ekranda kisinin listeden
     silindigini belirten bir mesaj gösterdim.

  4- Neljännessä vaiheessa loin komponentin, joka näyttää viestin näytöllä. === Dorduncu adimda mesaji ekranda
     gösterebilmek icin bir bilesen olusturdum.

  5- Viidennessä vaiheessa kutsuin luomaani komponenttia. === Besinci adimda ise olusturdugum bileseni cagirdim.
*/

import { useState, useEffect } from "react";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  /*
    Tein taulukon . Määritin muuttujan, joka näyttää virheilmoituksen taulukon ensimmäiselle elementille. 2
    elementtinä annoin reakt-toiminnon, joka voi myöhemmin muuttaa tätä viestiä. Asetin muuttujan alkuarvon nolla
    komennolla useState(null).  === Bir dizi olusturdum. dizinin ilk elemanina Error mesajini gösterecegim icin
    bir degisken tanimladim. 2 eleman olarak ise daha sonra bu mesaji degistirebilecek olan bir reakt'a ait bir
    fonksiyon atadim. useState(null) ile degiskenin baslangic degerini nul olarak belirledim.
  */
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
            );

            /*
              Muutin error-ilmoituksen lähettämällä arvon setErrorMessage-funktiolle. setErrorMessage fonksiyonuna
              bir deger göndererek error mesajinda degisiklik yaptim.
            */
            setErrorMessage(
              `Updated ${returnedPerson.name}`
            )
            /*
              Muokkasin setTimeOut-funktiolla errorMessage-muuttujan null 5 sekunnin kuluttua. === setTimeOut
              fonksiyonunu kullanarak errorMessage degiskenini 5 saniye sonra null olacak sekilde duzenledim.
            */
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
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
        /*
          Muutin error-ilmoituksen lähettämällä arvon setErrorMessage-funktiolle. setErrorMessage fonksiyonuna
          bir deger göndererek error mesajinda degisiklik yaptim.
        */
        setErrorMessage(
          `Added ${returnedPerson.name}`
        )

        /*
          Muokkasin setTimeOut-funktiolla errorMessage-muuttujan null 5 sekunnin kuluttua. === setTimeOut
          fonksiyonunu kullanarak errorMessage degiskenini 5 saniye sonra null olacak sekilde duzenledim.
        */
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
        /*
          Muutin error-ilmoituksen lähettämällä arvon setErrorMessage-funktiolle. setErrorMessage fonksiyonuna
          bir deger göndererek error mesajinda degisiklik yaptim.
        */
        setErrorMessage(
          `Deleted ${deleteThePerson.name}`
        )
        /*
          Muokkasin setTimeOut-funktiolla errorMessage-muuttujan null 5 sekunnin kuluttua. === setTimeOut
          fonksiyonunu kullanarak errorMessage degiskenini 5 saniye sonra null olacak sekilde duzenledim.
        */
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
