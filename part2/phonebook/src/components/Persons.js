import React from "react";

const Display = ({person}) => {
    return (
        <li>{person.name} {person.number}</li>
    )
}

export const Persons = ({ persons, filter }) => {
    return (
      <ul>
        {persons
            .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
            .map(person=>(<Display key={person.name} person={person}/>))}
      </ul>
    )
}

export default Persons
