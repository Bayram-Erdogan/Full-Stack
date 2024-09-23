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

export default Course