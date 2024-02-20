/*
  1.2: kurssitiedot, step2
  
    Refaktoroi vielä komponentti Content siten, että se ei itse renderöi yhdenkään osan nimeä eikä sen
    tehtävälukumäärää vaan ainoastaan kolme Part-nimistä komponenttia, joista kukin siis renderöi yhden
    osan nimen ja tehtävämäärän.

    const Content = ... {
      return (
        <div>
          <Part .../>
          <Part .../>
          <Part .../>
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

const Header = (props) =>{
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
    
  )
}

const Content = (props)=>{
  /*
    Kutsuin Part komponenttia nimellä Content-komponentista ja määritin App-komponentin muuttujien arvot arvoiksi.
  */
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
  /*
    Loin komponentin nimeltä osa ja lisäsin parametreiksi kaksi arvoa, course_names ja course_exercises.
  */
  return(
    <div>
      <p>{props.course_names} {props.course_exercises}</p>
    </div>
  )
}

export default App