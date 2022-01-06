import React, { useState } from 'react'
import './StoreItem.css'
import { Space, Button} from 'antd';
import { PlusOutlined, MinusOutlined, CheckOutlined } from '@ant-design/icons';

const StoreItem = (props) =>{

    const [count, setCount] = useState(0);
    const [itemInfo, setItemInfo] = useState(props.itemInfo);

    return (
        <Space direction='vertical' >
            <img src={itemInfo.imgUrl} width='200px' height='150px'/>
            <div className='item-info'>{itemInfo.name}</div>
            <div className='item-info'>{itemInfo.value.toLocaleString(
                undefined, // leave undefined to use the visitor's browser 
                        // locale or a string like 'en-US' to override it.
                { minimumFractionDigits: 2 }
            )} PLN</div>

            <div className='item-count-add'>
                <Space direction='horizontal'>
                    <Button type="primary" icon={<MinusOutlined />} onClick={() => {if(count > 0) setCount(count - 1)}} size={'small'} />
                    <div>{count}</div>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => {setCount(count + 1)}} size={'small'} />
                </Space>
                <div>
                <Button type="primary" icon={<CheckOutlined />} onClick={() => {setCount(0); props.additionHandler(itemInfo, count)}} size={'small'} />
                </div>
            </div>
        </Space>
    )
}

export default StoreItem