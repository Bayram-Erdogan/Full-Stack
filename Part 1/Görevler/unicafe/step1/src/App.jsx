import { useState } from 'react'

/*
  Monien firmojen tapaan nykyään myös Helsingin yliopiston opiskelijaruokala Unicafe kerää asiakaspalautetta.
  Tee Unicafelle verkossa toimiva palautesovellus. Vastausvaihtoehtoja olkoon vain kolme: hyvä, neutraali ja huono.

  Sovelluksen tulee näyttää jokaisen palautteen lukumäärä. Sovellus voi näyttää esim. seuraavalta:
*/
const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      {/* Kutsuin Button App-komponentista ja määritin toiminnon handleClick osoittamaan, mitä sen pitäisi tehdä,
          kun kutakin painiketta napsautetaan. */}

      <Button handleClick={() => setGood(good +1)} text="good" />{/* Käskin sen nostaa Good arvoa yhdellä,
                                                                      kun Good nappia napsautetaan */}
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h2>statistics</h2>
      <div>good {good}</div> 
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
    </div>
  )
}

/*
  Tein Button komponentin. Sitten määritin painikkeen onClick-attribuutin ja tehtävän, jonka sen tulisi suorittaa.
*/
const Button = (props) =>(
  <button onClick={props.handleClick}>{props.text}</button>
)

export default App