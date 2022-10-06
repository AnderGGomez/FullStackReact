import React from "react";

/*
const Display = ({ country }) => {
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
        </div>
    )
}

const DisplayList = ({ countries}) => {
    const [show, setShow] = useState(false)

    const handleShowChange = () =>{
        setShow(!show)
    }

    return (
        <ul>
            {countries.map(country =>
                (<li key={country.name.common}>{country.name.official} <button value={country} onClick={handleShowChange}>{ !show ? 'show':'hide'}</button>
                </li>)
            )
            }
        </ul>
    )
}

const Validate = ({ countriesFilter }) => {
    const tam = countriesFilter.length
    if (tam > 10) {
        return (
            <p>Demasiados paises, se mas especifico</p>
        )
    } else if (tam > 1 && tam <= 10) {
        return (
            <DisplayList countries={countriesFilter} />
        )
    } else if (tam === 1) {
        const [country] = countriesFilter
        return (
            <Display country={country} />
        )
    } else {
        return(
            <p>Nada para mostrar</p>
        )
        
    }
}
*/
export const Country = ({country}) => {
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
        </div>
    )
}


export default Country