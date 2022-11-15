import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'
import BlogForm from './BlogForm'

test('<BlogForm /> submit form', () => {
  const handleAddBlog = jest.fn()

  const component = render(
    <BlogForm handleAddBlog={handleAddBlog} />
  )

  const inputTitle = component.container.querySelector('#title')
  const inputAuthor = component.container.querySelector('#author')
  const inputURL = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle, {
    target : { value: 'God of War Final' }
  })

  fireEvent.change(inputAuthor, {
    target : { value: 'elxokas' }
  })

  fireEvent.change(inputURL, {
    target : { value : 'twitch.tv/elxokas' }
  })

  fireEvent.submit(form)

  const expectObjet = {
    title: 'God of War Final',
    author: 'elxokas',
    url: 'twitch.tv/elxokas'
  }
  expect(handleAddBlog.mock.calls).toHaveLength(1)
  expect(handleAddBlog.mock.calls[0][0]).toEqual(expectObjet)
})