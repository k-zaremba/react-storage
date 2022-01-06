import React, {useState, useReducer } from 'react'
import './ShoppingList.css'
import ListItem from '../ListItem/ListItem';


const ShoppingList = (props) =>{

    const displayShoppingListContent = (elems) => {
        return elems.map((prod) => {
            console.log('disp shopp list called')
            return <ListItem key={prod.name} itemInfo={prod} deletionHandler={props.deletionHandler}></ListItem>
        })
    }

    return (
        <div>
            <div className='list-title'>Lista zakupowa</div>
            <div className='shopping-container'>
                {displayShoppingListContent(props.content)}
            </div>
        </div>
    )
}

export default ShoppingList