import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'
import Blog from './Blog'

test('renders basic content to blog', () => {
  const blog = {
    title: 'Prueba 1',
    author:'Bill Cosby',
    url:'www.google.com',
    likes:'1',
    user: {
      name:'name 1'
    }
  }

  const user = {
    name: 'name 2'
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const element = component.container.querySelector('.extra')
  expect(element).toBeNull()

})

test('clicking the button to exta content', () => {
  const blog = {
    title: 'Prueba 1',
    author:'Bill Cosby',
    url:'www.google.com',
    likes:'1',
    user: {
      name:'name 1'
    }
  }

  const user = {
    name : 'name 2'
  }

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  const button = component.getByText('show')
  fireEvent.click(button)

  const extraElement = component.container.querySelector('.extra')
  expect(extraElement).toBeDefined()

})

test('Clicking to like button', () => {
  const blog = {
    title: 'Prueba 1',
    author:'Bill Cosby',
    url:'www.google.com',
    likes:'1',
    user: {
      name:'name 1'
    }
  }

  const user = {
    name : 'name 2'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} handleUpdateBlog={mockHandler} />
  )

  const visibleButton = component.getByText('show')
  fireEvent.click(visibleButton)

  const likeButton = component.getByText('Like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})