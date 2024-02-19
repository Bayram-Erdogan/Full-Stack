/*
  1.1: kurssitiedot, step1

  A) Luo Vitellä uusi sovellus. Muuta main.jsx muotoon

      import ReactDOM from 'react-dom/client'
      import App from './App'
      ReactDOM.createRoot(document.getElementById('root')).render(<App />)

  B) ja tiedosto App.jsx muotoon

      const App = () => {
        const course = 'Half Stack application development'
        const part1 = 'Fundamentals of React'
        const exercises1 = 10
        const part2 = 'Using props to pass data'
        const exercises2 = 7
        const part3 = 'State of a component'
        const exercises3 = 14

        return (
          <div>
            <h1>{course}</h1>
            <p>
              {part1} {exercises1}
            </p>
            <p>
              {part2} {exercises2}
            </p>
            <p>
              {part3} {exercises3}
            </p>
            <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
          </div>
        )
      }

      export default App

   ja poista ylimääräiset tiedostot App.css ja index.css ja hakemisto assets.

  C) Koko sovellus on nyt ikävästi yhdessä komponentissa. Refaktoroi sovelluksen koodi siten, että se koostuu
  kolmesta uudesta komponentista: Header, Content ja Total. Kaikki data pidetään edelleen komponentissa App,
  joka välittää tarpeelliset tiedot kullekin komponentille props:ien avulla. Header huolehtii kurssin nimen
  renderöimisestä, Content osista ja niiden tehtävämääristä ja Total tehtävien yhteismäärästä.

  Tee uudet komponentit tiedostoon App.jsx.

  Komponentin App runko tulee olemaan suunnilleen seuraavanlainen:

    const App = () => {
      // const-määrittelyt

      return (
        <div>
          <Header course={course} />
          <Content ... />
          <Total ... />
        </div>
      )
    }
*/
const App = () => {

  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
/*
  Kutsuin alla luomiani komponentteja App-komponentista, joka on pääkomponentti. Tällä tavalla sovelluskomponentti
  pystyi kommunikoimaan muiden komponenttien kanssa. Kolmen luodun komponentin ansiosta App-komponentti on
  yksinkertaistunut ja koodin luettavuus on helpottunut.
*/
  return (
    <div>
      <Header course={course}/>
      <Content 
        part1={part1} exercises1={exercises1} 
        part2={part2} exercises2={exercises2} 
        part3={part3} exercises3={exercises3}
      />
      <Total 
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
        />
    </div>
  )
}

/*
  Loin 3 komponenttia, nimeltään Content, Header ja Total. Käytin App-komponentin muuttujia parametreina näissä
  luomissani komponenteissa.
*/
const Header = (props) =>{
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
    
  )
}

const Content = (props)=>{
  return(
  <div>
    <p>
      {props.part1} {props.exercises1}
    </p>
    <p>
    {props.part2} {props.exercises2}
    </p>
    <p>
    {props.part3} {props.exercises3}
    </p>
  </div>
)
}

const Total = (props)=>{
  return (
    <p>Number of exercises {props.exercises1+ props.exercises2+ props.exercises3}</p>
  )
}

export default App