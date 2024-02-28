import { useState } from 'react'

/*
  1.9: unicafe step4
  Muuta sovellusta siten, että numeeriset tilastot näytetään ainoastaan, jos palautteita on jo annettu:
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

  /*
    Olen asettanut sen näyttämään tilastotietoja, jos sovelluksessa annetaan palautetta, eli jos jotain
    good, neutral tai bad nappia napsautetaan. Tätä varten lisäsin Statistics-komponenttiin if-ehdon ja
    asetin and-operaattorilla kolme yllä olevaa painiketta näyttämään annetun tekstin, jos sen arvo on 0.
  */
  if (props.good==0 & props.neutral==0 & props.bad==0){
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
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