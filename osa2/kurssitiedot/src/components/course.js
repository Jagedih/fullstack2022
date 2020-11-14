import React from 'react'

const Header = ({name}) => {
    return(
      <div>
        <h2>{name}</h2>
      </div>
    )
  }
  const Content = ({part}) => <p>{part.name + " " + part.exercises}</p>
  
  const Total = ({parts}) => {
    return (
    <b>
        total of {parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)} exercises
    </b>
    )
  }
  
  const Course = ({course})=>{
    return(
        <div>
            <Header name = {course.name} />
            {course.parts.map(part => <Content key={part.id} part={part} />)}
            <Total parts={course.parts} />
        </div> 
    )
  }
  export default Course