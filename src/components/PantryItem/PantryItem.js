import React, { useState } from 'react'
import './PantryItem.css'
import { Space, Button} from 'antd';
import { PlusOutlined, MinusOutlined, CloseOutlined} from '@ant-design/icons';


const PantryItem = (props) => {
    const [itemInfo, setItemInfo] = useState(props.itemInfo);
    const [count, setCount] = useState(props.itemInfo.count);
    const [editing, setEditing] = useState(props.editing)

    return(
    <div className='pantry-item'>
        <img src={itemInfo.img_url} width={"50px"}></img>
        <div className='pantry-name'>{itemInfo.name}</div>
            <div style={{fontSize: '20px'}}>{count}</div>

            {
            editing && 
            <div style={{display : 'flex'}}>
                <Space direction='horizontal' id="count-elem">
                    <Button type="ghost" icon={<MinusOutlined />} onClick={() => {if(count > 0) setCount(count - 1)}} size={'small'} />
                    <Button type="ghost" icon={<PlusOutlined />} onClick={() => {setCount(count + 1)}} size={'small'} />
                </Space>
                <div>
                <Button type="danger" icon={<CloseOutlined />} onClick={() => {setCount(0)}} size={'small'} />
                </div>
            </div>
            }
    </div>          
    )
}
export default PantryItem