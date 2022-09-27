import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Display = ({ anecdotes, votes }) => {
  const maxVote = Math.max(...votes)
  const index = votes.indexOf(maxVote)
  const anecdote = anecdotes[index]
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {maxVote} votes</p>
    </div>
  )
}
const Title = ({ title }) => <h1>{title}</h1>

const Button = ({ handlerClick, text }) => <button onClick={handlerClick}>{text}</button>

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])
  const titles = { title: "Anecdote of the day", votes: "Anecdote with most votes" }

  const generateNum = () => setSelected(Math.floor(Math.random() * props.anecdotes.length))
  const addVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <Title title={titles.title} />
      <p>{props.anecdotes[selected]}</p>
      <Button handlerClick={generateNum} text="next anecdote" />
      <Button handlerClick={addVote} text="vote" />
      <Title title={titles.votes} />
      <Display anecdotes={props.anecdotes} votes={votes} />
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