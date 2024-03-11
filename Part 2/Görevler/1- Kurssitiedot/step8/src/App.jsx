/*
  2.3*: kurssitiedot step8
  
  Jos et jo niin tehnyt, laske koodissasi tehtävien määrä taulukon metodilla reduce.

  Pro tip: Kun koodisi joka näyttää esimerkiksi seuraavalta

  const total = 
    parts.reduce( (s, p) => someMagicHere )
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
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Course = (props) => {
  return(
    <div>
      <Header title={props.course.name}></Header>
      <Content parts={props.course.parts}></Content>
      <Total parts={props.course.parts}></Total>
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
      {props.parts.map(part => 
        <Part key={part.id} course_names={part.name}  course_exercises={part.exercises} />
      )}
    </div>
  )
}

const Total = (props)=>{
  return (
    /*
      Pääsin parts luetteloon App:ssa. Ja käyttämällä reduce menetelmää, lisäsin excersize-arvon
      edellisen arvon s päälle ja arvon, jonka loin edustamaan arvoa, joka tulee parts luettelosta.
    */
    <div>
      <p><b>Total of {props.parts.reduce( (s, p) => s+ p.exercises, 0)} exercises</b></p>
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