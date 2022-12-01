import { useState, useEffect } from "react"
import axios from "axios"

const useCountry = (name) =>{
  const [country, setCountry] = useState(null)
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      setCountry(response.data.pop())
    }
    fetchData()
  },[name])
  return country
}

export default useCountry