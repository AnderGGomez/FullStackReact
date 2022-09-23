import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Display = ({text}) =>{
  return(
    <p>{text}</p>
  )
}
const Static =({text, count})=>{
  return (
    <tr>
      <td>{text}</td> 
      <td>{count}</td>
    </tr>
  )
}

const Statitcs = ({ good, neutral, bad }) => {
  if (good + neutral + bad > 0) {
    return (
      <table>
        <tbody>
        <Static text="good" count={good} />
        <Static text="neutral" count={neutral} />
        <Static text="bad" count={bad} />
        <Static text="all" count={good + neutral + bad} />
        <Static text="average" count={(good - bad) / (good + neutral + bad)} />
        <Static text="positive" count={(good * 100) / (good + neutral + bad) + " %"} />
        </tbody>
      </table>
    )
  }
  return (
    <div>
      <Display text="No feedback given"></Display>
    </div>
  )
}



const Header =({title}) =>{
  return (
    <h1>{title}</h1>
  )
}
const Button = ({handleClick,text}) =>{
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  const titles = {
    button: 'Give feedback',
    statistics: 'statistics'
  }
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <Header title={titles.button}/>
      <Button handleClick={increaseGood} text="good"/>
      <Button handleClick={increaseNeutral} text="neutral"/>
      <Button handleClick={increaseBad} text="bad"/>
      <Header title={titles.statistics} />
      <Statitcs good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)