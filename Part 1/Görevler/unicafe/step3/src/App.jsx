import { useState } from 'react'

/*
  1.8: unicafe step3
  Refaktoroi sovelluksesi siten, että tilastojen näyttäminen on eriytetty oman komponentin Statistics vastuulle.
  Sovelluksen tila säilyy edelleen juurikomponentissa App.

  Muista, että komponentteja ei saa määritellä toisen komponentin sisällä:
*/
const App = () => {
  
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all= (good+neutral+bad);
  const average = ((good - bad) / all);
  const positive = ((good / all)*100);
  
  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={() => setGood(good +1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <h2>statistics</h2>
      
      {/* Sitten kutsuin Statistics-komponenttia, jonka loin alla pääkomponentista, App-komponentista. */}
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
      
    </div>
  )
}

const Button = (props) =>(
  <button onClick={props.handleClick}>{props.text}</button>
)

const Statistics = (props) => {

  //Ensin loin Statistics-komponentin.
  return(
    <div>
        <div>good {props.good}</div>
        <div>neutral {props.neutral}</div>
        <div>bad {props.bad}</div>
        <div>all {props.all}</div>
        <div>average {isNaN(props.average) ? 0 : props.average}</div>
        <div>positive {isNaN(props.positive) ? 0 : props.positive} %</div>
    </div>
  )
  
}

export default App