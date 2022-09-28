import React from "react";

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(
                part =>(
                <Part key={part.id} part={part} />
                )
            )}
        </div>
    )

}

const Total = ({parts}) => {
    const sum = parts.map(part => part.exercises).reduce(
        (previous, current) => previous + current
    )
    return (
        <p><b>Total of exercises {sum}</b></p>
    )
}

export const Course = ({course}) => {
    const {id, name, parts} = course
    return (
        <div>
            <Header course={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    )
}