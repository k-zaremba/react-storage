import React, { useState } from 'react'
import './ListItem.css'
import { Space, Button} from 'antd';
import { PlusOutlined, MinusOutlined, CloseOutlined} from '@ant-design/icons';


const ListItem = (props) =>{
    
    const [itemInfo, setProdName] = useState(props.itemInfo);
    const [count, setCount] = useState(props.itemInfo.count);


    return (
            <div className='shopping-list-item'>
                <div className='name'>{itemInfo.name}</div>
                <Space direction='horizontal' id="count-elem">
                    <Button type="ghost" icon={<MinusOutlined />} onClick={() => {if(count > 0) setCount(count - 1)}} size={'small'} />
                    <div>{count}</div>
                    <Button type="ghost" icon={<PlusOutlined />} onClick={() => {setCount(count + 1)}} size={'small'} />
                </Space>
                <div>
                <Button type="danger" icon={<CloseOutlined />} onClick={() => {setCount(0)}} size={'small'} />
                </div>
            </div>
    )
}

export default ListItem