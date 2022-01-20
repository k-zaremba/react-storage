import React, { useState, useEffect } from 'react'
import './SavedList.css'
import { Card } from 'antd';

const SavedList = (props) => {

    const handleClick = () => {
        props.setDrawerInfo(
            {
                id: props.pair.shoppingList.id,
                name: props.pair.shoppingList.nameList,
                status: props.pair.shoppingList.status,
                content: props.pair.productModelList
            })
        props.showDrawer()
    }

    return (
        <div className='card-saved-wrapper' onClick={handleClick}>

            <Card headStyle={{ fontSize: '20px' }} className='saved-list-t' title={props.pair.shoppingList.nameList}
                bordered={true} hoverable
            >
            </Card>
        </div>
    )
}

export default SavedList