import React, { useState, useReducer } from 'react'
import './PantryList.css'
import PantryItem from '../PantryItem/PantryItem'

const PantryList = (props) => {
    const [force, forceUpdate] = useReducer(x => x + 1, 0);

    function handleClick() {
        console.log('calling force update. Im only updating')
        forceUpdate();
    }

    const displayPantryListContent = (elems) => {
        return elems.map((prod) => {
            return <PantryItem forceUpdate={forceUpdate} key={prod.name} editing={props.editing} itemInfo={prod} deletionHandler={props.deletionHandler}></PantryItem>
        })
    }

    return(
    <div>
        {displayPantryListContent(props.pantryContent)}
    </div>          
    )
}
export default PantryList