/*
 1.5: kurssitiedot step5

  Viedään muutos vielä yhtä askelta pidemmälle, eli tehdään kurssista ja sen osista yksi JavaScript-olio.
  Korjaa kaikki mikä menee rikki.

  const App = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
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
    }

    return (
      <div>
        ...
      </div>
    )
  }
*/


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }


  return (
    <div>
      {/* Kurssiobjektin name arvo määritettiin Header-komponentin kurssimuuttujalle. */}
      
      <Header course={course.name}/>

      {/* Kurssin objektin parts arvo on määritetty Content-komponentissa luoduille muuttujille. */}
      <Content 
        part1={course.parts[0].name} exercises1={course.parts[0].exercises} 
        part2={course.parts[1].name} exercises2={course.parts[1].exercises} 
        part3={course.parts[2].name} exercises3={course.parts[2].exercises}
      />

      {/* Kurssin objektin parts arvo on määritetty Total-komponentissa luoduille muuttujille. */}
      <Total
        exercises1={course.parts[0].exercises}
        exercises2={course.parts[1].exercises}
        exercises3={course.parts[2].exercises}
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