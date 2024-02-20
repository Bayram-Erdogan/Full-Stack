/*
 1.3: kurssitiedot step3
  Siirrytään käyttämään sovelluksessamme olioita. Muuta komponentin App muuttujamäärittelyt seuraavaan muotoon
  ja muuta sovelluksen kaikkia osia niin, että sovellus edelleen toimii:

  const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
      name: 'Fundamentals of React',
      exercises: 10
    }
    const part2 = {
      name: 'Using props to pass data',
      exercises: 7
    }
    const part3 = {
      name: 'State of a component',
      exercises: 14
    }


    return (
      <div>
        ...
      </div>
    )
  }
*/
const App = () => {
  /*
    App-komponentin muuttujat on muutettu haluttuun muotoon.
  */

  const course = 'Half Stack application development'
    const part1 = {
      name: 'Fundamentals of React',
      exercises: 10
    }
    const part2 = {
      name: 'Using props to pass data',
      exercises: 7
    }
    const part3 = {
      name: 'State of a component',
      exercises: 14
    }


  return (
    <div>
      <Header course={course}/>
      <Content
      /*
        App-komponentin objektien avaimet määritettiin Content-komponentissa luoduille muuttujille.
      */ 
        part1={part1.name} exercises1={part1.exercises} 
        part2={part2.name} exercises2={part2.exercises} 
        part3={part3.name} exercises3={part3.exercises}
      />
      <Total
      /*
        App-komponentin objektien avaimet määritettiin Total-komponentissa luoduille muuttujille.
      */ 
        exercises1={part1.exercises}
        exercises2={part2.exercises}
        exercises3={part3.exercises}
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