import React from "react";
export const Filter = ({newFilter,handleFilter}) =>{
    return(
        <div>
            Filter countries <input value = {newFilter} onChange={handleFilter}></input> 
        </div>
    )
}

export default Filter