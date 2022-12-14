import { useDispatch } from 'react-redux'
import useField from '../../hooks/useField'
import { createComment } from '../../reducers/blogReducer'
import React from 'react'
import { TextInput } from '../estilos'

const CommentForm = ({ idBlog }) => {
  const { clear: clearContent, ...content } = useField('text')
  const dispatch = useDispatch()

  const clear = () => {
    clearContent()
  }
  const addComment = (event) => {
    event.preventDefault()
    const comment = {
      content: content.value
    }
    dispatch(createComment(idBlog, comment))
    clear()
  }
  return (
    <div>
      <form onSubmit={addComment}>
        <div>
          <TextInput placeholder='Realiza un comentario'{...content} />
          <button type="submit">Comentar</button>
        </div>
      </form>
    </div>
  )
}

export default CommentForm