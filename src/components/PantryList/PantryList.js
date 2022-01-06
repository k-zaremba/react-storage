import React, { useState, useReducer } from 'react'
import './PantryList.css'
import PantryItem from '../PantryItem/PantryItem'

const PantryList = (props) => {
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    function handleClick() {
        console.log('calling force update. ShoppingList contents are')
        forceUpdate();
    }

    const displayPantryListContent = (elems) => {
        return elems.map((prod) => {
            return <PantryItem key={prod.name} editing={props.editing} itemInfo={prod} deletionHandler={props.deletionHandler}></PantryItem>
        })
    }

    return(
    <div>
        <button style={{height : '20px'}} onClick={() => {handleClick()}}></button>
        <button onClick={() => {console.log(props.pantryContent)}}>hahaha</button>
        {displayPantryListContent(props.pantryContent)}
    </div>          
    )
}
export default PantryList