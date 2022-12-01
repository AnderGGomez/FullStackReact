import { useState } from "react"
import useField from "../hooks/useField"

const CountryForm = (props) => {
  const nameInput = useField('text')

  const fetch = (e) => {
    e.preventDefault()
    props.changeName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
    </div>
  )
}

export default CountryForm