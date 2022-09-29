import React from "react";

export const Filter = ({ newFilter, handleFilter }) => {
    return(
        <div>
            filter shown with: <input value={newFilter} onChange={handleFilter}></input>
        </div>
    )
  }

export default Filter