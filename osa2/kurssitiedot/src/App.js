import React from 'react'
import Course from './components/course'

const App = () => {
  const courses = [{
    name: 'Half Stack application development',
    id:1,
    parts:[
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
  },
  {
    name: 'Half Stack application development 2',
    id:2,
    parts:[
      {
        name: 'essentials of hurrdurr',
        exercises: 50,
        id: 4
      },
      {
        name: 'ougagagoubou123123',
        exercises: 12,
        id: 5
      },
      {
        name: '1234677',
        exercises: 14,
        id: 6
      }
    ]
  },
  {
    name: 'elements of ai',
    id:3,
    parts:[
      {
        name: 'adlfkadf',
        exercises: 1,
        id: 7
      },
      {
        name: 'eeeeeeeeeeeeeeeee',
        exercises: 2,
        id: 8
      },
      {
        name: ':S:S:S:S:S',
        exercises: 3,
        id: 9
      }
    ]
  }
]
  return (
    <div>
      <h1>Web developement curriculum</h1>
      {courses.map(course => <Course key={course.id} course={course} />)}
    </div>
  )
}
export default App