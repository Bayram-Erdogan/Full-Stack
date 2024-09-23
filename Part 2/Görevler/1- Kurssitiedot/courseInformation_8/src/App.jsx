/*

  2.3: Course Information, adım 8

  Henüz yapmadıysanız, egzersizlerin toplamını azalt dizi yöntemiyle hesaplayın .

  Profesyonel ipucu: kodunuz aşağıdaki gibi göründüğünde:

const total =
  parts.reduce((s, p) => someMagicHere)

  ve işe yaramazsa, ok işlevinin daha uzun biçimde yazılmasını gerektiren console.log işlevini kullanmaya değer :

const total = parts.reduce((s, p) => {
  console.log('what is happening', s, p)
  return someMagicHere
})

  Çalışmıyor musun? : Bir Nesne Dizisinde azaltmanın nasıl kullanıldığına bakmak için arama motorunuzu kullanın .

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
  const total = props.parts.reduce((s, p) => s+p.exercises,0)

  return(
    <>
      <p><b>total of {total} excercises</b></p>
    </>
  )
}

export default App