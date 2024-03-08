/*
 2.1: kurssitiedot step6

    Muutetaan komponenttia App seuraavasti:

    const App = () => {
      const course = {
        name: 'Half Stack application development',
        id: 1,
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
          },
          {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
          },
          {
            name: 'State of a component',
            exercises: 14,
            id: 3
          }
        ]
      }

      return (
        <div>
          <Course course={course} />
        </div>
      )
    }

    export default App

    Määrittele sovellukseen yksittäisen kurssin muotoilusta huolehtiva komponentti Course.

    Sovelluksen komponenttirakenne voi olla esim. seuraava:

    App
      Course
        Header
        Content
          Part
          Part
          ...

    Eli komponentti Course sisältää edellisessä osassa määritellyt komponentit, joiden vastuulle tulee
    kurssin nimen ja osien renderöinti.

    Tässä vaiheessa siis tehtävien yhteenlaskettua lukumäärää ei vielä tarvita.

    Sovelluksen täytyy nyt toimia riippumatta kurssissa olevien osien määrästä. Eli varmista, että sovellus
    toimii jos lisäät tai poistat kurssin osia.

    Varmista myös, että konsolissa ei näy mitään virheilmoituksia!          
*/
const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }/*,
      { Lisäsin sen testatakseni, näkyykö se näytöllä, kun lisään uuden rivin.
        name: 'Python',
        exercises: 27,
        id: 4
      }*/
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

/*
  Ensin loin osan nimeltä Course. Ja kutsuin Header ja Content tästä komponentista.
*/
const Course = (props) => {
  return(
    <div>
      <Header title={props.course.name}></Header>
      <Content parts={props.course.parts}></Content>
    </div>
  )
}


const Header = (props) =>{
  return (
    <div>
      <h1>{props.title}</h1>
    </div> 
  )
}

const Content = (props)=>{
  return(
    <div>
      {/* Kun Content:ssä jokainen kurssirivi on esitetty yksitellen, pyrin näyttämään kurssit yhdellä rivillä
      map käyttäen. Tästä syystä kurotan Contentstä App parts. Ja käytin map saadakseni nämä luetteloelementit.*/}
      {props.parts.map(part => 
      // Kutsumalla Part komponenttia näytän näytöllä kunkin elementin nimen ja contentin.
          <Part key={part.id} course_names={part.name}  course_exercises={part.exercises} />
        )}
    </div>
  )
}

const Part = (props) =>{
  return(
    <div>
      <p>{props.course_names} {props.course_exercises}</p>
    </div>
  )
}

export default App