/*
  2.4: kurssitiedot step9

  Laajennetaan sovellusta siten, että kursseja voi olla mielivaltainen määrä:
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
      <h1>Web development curriculum</h1> {/* Kirjoitin halutun otsikon h1-tunnisteeseen. */}
      <Course courses ={courses} /> {/* Kutsuin Course komponentin. */}
    </div>
  )
}

const Course = (props) => {
  return(
    /* 
      Hain Courses' hakemiston elementit map kautta ja kutsuin niitä Header, Content - ja Total
      komponenttien avulla.

      Ensin se näyttää nimiarvon Header komponentin ensimmäisessä indeksinumerossa näytöllä.
      Sitten se näyttää arvon Content:sta ensimmäisessä indeksinumerossa. Sitten, kun arvo on
      esitetty Total-komponentin ensimmäisessä indeksinumerossa, se toimii kuin silmukka, joka
      jatkaa samaa prosessia näyttämällä arvon seuraavassa indeksinumerossa.
    */
    <div>
      {props.courses.map(course => (
        <div key={course.id}>
          <Header title={course.name}></Header> 
          <Content parts={course.parts}></Content> 
          <Total parts={course.parts}></Total>
        </div>
      ))}
    </div>
    
  )
}


const Header = (props) =>{
  return (
    <div>
      <h2>{props.title}</h2>
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
    <div>
      <p><b>total of {props.parts.reduce( (s, p) => s+ p.exercises, 0)} exercises</b></p>
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