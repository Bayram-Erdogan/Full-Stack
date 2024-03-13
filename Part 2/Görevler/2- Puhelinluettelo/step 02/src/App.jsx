/*
  2.7: puhelinluettelo step2

  Jos lisättävä nimi on jo sovelluksen tiedossa, estä lisäys. Taulukolla on lukuisia sopivia metodeja tehtävän
  tekemiseen.

  Anna tilanteessa virheilmoitus komennolla alert:

*/


import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  
  const [newName, setNewName] = useState('')

  const AddPerson = (event) => { 
    event.preventDefault() 
   
    /*
      Etsin käyttäjältä tulevaa dataa find menetelmällä nimettyjen persons luettelosta. Ja annoin palautetun
      tuloksen muuttujalle nimeltä isNameOnList.
    */
    const isNameOnList = persons.find(person => person.name === newName);

    if (isNameOnList){
      /*
        Jos isNameOnList-muuttuja on tosi, eli jos syötetty nimi on jo listassa, halusin näyttää käyttäjälle
        varoituksen ruudulla.
      */
      alert(`${newName} is already added to phonebook`)
    }else{
      /*
        Jos isNameOnList on epätosi, eli syötetty nimi ei ole listassa, halusin, että käyttäjän antama
        nimi lisätään listaan.
       */
      const addNewPerson ={ 
        name:newName 
      }

      setPersons (persons.concat(addNewPerson)) 
      setNewName('') 
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={AddPerson}> 
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map((person) => (
          <p  key={person.name}>{person.name}</p>
        ))} 
    </div>
  )

}

export default App