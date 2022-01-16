import React, { useState, useEffect } from 'react'
import './SavedList.css'
import { Divider, BackTop, } from 'antd';
import { Input, Space } from 'antd';
import { Button, Select, Carousel, Spin, Card } from 'antd';
import { UpCircleFilled, } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;


const SavedList = (props) => {

    const handleClick = () => {
        console.log(props.pair.productModelList)
        props.setDrawerName(props.pair.shoppingList.nameList)
        props.setDrawerContent(props.pair.productModelList)
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