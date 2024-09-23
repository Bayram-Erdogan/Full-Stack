/*

  2.1: Course Information, adım 6

  Uygulama bileşenini şu şekilde değiştirelim :

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

export default App

  Course adlı tek bir kursu biçimlendirmekten sorumlu bir bileşeni tanımlayın .

  Uygulamanın bileşen yapısı örneğin aşağıdaki gibi olabilir:

App
  Course
    Header
    Content
      Part
      Part
      ...

  Dolayısıyla Kurs bileşeni, önceki bölümde tanımlanan ve kurs adının ve bölümlerinin oluşturulmasından sorumlu olan bileşenleri içerir.

  Oluşturulan sayfa örneğin aşağıdaki gibi görünebilir:


  Henüz egzersizlerin toplamına ihtiyacınız yok.

  Uygulama, bir kursun sahip olduğu bölüm sayısına bakılmaksızın çalışmalıdır ; bu nedenle, bir kursa bölüm eklediğinizde veya çıkardığınızda
  uygulamanın çalıştığından emin olun.

  Konsolun hiçbir hata göstermediğinden emin olun!

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

export default App