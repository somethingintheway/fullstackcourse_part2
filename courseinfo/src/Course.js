const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const {parts} = course;
  console.log(parts)
  const sum = parts.reduce((a, b) => a + b.exercises, 0);
  return(
    <b>total of {sum} exercises</b>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {

  const {parts} = course;

  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part}></Part>
      )}
    </div>
  )
}


const Course = ({ course }) => {

  return (
    <div>
      <Header course={course}></Header>
      <Content course={course}></Content>
      <Total course={course}></Total>
    </div>
  );

}

export default Course;