import { useState } from 'react'

/*
  1.12*: anekdootit step1

  Ohjelmistotuotannossa tunnetaan lukematon määrä anekdootteja eli pieniä "onelinereita", jotka
  kiteyttävät alan ikuisia totuuksia.

  Laajenna seuraavaa sovellusta siten, että siihen tulee nappi, jota painamalla sovellus näyttää
  satunnaisen ohjelmistotuotantoon liittyvän anekdootin:

  Tiedoston main.jsx sisältö on sama kuin edellisissä tehtävissä.

  Google kertoo, miten voit generoida JavaScriptilla sopivia satunnaisia lukuja. Muista, että
  voit testata esim. satunnaislukujen generointia konsolissa.
*/

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  /*
    Loin choseAnecdote-funktion. Tällä funktiolla muutamme arvon 0, joka on ensimmäinen arvo,
    joka tulee selected muuttujalle useStaten kautta. Uusi arvo valitaan satunnaisesti
    matematiikkaluokan random funktiolla.
  */
  const choseAnecdote = () =>{ 
    const chooseIndexNum = Math.floor(Math.random() * anecdotes.length);
    setSelected(chooseIndexNum)
  }

  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <Button handleClick={() => choseAnecdote(selected)} text="next anecdote" /> 
    </div>
  )
}


const Button = (props) =>(
   <button onClick={props.handleClick}>{props.text}</button>
)

export default App