import React, { useState } from 'react'
import './HistoryItem.css'
import { Button} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const HistoryItem = (props) =>{

    const [itemInfo, setItemInfo] = useState(props.itemInfo);

    return (
        <div className='history-item'>
            <div className='item-name'>{itemInfo.name}</div>
            <div className='item-count'>{itemInfo.count}</div>
        </div>
    )
}

export default HistoryItem