import React, { useState, useEffect } from 'react'
import './StoreItem.css'
import { Card, InputNumber, Divider } from 'antd';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';

const StoreItem = (props) => {
    const [editing, setEditing] = useState(false);
    const [dummyQuantity, setDummyQuantity] = useState(props.itemInfo.quantity);
    const [itemInfo] = useState(props.itemInfo);
    const [actions, setActions] = useState([]);

    const postChanges = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                quantity: sessionStorage.getItem(`${itemInfo.id}-add-quantity`),
                value: null
            })
        };

        fetch(`http://localhost:8080/storage/product/edit?productId=${props.itemInfo.id}`, requestOptions)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
            })
    }

    const handleAddition = () => {
        var c = sessionStorage.getItem(`${itemInfo.id}-add-quantity`);

        if (c === null) 
            return;

        if (parseInt(c) === 0) 
            return;

        postChanges();
        setDummyQuantity(parseInt(dummyQuantity) + parseInt(sessionStorage.getItem(`${itemInfo.id}-add-quantity`)));
        sessionStorage.removeItem(`${itemInfo.id}-add-quantity`);
    }

    useEffect(() => {
        setActions(defaultButton)
    }, [])

    const enterEditing = () => {
        setEditing(true)
        setActions(editingButtons)
    }

    const exitEditing = () => {
        handleAddition()
        setEditing(false)
        setActions(defaultButton)
    }

    var editingButtons = [
        <InputNumber min={-dummyQuantity} max={500} defaultValue={0} bordered={false} onChange={(v) => { sessionStorage.setItem(`${itemInfo.id}-add-quantity`, v) }} size={'small'}></InputNumber>,
        <CheckOutlined key="edit" onClick={exitEditing} />
    ]

    var defaultButton = [
        <EditOutlined key="edit" onClick={enterEditing} />
    ]

    return (
        <Card headStyle={{ fontSize: '20px', fontWeight: '400' }} className='product-editing-p' title={itemInfo.name}
            bordered={true} hoverable
            actions={actions}
        >
            <div className='img-cont'>
                <img src={itemInfo.imgUrl} width='200px' height='150px' />
            </div>
            <Divider/>
            <div className='item-info-worker'>
                ilość : {dummyQuantity}
            </div>
        </Card>
    )
}

export default StoreItem