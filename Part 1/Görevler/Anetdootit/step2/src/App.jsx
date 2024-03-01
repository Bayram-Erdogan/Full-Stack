import { useState } from 'react'

/*
  1.13*: anekdootit step2

  Laajenna sovellusta siten, että näytettävää anekdoottia on mahdollista äänestää:
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
    Ensin tein taulukon, jossa oli 2 elementtiä. Annoin muuttujan tämän taulukon ensimmäiselle elementille
    ja tämä muuttuja tallentaa useStatelta saadun taulukon.*/
  const[points, setPoints]=useState(new Array(anecdotes.length).fill(0));

  const choseAnecdote = () =>{ 
    const chooseIndexNum = Math.floor(Math.random() * anecdotes.length);
    setSelected(chooseIndexNum)
  }
  /*
    Sitten loin funktion nimeltä giveVote. Tämä toiminto ottaa kopion points taulukosta ylhäältä.
    ja lisää painikkeesta tulevan satunnaisen anektodin ääniarvoa yhdellä ja palauttaa kopiotaulukon (newPoints).
  */
  const giveVote = () =>{
    const newPoints = [...points];
    newPoints[selected] +=1;
    setPoints(newPoints);
  }

  return (
    // Lopuksi näytin näytöllä äänestyspainikkeen ja tekstirivin, joka näytti anekdootin äänten määrän.
    <div>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <Button handleClick={giveVote} text="vote" />
      <Button handleClick={choseAnecdote} text="next anecdote" /> 
    </div>
  )
}

const Button = (props) =>(
   <button onClick={props.handleClick}>{props.text}</button>
)

export default App