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
        const filter = event.target.value
        setFilterCountries(allCountries.filter(country =>
            country.name.official.toLowerCase().includes(filter.toLowerCase())
        ))
        setFilter(filter)
    }

    return (
        <div>
            {newFilter}
            <Filter filter={newFilter} handleFilter={handleFilterChange} />
            <List countries={filterCountries} setFilterCountries={setFilterCountries}/>
        </div>
    )

}

export default App;