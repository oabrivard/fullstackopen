import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({anecdotes,points,index}) => <div>
    <div>{anecdotes[index]}</div>
    <div>has {points[index]} votes</div>
</div>

const MostVotes = ({anecdotes,points}) => {
  const max = Math.max(...points)

  if (max>0) {
    return ( 
      <div>
        <h1>Anedote with most votes</h1>
        <Anecdote anecdotes={anecdotes} points={points} index={points.indexOf(max)} />
      </div>
    )
  }

  return (
    <div/>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(props.anecdotes.length).fill(0))

  const getRandomIndex = () => Math.floor(Math.random() * Math.floor(props.anecdotes.length))
  const updatePoints = () => {
    const copy = [...points]
    copy[selected] += 1     
    setPoints(copy)
  }
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={props.anecdotes} points={points} index={selected} />
      <button onClick={() => updatePoints()}>vote</button>
      <button onClick={() => setSelected(getRandomIndex())}>next anecdote</button>
      <MostVotes anecdotes={props.anecdotes} points={points} />
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