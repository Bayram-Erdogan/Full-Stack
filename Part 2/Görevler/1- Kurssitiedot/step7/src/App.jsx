/*
  2.2: kurssitiedot step7

  Ilmoita myös kurssin yhteenlaskettu tehtävien lukumäärä:
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
  {/* Kutsuin Total-komponentin Course komponentista. */}
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
  let total = 0; // Tein muuttujan.

  // For-silmukan avulla pääsin course sisällä parts luetteloon ja lisäsin harjoitusarvot kokonaismuuttujaan.
  for (let i = 0; i < props.parts.length; i++) {
    total += props.parts[i].exercises;
  }

  return (
    <div>
      {/* Lopuksi näytin näytöllä total muuttujan. */}
      <p><b>total of {total} exercises</b></p>
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