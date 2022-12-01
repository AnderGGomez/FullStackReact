import React from "react"
import { useNavigate } from "react-router-dom"
import useField  from "../hooks/useField"

const CreateNew = (props) => {
  const navigate = useNavigate()

  const {clear: clearContent, ...content}  = useField('text')
  const {clear: clearAuthor, ...author} = useField('text')
  const {clear: clearInfo, ...info} = useField ('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    const anecdoteObj = {
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    }
    props.addNew(anecdoteObj)
    navigate('/anecdotes')
  }

  const reset = () => {
    clearContent()
    clearAuthor()
    clearInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content}/>
          {/*<input name='content' value={content} onChange={(e) => setContent(e.target.value)} />*/}
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info}/>
        </div>
        <button type="submit">create</button>
        <button type="reset" onClick={()=>reset()}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew