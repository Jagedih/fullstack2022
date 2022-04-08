import { useState } from 'react'

const Button = ({handleClick, text}) =>(
<button onClick = {handleClick}> 
    {text} 
</button>
)
const StatisticLine = ({text, stats, end}) =>(
  <tr>
    <td>{text}</td>
    <td>{stats} {end}</td>
  </tr>
)
const Statistics = ({good, neutral, bad}) =>{
  if(good===0 && neutral===0 && bad === 0){
    return (
      <div>
        No feedback given
      </div>
    )
  }
  else{
    const sum = good + neutral + bad
    const average = ((good - bad)/sum).toFixed(2)
    const positive = ((good / sum)*100).toFixed(2)
    return(
    <div>
        <table>
          <tbody>
            <StatisticLine text ="good" stats={good} />
            <StatisticLine text ="neutral" stats={neutral} />
            <StatisticLine text ="bad" stats={bad} />
            <StatisticLine text ="all" stats={sum} />
            <StatisticLine text ="average" stats={average} />
            <StatisticLine text ="positive" stats={positive} end="%" />
            </tbody>
        </table>
    </div>
    )
  }
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addToGood = () =>(
    setGood(good + 1)
  )
  const addToNeutral = () =>(
    setNeutral(neutral + 1)
  )
  const addToBad = () =>(
    setBad(bad + 1)
  )

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={addToGood} text = "good" />
      <Button handleClick={addToNeutral} text = "Neutral" />
      <Button handleClick={addToBad} text = "bad" />
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App