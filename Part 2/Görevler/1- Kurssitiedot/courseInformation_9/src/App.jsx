/*

  2.4: Course Information, adım 9

  Başvurumuzu isteğe bağlı sayıda kursa izin verecek şekilde genişletelim :

const App = () => {
  const courses = [
    {
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      // ...
    </div>
  )
}

*/

const App = () => {
  const courses = [
    {
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course courses ={courses} />
    </div>
  )
}

const Course =(props) =>{
  return(
    <>
    {props.courses.map(course =>
      (
        <div key={course.id}>
          <Header title ={course.name}/>
          <Content parts ={course.parts}/>
          <Total parts ={course.parts}/>
        </div>
      ))}

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
  const total = props.parts.reduce((s, p) => s+p.exercises,0)

  return(
    <>
      <p><b>total of {total} excercises</b></p>
    </>
  )
}

export default App