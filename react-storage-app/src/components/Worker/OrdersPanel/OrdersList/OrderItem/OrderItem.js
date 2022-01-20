import React, { useState } from 'react'
import './OrderItem.css'

const OrderItem = (props) =>{

    return (
        <div className='order-history-item'>
            <div className='order-item-name'>{props.itemInfo.product.name}</div>
            <div className='order-item-count'>{props.itemInfo.quantity}</div>
        </div>
    )
}

export default OrderItem