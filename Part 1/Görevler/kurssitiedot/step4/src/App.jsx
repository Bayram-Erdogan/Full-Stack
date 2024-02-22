/*
 1.4: kurssitiedot step4
  Seuraavaksi laitetaan oliot taulukkoon, eli muuta App :in muuttujamäärittelyt seuraavaan muotoon ja muuta
  sovelluksen kaikki osat vastaavasti:

  const App = () => {
    const course = 'Half Stack application development'
    const parts = [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]

    return (
      <div>
        ...
      </div>
    )
  }
*/


const App = () => {
  /*
    Muutimme App-komponentin muuttujat taulukoksi ja muutimme jokaisen elementin objektiksi. Ja käytimme
    elementtejämme objektissa avainarvoina.
  */
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]


  return (
    <div>
      <Header course={course}/>
      <Content
      /*
       Pääsin avainarvoihimme Contentista taulukon indeksinumeron kautta ja osoitin ne luomillemme muuttujille.
      */ 
        part1={parts[0].name} exercises1={parts[0].exercises} 
        part2={parts[1].name} exercises2={parts[1].exercises} 
        part3={parts[2].name} exercises3={parts[2].exercises}
      />
      <Total
      /*
       Pääsin avainarvoihimme Totalista taulukon indeksinumeron kautta ja osoitin ne luomillemme muuttujille.
      */
        exercises1={parts[0].exercises}
        exercises2={parts[1].exercises}
        exercises3={parts[2].exercises}
        />
    </div>
  )
}

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
      <Part course_names={props.part1} course_exercises={props.exercises1} />
      <Part course_names={props.part2} course_exercises={props.exercises2} />
      <Part course_names={props.part3} course_exercises={props.exercises3} />
    </div>
  )
}

const Total = (props)=>{
  return (
    <div>
      <p>Number of exercises {props.exercises1+ props.exercises2+ props.exercises3}</p>
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