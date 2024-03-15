/*
  2.8: puhelinluettelo step3

  Lisää sovellukseen mahdollisuus antaa henkilöille puhelinnumero. Tarvitset siis lomakkeeseen myös toisen
  input-elementin (ja sille oman muutoksenkäsittelijän):

  <form>
    <div>name: <input /></div>
    <div>number: <input /></div>
    <div><button type="submit">add</button></div>
  </form>

*/


import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: '', number: '' } // ==> Jätin nimi- ja numero arvot tyhjiksi.
  ]) 
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('') // ==> Tein sen säilyttääkseni puhelinnumerot ja päivittääkseni niitä.

  const AddPerson = (event) => { 
    event.preventDefault() 
   
    const isNameOnList = persons.find(person => person.name === newName);

    if (isNameOnList){
      alert(`${newName} is already added to phonebook`)
    }else{
      const addNewPerson ={ 
        name:newName,
        number:newNumber // ==> Numeroiden lisäämistä varten määritin numeron arvon newNumaran.
      }

      setPersons (persons.concat(addNewPerson)) 
      setNewName('')
      setNewNumber(''); // ==> Tyhjennän numeroluettelon numeron lisäämisen jälkeen
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) =>{ // ==> Loin sen lisätäkseni syötetyn puhelinnumeron luetteloon.
    setNewNumber(event.target.value);
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={AddPerson}> 
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        {/* 
          Loin syötteen numeroiden input ja määritin arvoksi newNumberin. Määritin handleNumberChange-
          funktion onChange-attribuutille, joka tulee kutsumaan, kun arvot syötetään.
        */}
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map((person) => (
          <p  key={person.name}>{person.name} {person.number}</p>
        ))} 
    </div>
  )

}

export default App