import React, { useState, useEffect } from 'react'
import './StoreItem.css'
import { Rate, Card, Input } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import cart from '../../../../cart';

const StoreItem = (props) => {

    const [, setRated] = useState(false);
    const [itemInfo,] = useState(props.itemInfo);
    const [actions, setActions] = useState([]);

    const rateProduct = (val) => {
        saveRateToStorage();
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        fetch(`http://localhost:8080/shop/product/rate?productId=${itemInfo.id}&rate=${val}`, requestOptions)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
            })
    }


    const modifyCart = (val) => {
        cart.updateProduct(itemInfo, val)
        props.forceShoppingListUpdate();
    }

    const numInCart = () => {
        var products = cart.getProducts()

        if (products == null)
            return 0;

        if (products[itemInfo.id] == null) {
            return 0;
        }

        return products[itemInfo.id].quantity;
    }

    const isOutOfStock = () => {
        if (itemInfo.quantity == 0)
            return true;

        var products = cart.getProducts()

        if (products == null)
            return false;

        if (products[itemInfo.id] == null) {
            return false;
        }

        if (products[itemInfo.id].quantity == itemInfo.quantity)
            return true;
    }

    const saveRateToStorage = () => {
        var rated = JSON.parse(sessionStorage.getItem("rated"));
        if (rated === null) rated = {};

        var itemId = itemInfo.id;

        if (rated[itemId] == null) {
            rated[itemId] = true;
        }

        sessionStorage.setItem("rated", JSON.stringify(rated));
    }

    const isRated = () => {
        var rated = JSON.parse(sessionStorage.getItem("rated"));
        if (rated === null) return false;

        var itemId = itemInfo.id;

        if (rated[itemId] == null)
            return false;

        return true;
    }

    useEffect(() => {


        if (cart.contains(itemInfo)) {
            if (isOutOfStock()) {
                setActions([
                    <MinusOutlined style={{ fontSize: '25px' }} key="edit" onClick={() => { modifyCart(-1); }} />,
                    <div style={{ justifyContent: 'center', fontSize: '17px', display: 'flex', alignItems: 'center' }}>{numInCart()}</div>,
                    <Input defaultValue={'brak'} style={{ textAlign: 'center', height: '28px' }} disabled bordered={false} size={'medium'}></Input>,
                ])
                return;
            }

            setActions([
                <MinusOutlined style={{ fontSize: '25px' }} key="edit" onClick={() => { modifyCart(-1); }} />,
                <div style={{ justifyContent: 'center', fontSize: '17px', display: 'flex', alignItems: 'center' }}>{numInCart()}</div>,
                <PlusOutlined style={{ fontSize: '25px' }} key="edit" onClick={() => { modifyCart(1); }} />
            ])
            return;
        }

        if (isOutOfStock()) {
            setActions([
                <Input defaultValue={'produkt niedostępny'} style={{ textAlign: 'center' }} disabled bordered={false} size={'medium'}></Input>,
            ])
            return;
        }

        setActions([
            <PlusOutlined style={{ fontSize: '25px' }} key="edit" onClick={() => { modifyCart(1); }} />,
        ])


    }, [props.forceShoppingList])


    return (
        <Card className='shop-prod-t'
            bordered={true}
            actions={actions}
        >

            <img src={itemInfo.imgUrl} width='200px' height='150px' />
            <div className='item-info' style={{ marginTop: "10px" }}>{itemInfo.name}</div>
            <div className='item-info'>{itemInfo.value.toLocaleString(undefined, { minimumFractionDigits: 2 })} zł</div>
            {
                !isRated() &&
                <div className='item-rating'>
                    <Rate allowHalf style={{ fontSize: "25px" }} defaultValue={itemInfo.score} allowClear={false} onChange={(val) => { rateProduct(val); setRated(true) }}></Rate>
                </div>
            }

            {
                isRated() &&
                <div className='item-rating-rated'>
                    <div style={{ fontSize: "19px", marginTop: '9px' }}>Dziękujemy za ocenę!</div>
                </div>
            }
        </Card>
    )

}

export default StoreItem