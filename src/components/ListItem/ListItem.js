import React, { useState } from 'react'
import './ListItem.css'
import { Space, Button} from 'antd';
import { PlusOutlined, MinusOutlined, CloseOutlined} from '@ant-design/icons';


const ListItem = (props) =>{
    
    const [itemInfo, setItemInfo] = useState(props.itemInfo);
    
    const incCount = () => {
        setItemInfo((itemInfo) => {
            itemInfo.count = itemInfo.count + 1;
            return itemInfo})

            // TODO : dynamiczne rerenderowanie wyswietlania liczby obiektuj
    }

    const decCount = () => {
        if(itemInfo.count > 0){
            setItemInfo((itemInfo) => {
                itemInfo.count = itemInfo.count - 1;
            return itemInfo})
        }

        if(itemInfo.count === 0)
            props.deletionHandler(itemInfo);
    }

    const resCount = () => {
        setItemInfo((itemInfo) => {
            itemInfo.count = 0;
            return itemInfo})
        props.deletionHandler(itemInfo);
    }

    return (
            <div className='shopping-list-item'>
                <div className='name'>{itemInfo.name}</div>
                <Space direction='horizontal' id="count-elem">
                    <Button type="ghost" icon={<MinusOutlined />} onClick={() => {decCount()}} size={'small'} />
                    <div>{itemInfo.count}</div>
                    <Button type="ghost" icon={<PlusOutlined />} onClick={() => {incCount(); }} size={'small'} />
                </Space>
                <div>
                <Button type="danger" icon={<CloseOutlined />} onClick={() => {resCount()}} size={'small'} />
                </div>
            </div>
    )
}

export default ListItem