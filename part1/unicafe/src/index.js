import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({name}) => <h1>{name}</h1>
const Button = ({clickHandler,text}) => <button onClick={clickHandler}>{text}</button>
const Counter = ({text,count}) => <div>{text} {count}</div>
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header name="give feedback" />
      <Button clickHandler={() => setGood(good + 1)} text="good" />
      <Button clickHandler={() => setNeutral(neutral + 1)} text="neutral" />
      <Button clickHandler={() => setBad(bad + 1)} text="bad" />
      <Header name="statistics" />
      <Counter text="good" count={good} />
      <Counter text="neutral" count={neutral} />
      <Counter text="bad" count={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)