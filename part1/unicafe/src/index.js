import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({name}) => <h1>{name}</h1>
const Button = ({clickHandler,text}) => <button onClick={clickHandler}>{text}</button>
const Statistic = ({text,value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({good,neutral,bad}) => {
  if (good+neutral+bad === 0) {
    return (<div>No feedback given</div>)
  }

  return (
    <table>
      <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={good + neutral + bad} />
          <Statistic text="average" value={(good - bad) / (good + neutral + bad)} />
          <Statistic text="positive" value={(good * 100 / (good + neutral + bad)).toString() + "%"} />
        </tbody>
    </table>
  )
}

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)