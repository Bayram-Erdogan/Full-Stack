/*
  2.6: puhelinluettelo step1

  Toteutetaan yksinkertainen puhelinluettelo. Aluksi luetteloon lisätään vain nimiä.

  Toteutetaan tässä tehtävässä henkilön lisäys puhelinluetteloon.

  Voit ottaa sovelluksesi komponentin App pohjaksi seuraavan:

  import { useState } from 'react'

  const App = () => {
    const [persons, setPersons] = useState([
      { name: 'Arto Hellas' }
    ]) 

  const [newName, setNewName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )

}

export default App


  Tila newName on tarkoitettu lomakkeen kentän kontrollointiin.

  Joskus tilaa tallettavia ja tarvittaessa muitakin muuttujia voi olla hyödyllistä renderöidä debugatessa
  komponenttiin, eli voit tilapäisesti lisätä komponentin palauttamaan koodiin esim. seuraavan:

  <div>debug: {newName}</div>copy
  Muista myös osan 1 luku React-sovellusten debuggaus, erityisesti React Developer Tools on välillä todella
  kätevä komponentin tilan muutosten seuraamisessa.

  Huomaa React Developer Toolsin käyttö!

  Huom:

  voit käyttää kentän key arvona henkilön nimeä
  muista estää lomakkeen lähetyksen oletusarvoinen toiminta

*/


import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  
  const [newName, setNewName] = useState('')

  // Loin toiminnon nimeltä addPerson ihmisten lisäämiseksi puhelinluetteloon.
  const AddPerson = (event) => { 
    event.preventDefault() // ==> Lisäsin tämän rivin estääkseni lomakkeen lähettämisen oletuskäyttäytymisen.

    // Loin objektin nimeltä addNewPerson.
    const addNewPerson ={ 
      name:newName // ==> Määritin arvon newNamesta nimiavaimen arvoksi.
    }
    
    setPersons (persons.concat(addNewPerson)) // ==>  Lisäsin uusi arvo setPersons-luetteloon concat-menetelmällä.
    setNewName('') // ==> Tyhjensin newName-arvon setNewName-sovelluksella.
  }

  //Loin funktion nimeltä handle Name Change, eli se on päivittää set NewName-arvon käyttäjältä saamani arvolla newName 
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={AddPerson}> {/* Määritin addPerson-funktion onSubmit-attribuutille, jotta addPerson-toiminto
                                      suoritetaan, kun lomake lähetetään. */}
        <div>
          {/* Määrittääkseni syötetyn arvon newName-arvolle määritin newName-arvon value-attribuutille.
              Määritin HandNameChange-funktion onChange-attribuutille, jotta kahvan NameChange-funktio suoritetaan,
              kun arvo syötetään inputille.*/}
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map((person) => ( // ==> Tein map, jossa näkyvät henkilöluettelossa olevat nimet.
          <p  key={person.name}>{person.name}</p>
        ))} 
    </div>
  )

}

export default App