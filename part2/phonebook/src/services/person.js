import axios from "axios";
const baseURL = 'http://localhost:3001/persons'

const getAll = () =>{
    return axios
    .get(baseURL)
    .then(response => response.data)
}

const addPerson = (personObject) =>{
    return axios
    .post(baseURL,personObject)
    .then(response=>response.data)
}

const updatePerson = (id, personObject) => {
    return axios
    .put(`${baseURL}/${id}`,personObject)
    .then(response => response.data)
}

const deletePerson = (id)=>{
    return axios
    .delete(`${baseURL}/${id}`)
}

export default {getAll, addPerson, deletePerson, updatePerson}