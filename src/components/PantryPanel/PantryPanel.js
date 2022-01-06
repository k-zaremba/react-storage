import React, { useState } from 'react'
import './PantryPanel.css'
import PantryCreation from '../PantryCreation/PantryCreation'

const PantryPanel = (props) => {

    // pantryContent.sort(function (a, b) {
    //     if (a.name > b.name) {
    //         return 1;
    //     }
    //     if (b.name > a.name) {
    //         return -1;
    //     }
    //     return 0;
    // });

    return(
    <div>
        <PantryCreation shopContent={props.shopContent} pantryContent={props.pantryContent} additionHandler={props.additionHandler} deletionHandler={props.deletionHandler}></PantryCreation>
    </div>          
    )
}
export default PantryPanel