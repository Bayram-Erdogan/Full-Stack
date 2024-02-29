import { useState } from 'react'

/*
  1.11*: unicafe step6

  Toteuta tilastojen näyttäminen HTML:n taulukkona siten, että saat sovelluksesi näyttämään suunnilleen
  seuraavanlaiselta:
*/
const App = () => {
 
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0,bad:0
  })

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

      <Button handleClick={() => goodClick()} text="good" />
      <Button handleClick={() => neutralClick()} text="neutral" />
      <Button handleClick={() => badClick()} text="bad" />

      <h2>statistics</h2>
      
      <table>
        <tbody>
          <tr>
            {/* 
              Tein taulukon ja jaoin rivit 2 sarakkeeseen. Laitoin text ensimmäiseen sarakkeeseen
                ja value toiseen sarakkeeseen.
            */}
            <td><StatisticLine text="good"/></td>
            <td><StatisticLine value={clicks.good}/></td>
          </tr>

          <tr>
            <td><StatisticLine text="neutral"/></td>
            <td><StatisticLine value={clicks.neutral}/></td>
          </tr>

          <tr>
            <td><StatisticLine text="bad"/></td>
            <td><StatisticLine value={clicks.bad}/></td>
          </tr>

          <tr>
            <td><StatisticLine text="all"/></td>
            <td><StatisticLine value={all}/></td>
          </tr>

          <tr>
            <td><StatisticLine text="average"/></td>
            <td><StatisticLine value={isNaN(average) ? 0 : average.toFixed(1)}/> </td>
          </tr>

          <tr>
            <td><StatisticLine text="positive"/></td>
            <td><StatisticLine value={isNaN(positive) ? 0 : positive.toFixed(1) +' %'}/></td>
          </tr>
        </tbody>
      </table>      
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
    <div>
      {props.text} {props.value}
    </div>
  )
  
}

export default App