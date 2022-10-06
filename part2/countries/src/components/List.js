import React from "react";
import Country from "./Country";

export const List = ({countries, handleCountriesFilter}) => {

    const tam = countries.length
    if (tam > 10) {
        return (
            <p>Demasiados paises, se mas especifico</p>
        )
    } else if (tam > 1 && tam <= 10) {
        return (
            <ul>
            {countries.map(country =>
                (<li key={country.name.common}>{country.name.official} <button onClick={()=>{handleCountriesFilter([country])}}>show</button>
                </li>)
            )
            }
        </ul>
        )
    } else if (tam === 1) {
        const [country] = countries
        return (
            <Country country={country} />
        )
    } else {
        return(
            <p>Nada para mostrar</p>
        )
        
    }
}

export default List;