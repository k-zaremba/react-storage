import React, {useState, useReducer } from 'react'
import './ShoppingList.css'
import ListItem from '../ListItem/ListItem';
import { Button } from 'antd';


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
            
            {props.content.length > 0 && 
                <div className='payment'>
                    <div className='summary'>
                        {Math.floor(Math.random() * (80 - 20)) + 20} PLN
                    </div>
                    <Button type="primary" shape="round" size={'large'} onClick={() => {props.setOption(6)}}>
                        Płatność
                    </Button>
                </div>
            }
        </div>
    )
}

export default ShoppingList