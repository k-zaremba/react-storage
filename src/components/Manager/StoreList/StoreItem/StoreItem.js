import React, { useState, useEffect } from 'react'
import './StoreItem.css'
import { Space, Button, Divider } from 'antd';
import { Input, Card} from 'antd';
import { EditOutlined, CheckOutlined, DeleteOutlined} from '@ant-design/icons';

const StoreItem = (props) => {

    const [itemInfo, setItemInfo] = useState(props.itemInfo);
    const [editing, setEditing] = useState(false);
    const [dummyPrice, setDummyPrice] = useState(props.itemInfo.value.toLocaleString(
        undefined, { minimumFractionDigits: 2 }));
    const [actions, setActions] = useState([]);


    const deleteProduct = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        fetch(`http://localhost:8080/shop/product/delete?productId=${props.itemInfo.id}`, requestOptions)
    }

    const postChanges = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                quantity: null,
                value: sessionStorage.getItem(`${itemInfo.id}-new-price`)
            })
        };

        fetch(`http://localhost:8080/shop/product/edit?productId=${props.itemInfo.id}`, requestOptions)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
            })
    }

    const editProductPrice = () => {
        if (sessionStorage.getItem(`${itemInfo.id}-new-price`) === null) 
            return

        postChanges();
        setDummyPrice(sessionStorage.getItem(`${itemInfo.id}-new-price`))
        sessionStorage.removeItem(`${itemInfo.id}-new-price`)
    }

    const delProduct = () => {
        deleteProduct();
        sessionStorage.removeItem(`${itemInfo.id}-new-price`)
        props.forceUpdate();
    }

    const getItemPriceFormatted = (val) => {
        return val.toLocaleString(
            undefined, { minimumFractionDigits: 2 });
    }    

    const enterEditing = () => {
        setEditing(true)
        setActions(editingButton)
    }

    const editOnExit = () => {
        editProductPrice()
        cancelEditing();
    }

    const deleteOnExit = () => {
        delProduct();
        cancelEditing();
    }
    
    const cancelEditing = () => {
        setEditing(false)
        sessionStorage.removeItem(`${itemInfo.id}-new-price`)
        setActions(defaultButton)
    }

    useEffect(() => {
        setActions(defaultButton) 
    }, [])

        
    var editingButton = [
        <DeleteOutlined key="edit" onClick={deleteOnExit}/>,
        <EditOutlined key="edit" onClick={cancelEditing} />,
        <CheckOutlined key="edit" onClick={editOnExit}/>
    ]

    var defaultButton = [
        <EditOutlined key="edit" onClick={enterEditing} />
    ]

    const onPriceChange = (e) =>{
        const re = /^-?\d*[.,]?\d{0,2}$/;

        if (e.target.value === '' || re.test(e.target.value)) {
            console.log(e.target.value)
            setDummyPrice(e.target.value)
            sessionStorage.setItem(`${itemInfo.id}-new-price`, e.target.value);
        }

    }

    console.log(getItemPriceFormatted(parseFloat(props.itemInfo.value)))

    return (
        <>
        <Card headStyle={{ fontSize: '20px', fontWeight : '400' }} className='product-editing-p' title={itemInfo.name}
        bordered={true} hoverable
        actions={actions}
        >
            <div style={{marginBottom : 10}} className='img-cont'>
            <img src={itemInfo.imgUrl} width='200px' height='150px'/>
            <Divider/>

            </div>
                {!editing &&
                    <div className='editing-price'>
                        <Input disabled style={{ textAlign: 'center', fontSize : 20, fontWeight : 100 }} bordered={false} id="price-input" defaultValue={getItemPriceFormatted(parseFloat(dummyPrice).toFixed(2))}></Input>
                        <div className='item-info-man-disabled' style={{ color: '#bfbfbf', fontSize : 20, fontWeight : 100 }}>zł </div>
                    </div>
                }

                {editing &&
                    <div className='editing-price'>
                        <Input id="price-input" style={{ borderBottom: 'solid 1px #8ca7bf', textAlign: 'center', fontSize : 20, fontWeight : 100 }} bordered={false} value={dummyPrice} defaultValue={getItemPriceFormatted(parseFloat(props.itemInfo.value).toFixed(2)).toString()}
                            onChange={(e) => {onPriceChange(e); }}></Input>
                        <div className='item-info-man' style={{ fontSize : 20, fontWeight : 100 }}>zł </div>
                    </div>
                }
            </Card>
        </>
    )
}

export default StoreItem