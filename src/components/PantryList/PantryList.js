import React, { useState } from 'react'
import './PantryList.css'
import PantryItem from '../PantryItem/PantryItem'

const PantryList = (props) => {
    const [content, setContent] = useState(props.pantryContent)
 
    const displayPantryListContent = (elems) => {
        return elems.map((prod) => {
            return <PantryItem editing={props.editing} itemInfo={prod} deletionHandler={listHandleDeletion}></PantryItem>
        })
    }

    const listHandleDeletion = (prod) => {
        setContent(content.filter((elem) => { return elem.name !== prod.name }))
    }

    return(
    <div>
        <button onClick={() => {console.log(content)}}>hahaha</button>
        {displayPantryListContent(content)}
    </div>          
    )
}
export default PantryList