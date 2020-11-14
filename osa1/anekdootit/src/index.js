import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button =({onClick, name}) => <button onClick={onClick}> {name} </button>

const Anecdote =({votes, selected, anecdotes}) => {
  return(
  <div>
    {anecdotes[selected]}
    <br></br>
    has {votes[selected]} votes
  </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(Array(props.anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const randomNumber = () => setSelected(Math.floor(Math.random() * props.anecdotes.length))

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    const maxVotes = copy.indexOf(Math.max(...copy))

    setVote(copy)
    setMostVoted(maxVotes)
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote votes = {votes} selected = {selected} anecdotes = {props.anecdotes} />
      <Button onClick={randomNumber} name='next anecdote' />
      <Button onClick={vote} name='vote anecdote' />
      <h1>Anecdote with most votes</h1>
      <Anecdote votes = {votes} selected = {mostVoted} anecdotes = {props.anecdotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
) 