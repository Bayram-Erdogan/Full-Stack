import { useState } from 'react'

/*
  1.14*: anekdootit step3

  Ja sitten vielä lopullinen versio, joka näyttää eniten ääniä saaneen anekdootin:
  Jos suurimman äänimäärän saaneita anekdootteja on useita, riittää että niistä näytetään yksi.
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
  const[points, setPoints]=useState(new Array(anecdotes.length).fill(0));

  const choseAnecdote = () =>{ 
    const chooseIndexNum = Math.floor(Math.random() * anecdotes.length);
    setSelected(chooseIndexNum)
  }
  const giveVote = () =>{
    const newPoints = [...points];
    newPoints[selected] +=1;
    setPoints(newPoints);
  }

  /*
    Points taulukon suurimman arvon saavutin matematiikan luokan max-funktiolla. ja sain indeksin
    suurimmasta arvosta, jonka sain indexOf-funktiolla. Sitten annoin tämän indeksiarvon muuttujalle.
  */
  const highPointsIndex = points.indexOf(Math.max(...points));

  /*
    Edellisellä rivillä saavutin suurimman arvon anekdootin indeksin. Tällä rivillä annan muuttujalle
    arvon kyseisellä indeksillä ja kutsumalla tätä muuttujaa näytän ruudulla eniten ääniä saaneen anekdootin.
  */
  const highPointsAnecdote = anecdotes[highPointsIndex];

  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <Button handleClick={giveVote} text="vote" />
      <Button handleClick={choseAnecdote} text="next anecdote" /> 

      {/* 
        Kuten kysymyksessä pyydettiin, näytän ruudulla otsikkorivin, eniten ääniä saaneen anekdootin ja
        sen saamien äänien määrän. 
      */}
      <h2>Anecdote with most votes</h2>
      <div>{highPointsAnecdote}</div>
      <div>has {points[highPointsIndex]} votes</div>
    </div>
  )
}

const Button = (props) =>(
   <button onClick={props.handleClick}>{props.text}</button>
)

export default App