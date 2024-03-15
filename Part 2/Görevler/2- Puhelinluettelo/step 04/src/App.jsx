/*
  2.9*: puhelinluettelo step4

  Tee lomakkeeseen hakukenttä, jonka avulla näytettävien nimien listaa voidaan rajata:
*/
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  /*
    Tein taulukon, jossa on 2 elementtiä suodatettavien merkkien säilyttämiseksi. Ensimmäinen elementti sisältää käyttäjän
    syöttämän arvon, ja toinen elementti edustaa toimintoa, joka muokkaa ensimmäistä elementtiä. UseState(' ') -tila on
    määritetty ensimmäiselle elementille, suodattimelle. Sitten käyttäjältä tulevat arvot lähetetään suodatinmuuttujalle
    setFilterin kautta.
  */
  const [filter, setFilter] =useState('')   
  
  const AddPerson = (event) => { 
    event.preventDefault() 
   
    const isNameOnList = persons.find(person => person.name === newName);

    if (isNameOnList){
      alert(`${newName} is already added to phonebook`)
    }else{
      const addNewPerson ={ 
        name:newName,
        number:newNumber 
      }

      setPersons (persons.concat(addNewPerson)) 
      setNewName('')
      setNewNumber(''); 
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) =>{ 
    setNewNumber(event.target.value);
  }

  /*
    Tein funktion, joka välittää käyttäjän input-laatikkon syöttämät arvot yllä luomaani filter-muuttujaan.
  */
  const handleFilterChange = (event) => {
    /*
      Kun käyttäjä syöttää arvon filter laatikkon , setFilter-toiminto kutsutaan. Ja syötetty arvo lähetetään
      filter-muuttujalle setFilter-toiminnon kautta.
    */
    setFilter(event.target.value); 
  };

  /*
    Suodatin ja hain käyttäjän syöttämät merkit persons-taulukon elementeistä ja sijoitin ne uuteen taulukkoon.
    Poistaakseni eron isojen ja pienten kirjainten välillä muunsin kaikki luetellut nimet pieniksi kirjaimille.
    Etsin persons-luettelosta muuntamalla käyttäjän syöttämät merkit pieniksi kirjaimille.
  */
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={AddPerson}>
         {/*Tein tekstilaatikon, jonka käyttäjä voi suodattaa.  */}
        <p>
          filter shown with  <input value={filter} onChange={handleFilterChange} />
        </p>

      <h2>add a new</h2>

        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {/*
        Yllä näytin filteredPersons-luettelon elementit näytölle map-menetelmällä, johon tallensin nimet käyttäjän
        syöttämillä arvoilla. 
      */}
      {filteredPersons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  )

}

export default App