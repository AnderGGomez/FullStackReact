import { useState, useEffect } from 'react'
import CountryForm from './component/CountryForm'
import useCountry from './hooks/useCountry'
import Country from './component/Country'

const App = () => {
  const [name, setName] = useState('')
  const country = useCountry(name)
  console.log(country, name)

  const changeName = (nameInput) => {
    setName(nameInput)
  } 
  
  return (
    <div>
      <CountryForm changeName={changeName}/>
      <Country country={country} />
    </div>
  )
}

export default App
