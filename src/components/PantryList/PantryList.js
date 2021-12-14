import React, { useState } from 'react'
import './PantryList.css'
import PantryItem from '../PantryItem/PantryItem'

const PantryList = (props) => {
    const [content, setContent] = useState(props.pantryContent)
 
    const displayPantryListContent = (elems) => {
        return elems.map((prod) => {
            return <PantryItem editing={props.editing} itemInfo={prod}></PantryItem>
        })
    }

    return(
    <div>
        {displayPantryListContent(content)}
    </div>          
    )
}
export default PantryList