import React, { useState, useEffect } from 'react'
import './SavedPublicList.css'
import {Card } from 'antd';

const SavedPublicList = (props) => {

    const handleClick = () => {
        props.setDrawerInfo(
            {id : props.pair.shoppingList.id,
            name : props.pair.shoppingList.nameList,
            status : props.pair.shoppingList.status,
            content : props.pair.productModelList})
        props.showDrawer()
    }

    return (
        <div className='card-saved-wrapper' onClick={handleClick}>
        <Card headStyle={{ fontSize: '20px' }} className='saved-list-t' title={props.pair.shoppingList.nameList}
            bordered={true} hoverable
        >
            <div style={{display : 'flex', justifyContent : 'flex-end', fontWeight : 400}}>
                autor : {props.pair.shoppingList.client.firstname} {props.pair.shoppingList.client.lastname}
            </div>
        </Card>
        </div>
    )
}

export default SavedPublicList