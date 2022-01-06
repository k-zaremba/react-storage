import React, {useState, useReducer } from 'react'
import './ShoppingList.css'
import ListItem from '../ListItem/ListItem';


const ShoppingList = (props) =>{
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    function handleClick() {
        console.log('calling force update. ShoppingList contents are')
        forceUpdate();
    }

    const displayShoppingListContent = (elems) => {
        return elems.map((prod) => {
            console.log('disp shopp list called')
            return <ListItem key={prod.name} itemInfo={prod} deletionHandler={props.deletionHandler}></ListItem>
        })
    }

    return (
        <div>
            <button style={{height : '20px'}} onClick={() => {handleClick()}}></button>
            <div className='list-title'>Lista zakupowa</div>
            <div className='shopping-container'>
                {displayShoppingListContent(props.content)}
            </div>
        </div>
    )
}

export default ShoppingList