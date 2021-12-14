import React, { useState } from 'react'
import './PantryPanel.css'
import PantryCreation from '../PantryCreation/PantryCreation'

const PantryPanel = (props) => {

    const [shopContent, setShopContent] = useState(props.content)

    const pantryContent = [
        {name : "masło", count : 3},
        {name : "bułka", count : 2},
        {name : "cebula", count : 2},
        {name : "marchew 250g", count : 2},
        {name : "szynka 200g", count : 2},
        {name : "ketchup", count : 2},
        {name : "ryż biały", count : 2},
        {name : "sól 1kg", count : 2},
        {name : "ziemniak", count : 2},
        {name : "mleko", count : 6},
        {name : "jogurt naturalny", count : 2}]
    
    return(
    <div>
        <PantryCreation shopContent={shopContent} pantryContent={pantryContent}></PantryCreation>
    </div>          
    )
}
export default PantryPanel