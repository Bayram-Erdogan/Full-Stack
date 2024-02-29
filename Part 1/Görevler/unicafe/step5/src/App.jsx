import { useState } from 'react'

/*
  1.10: unicafe step5
  Jatketaan sovelluksen refaktorointia. Eriytä seuraavat kaksi komponenttia

  Button vastaa yksittäistä palautteenantonappia
  StatisticLine huolehtii tilastorivien, esim. keskiarvon näyttämisestä
  Tarkennuksena: komponentti StatisticLine näyttää aina yhden tilastorivin, joten sovellus käyttää komponenttia
  useaan kertaan renderöidäkseen kaikki tilastorivit

  Sovelluksen tila säilytetään edelleen juurikomponentissa App.
*/
const App = () => {
  /*
    Loin taulukon, jossa oli 2 elementtiä ja sijoitin taulukon ensimmäiseen elementtiin muuttujan nimeltä
    clicks muuttujien tallentamiseksi. Tämä muuttuja tallentaa useStatesta tulevien objektin elementtien
    (hyvä, neutraali ja huono) arvot. Arrayn toiseksi elementiksi laitoin funktion, joka päivittää luotujen
    muuttujien arvot.
  */
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0,bad:0
  })

  /*
    Sitten luotiin funksioita, joilla määritetään, mikä arvo kasvaa, kun painikkeita napsautetaan.
  */
  const goodClick = () =>
  setClicks({ ...clicks, good: clicks.good + 1 })

  const neutralClick = () =>
  setClicks({ ...clicks, neutral: clicks.neutral + 1 })

  const badClick = () =>
  setClicks({ ...clicks, bad: clicks.bad + 1 })

  const all= (clicks.good+clicks.neutral+clicks.bad);
  const average = ((clicks.good - clicks.bad) / all);
  const positive = ((clicks.good / all)*100);
  
  return (
    <div>
      <h1>give feedback</h1>

      {/* Sitten liitin yllä luomani funktiot painikkeisiin handleClickin kautta. */}
      <Button handleClick={() => goodClick()} text="good" />
      <Button handleClick={() => neutralClick()} text="neutral" />
      <Button handleClick={() => badClick()} text="bad" />

      <h2>statistics</h2>
      
      {/* Määritin tekstin ja arvot alla luomaani StaticLine-komponenttiin. */}
      <StatisticLine text="good" value={clicks.good}/>
      <StatisticLine text="neutral" value={clicks.neutral}/>
      <StatisticLine text="bad" value={clicks.bad}/>
      <StatisticLine text="all" value={all}/>
      <StatisticLine text="average" value={isNaN(average) ? 0 : average}/>
      <StatisticLine text="positive" value={isNaN(positive) ? 0 : positive +' %'}/>
      
    </div>
  )
}

const Button = (props) =>(
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticLine = (props) => {

  if (props.good==0 & props.neutral==0 & props.bad==0){
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    // Asetin sen niin, että teksti- ja value arvot ylhäältä näkyvät näytöllä.
    <div>
      {props.text} {props.value}
    </div>
  )
  
}

export default App