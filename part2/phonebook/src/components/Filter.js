import React from "react";
import { Persons } from "./Persons";

export const Filter = ({ newFilter, handleFilter }) => {
    return(
        <div>
            filter shown with: <input value={newFilter} onChange={handleFilter}></input>
        </div>
    )
  }

export default Filter