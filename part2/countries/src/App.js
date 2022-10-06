import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import List from "./components/List";

export const App = () => {
    const [allCountries, setAllCountries] = useState([])
    const [filterCountries, setFilterCountries] = useState([])
    const [newFilter, setFilter] = useState('')

    const hook = () => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(respose => {
                const countries = respose.data;
                setAllCountries(countries);
            })
    }

    useEffect(hook, []);

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
        handleCountriesFilter(allCountries.filter(country =>
            country.name.official.toLowerCase().includes(event.target.value.toLowerCase())
        ))
    }

    const handleCountriesFilter = (countries) =>{
        setFilterCountries(countries)
    }
    return (
        <div>
            <Filter filter={newFilter} handleFilter={handleFilterChange} />
            <List countries={filterCountries} handleCountriesFilter={handleCountriesFilter} filter={newFilter}/>
        </div>
    )

}

export default App;