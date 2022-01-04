import React, { useState } from 'react'
import './PantryItem.css'
import { Space, Button} from 'antd';
import { PlusOutlined, MinusOutlined, CloseOutlined} from '@ant-design/icons';


const PantryItem = (props) => {
    const [itemInfo, setItemInfo] = useState(props.itemInfo);
    const [count, setCount] = useState(props.itemInfo.count);

    const incCount = () => {
        setItemInfo((info) => {
            info.count = info.count + 1;
            return info})
            // TODO : dynamiczne rerenderowanie wyswietlania liczby obiektuj
    }

    const decCount = () => {
        if(itemInfo.count > 0){
            setItemInfo((info) => {
            info.count = info.count - 1;
            return info})
        }
    }

    return(
    <div className='pantry-item'>
        <img src={itemInfo.img_url} width={"80px"}></img>
        <div className='pantry-name'>{itemInfo.name}</div>
            <div style={{fontSize: '20px'}}>{itemInfo.count}</div>

            {
            !props.editing && 
            <div className='count-edit-spaceholder'>
                
            </div>
            }

            {
            props.editing && 
            <div className='count-edit-el'>
                <Space direction='horizontal' id="count-elem">
                    <Button type="ghost" icon={<MinusOutlined />} onClick={() => {decCount()}} size={'small'} />
                    <Button type="ghost" icon={<PlusOutlined />} onClick={() => {incCount()}} size={'small'} />
                </Space>
                <div>
                <Button type="danger" icon={<CloseOutlined />} onClick={() => {setCount(0); console.log(itemInfo); props.deletionHandler(itemInfo)}} size={'small'} />
                </div>
            </div>
            }
    </div>          
    )
}
export default PantryItem