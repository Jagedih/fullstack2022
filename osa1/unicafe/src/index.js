import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (<button onClick={onClick}>{text}</button>)
const StatisticLine =({text, value}) => {
  return (
  <tr>
    <td>{text}:</td> 
    <td>{value}</td>
  </tr>
  )
}
const Statistics = ({good, neutral, bad}) => {
  const all = () => good + neutral + bad
  const avg = () => Math.round((((good + bad*-1) / all()) * 100)) / 100
  const positive = () => (Math.round((good / all())*10000) / 100) + " %"

  if(isNaN(avg())){
    return (
      <div>
        <h1>Statistics</h1>
      No feedback given
      </div>
    )
  }
  
  return(
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text ='good' value={good} />
          <StatisticLine text ='neutral' value={neutral} />
          <StatisticLine text ='bad' value={bad} />
          <StatisticLine text ='all' value={all()} />
          <StatisticLine text ='avg' value={avg()} />
          <StatisticLine text ='positive' value={positive()} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addToGood = () => setGood(good + 1)
  const addToNeutral = () => setNeutral(neutral + 1)
  const addToBad = () => setBad(bad + 1)
  
  return (
    <div>
      <h1>Give feedback!</h1>
      <Button onClick={addToGood} text='good' />
      <Button onClick={addToNeutral} text='neutral' />
      <Button onClick={addToBad} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)