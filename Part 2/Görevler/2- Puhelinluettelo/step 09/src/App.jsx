/*
  2.14: puhelinluettelo step9

  Tee ohjelmaan mahdollisuus yhteystietojen poistamiseen. Poistaminen voi tapahtua esim. nimen yhteyteen liitetyllä
  napilla. Poiston suorittaminen voidaan varmistaa käyttäjältä window.confirm-metodilla:

  Tiettyä henkilöä vastaava resurssi tuhotaan palvelimelta tekemällä HTTP DELETE ‑pyyntö resurssia vastaavaan URL:iin.
  Eli jos poistaisimme esim. käyttäjän, jonka id on 2, tulisi tapauksessamme tehdä HTTP DELETE osoitteeseen
  localhost:3001/persons/2. Pyynnön mukana ei lähetetä mitään dataa.

  Axios-kirjaston avulla HTTP DELETE ‑pyyntö tehdään samaan tapaan kuin muutkin pyynnöt.

  Huom: et voi käyttää JavaScriptissa muuttujan nimeä delete, sillä kyseessä on kielen varattu sana. Eli seuraava
  ei onnistu:

  käytä jotain muuta muuttujan nimeä

  const delete = (id) => {...}

  1- Ensin loin toiminnon nimeltä deletePerson. === ilk olarak deletePerson adinda bir fonksiyon olusturdum.

  2- Poistettavan henkilön poistamiseksi tietokannasta tein pyynnön nimeltä deletePerson tiedostoon persons.js === Veri
     tabanindan silinecek kisinin silinmesini saglamak icin persons.js de deletePerson isminde bir istek olusturdum.

  3- Lisäsin deletePersonin kutsuun Persons-komponenttiin. === Cagirilan Persons bilesinen deletePerson'i ekledim.


  ****************************************************** Työjärjestys:******************************************************

1- Käyttäjä napsauttaa deletepainiketta. Delete-painike ottaa poistettavan henkilön ID-arvon ja kutsuu deletePerson-funktion
   ja lähettää ID-arvon tälle toiminnolle. === Kullanici delete butonuna tiklar. Delete butonu silinecek kisinin id degerini
   alir ve deletePerson fonksiyonunu cagirarak id ddegerini bu fonksiyona gönderir.

2- deletePerson-funktio avaa ensin varoitusikkunan näytölle ja kysyy, pitäisikö käyttäjän todella poistaa tämä henkilö. ===
   deletePerson Fonksiyonu ilk önce ekranda bir uyari penceresi acar ve kullanicinin gercekten bu kisiyi silip silmeyecegini
   sorar.

3- Mikäli käyttäjä hyväksyy henkilön poistamisen, kutsutaan personServicen kautta personServicen kautta Persons.js-tiedoston
   deletePerson-toiminto poistamaan henkilö tietolistalta ja tähän toimintoon lähetetään poistettavan henkilön tunnus. ===
   Kullanici kisinin silinmesini onaylarsa kisinin veri listesinden silinmesi icin personService uzerinden persons.js
   dosyasindaki deletePerson fonksiyonu cagirilir ve silinecek kisinin id degeri bu fonsiyona gönderilir.

4- persons.js-tiedoston deletePerson-funktio lisää saapuvan id-arvon baseUrl-osoitteeseen ja poistaa tämän henkilön
   tietokannasta. Sen jälkeen se lähettää nykyisen tietokannan vastauksena. === persons.js dosyasindaki deletePerson
   fonksiyonu gelen id degerini baseUrl'e ekler ve bu kisiyi veri tabanindan siler. Daha sonra guncel veri tabanini yanit
   olarak gönderir.

5- App.js:n deletePerson-toiminto järjestää persons-luettelon persons.js:n vastauksen mukaan. === App.js deki deletePerson
   fonksiyonu persons.js'den gelen yanita göre persons listesini duzenler.

6- Lopuksi nykyinen luettelo näytetään näytöllä, kun Persons-komponenttia kutsutaan. === Son olarak guncel liste Persons
   bileseni cagrildigi icin ekranda gösterilir.
*/

import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");


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

      personService.create(addNewPerson)
      .then(returnedPerson => {
        setPersons([...persons, returnedPerson]);
        setNewName("");
        setNewNumber("");
      });

    }
  };

  // 1
  const deletePerson = (id) => {
    /*
      Etsin ja löysin halutun id-arvon find-menetelmällä ja annoin sen deleteThePerson-muuttujalle. === istenilen id
      degerini find methodunu kullanarak arayip  buldum ve onu deleteThePerson degiskenine atadim.
    */
    const deleteThePerson = persons.find((person) => person.id === id);

    /*
      Loin viestimuuttujan ja annoin näytettävän viestin sekä poistettavan henkilön nimen. === bir message degiskeni
      olusturdum ve icine gosterilecek olan mesaji ve silinecek olan kisinin ismini girdim.
    */
    const message = `Delete ${deleteThePerson.name}?`;

    /*
      Loin selaimeen vahvistusikkunan ja lisäsin viestini siihen. === tarayicida bir onay pencerisi olusturdum ve
      icine mesajimi ekledim.
    */
    const isConfirmed = window.confirm(message);

    if (isConfirmed) {
      /* 2
      Jos käyttäjä vahvistaa poiston, lähetin id-arvon persons.js:n delete Person -funktion ja halusin, että
      lähetetty tunnus poistetaan tietokannasta. === Kullanici silme islemini onaylarsa persons.js de yer alan
      deletePerson fonksiyonuna id degeri göndererek gönderilen id'nin veri tabanindan silinmesini istedim.
      */
      personService
        .deletePerson(id)
        .then(() => {
          /*
            Lopuksi otin käyttöön persons-luettelon suodattamisen ja näyttämisen === Son olarak persons listesinin
            filtrelenerek gösterilmesini sagladim.
          */
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
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
      {/* 3 */}
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

          {/*
            Tein poistopainikkeen jokaiselle henkilölle. Kutsuin deletePerson-funktiota saamalla napsautetun
            painikkeen id-arvon. === Her bir kisi icin bir delete butonu olusturdum. Tiklanan butonun id degerini
            alarak deletePerson fonksiyonunu cagirdim.
          */}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
