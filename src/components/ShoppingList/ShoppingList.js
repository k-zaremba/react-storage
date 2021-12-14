import React from 'react'
import './ShoppingList.css'
import ListItem from '../ListItem/ListItem';


const ShoppingList = () =>{

    const displayShoppingListContent = (elems) => {
        return elems.map((prod) => {
            return <ListItem key={prod.name} itemInfo={prod}></ListItem>
        })
    }

    const shoppingList = [
        {name : "marchew 250g", count : 3},
        {name : "ziemniak", count : 2},
        {name : "mleko", count : 6},
        {name : "jogurt naturalny", count : 3},
        {name : "jajka 1 szt", count : 2}]

    return (
        <div>
            <div className='list-title'>Lista zakupowa</div>
            <div className='shopping-container'>
                {displayShoppingListContent(shoppingList)}
            </div>
        </div>
    )
}

export default ShoppingList