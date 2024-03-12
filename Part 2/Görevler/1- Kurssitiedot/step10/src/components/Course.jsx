const Course = (props) => {
    return(
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

export default Course