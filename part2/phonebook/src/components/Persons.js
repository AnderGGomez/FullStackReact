import React from "react";

const Display = ({person, toggleDeletePerson}) => {
    return (
        <li>
            {person.name} {person.number}
            <button onClick={toggleDeletePerson}>delete</button>
        </li>
    )
}

export const Persons = ({ persons, filter, deletePerson}) => {
    return (
      <ul>
        {persons
            .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
            .map(person=>(<Display key={person.name} person={person} toggleDeletePerson={()=>deletePerson(person.id)}/>))}
      </ul>
    )
}

export default Persons
