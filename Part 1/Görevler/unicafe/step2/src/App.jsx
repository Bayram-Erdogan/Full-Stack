import { useState } from 'react'

/*
  Laajenna sovellusta siten, että se näyttää palautteista enemmän statistiikkaa: yhteenlasketun määrän,
  keskiarvon (hyvän arvo 1, neutraalin 0, huonon -1) ja sen kuinka monta prosenttia palautteista on
  ollut positiivisia:
*/
const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  /*
    Loin all, average ja positive muuttajat, ja osoitin heidän tekemänsä työt näille muuttujille
  */
  const all= good+neutral+bad
  const average = (good - bad) / all
  const positive =(good / all)*100
  
  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={() => setGood(good +1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <h2>statistics</h2>

      <div>good {good}</div> 
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      {/* Käytin yllä luomiani muuttujia. */}
      
      <div>all  {all}</div>

      {/*
        Kun en käyttänyt ohjelman painikkeita, eli kun arvot olivat 0, keskiarvo ja positiiviset
        arvot näyttivät NaN:ää. Kun tutkin tätä, näin isNaN-funktion ja toteutin sen ternary
        operatorilla.
      */}
      <div>average {isNaN(average) ? 0 : average}</div>
      <div>positive {isNaN(positive) ? 0 : positive} %</div>
      
    </div>
  )
}

const Button = (props) =>(
  <button onClick={props.handleClick}>{props.text}</button>
)

export default App