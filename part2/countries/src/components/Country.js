import axios from "axios";
import React, { useEffect, useState } from "react";

export const Country = ({country}) => {
    const [currentWeather, setCurrentWeather] = useState(undefined)
    const apiKey =  process.env.REACT_APP_API_KEY;

    const weatherHook = () =>{
        axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.name.common}`)
        .then(response => {
            setCurrentWeather(response.data)})
    }
    useEffect(weatherHook,[])

    if(currentWeather){
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital {country.capital}</p>
                <p>Population {country.population}</p>
                <h2>Language</h2>
                <ul>
                    {
                        Object.values(country.languages)
                            .map(element =>
                                <li key={element}>{element}</li>
                            )
                    }
                </ul>
                <img src={country.flags.png}></img>
                <h2>Weather in {country.capital}</h2>
                <p>Temperature: {currentWeather.current.temperature}</p>
                <img src={currentWeather.current.weather_icons}></img>
                <p>Wind: {currentWeather.current.wind_speed} mph, direction {currentWeather.current.wind_dir}</p>
            </div>
        )
    }else{
        <div>
                <h1>{country.name.common}</h1>
                <p>Capital {country.capital}</p>
                <p>Population {country.population}</p>
                <h2>Language</h2>
                <ul>
                    {
                        Object.values(country.languages)
                            .map(element =>
                                <li key={element}>{element}</li>
                            )
                    }
                </ul>
                <img src={country.flags.png}></img>
                <h2>Weather in {country.capital}</h2>
                <p>Ho hay datos</p>
            </div>
    }
}


export default Country