/*

  2.2: Course Information, adım 7

  Ayrıca dersteki alıştırmaların toplamını da gösterin.

*/

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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

  return <Course course={course} />
}

const Course =(props) =>{
  return(
    <>
      <Header title ={props.course.name}/>
      <Content parts ={props.course.parts}/>
      <Total parts ={props.course.parts}/>
    </>
  )
}

const Header = (props) =>{
  return (
    <>
      <h1>{props.title}</h1>
    </>
  )
}

const Content = (props) =>{
  return(
    <>
      {props.parts.map(part =>
        <Part key={part.id} name={part.name} exercise={part.exercises}/>
      )}
    </>
  )
}

const Part = ({name, exercise}) =>{
  return(
    <>
      <p>
        {name} {exercise}
      </p>
    </>
  )
}

const Total = (props) =>{
  let total =0;

  for (let i = 0; i < props.parts.length; i++) {
    total += props.parts[i].exercises;
  }
  return(
    <>
      <p><b>total of {total} excercises</b></p>
    </>
  )
}

export default App