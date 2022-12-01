import { useState } from "react"

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clear = () =>{
    if(type==='text'){
      setValue('')
    }
  }

  return {
    type,
    value,
    onChange,
    clear
  }
}

export default useField