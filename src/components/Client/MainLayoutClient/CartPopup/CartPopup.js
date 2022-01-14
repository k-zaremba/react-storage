import React, { useState } from 'react'
import './CartPopup.css'
import { Spin, Tag } from 'antd';
import cart from '../../../../cart';

const CartPopup = (props) => {
    const [spinner, setSpinner] = useState(false)

    var data;

    const isUserRegular = () => {
        var item = sessionStorage.getItem('user')
        var user = item ? JSON.parse(item) : {}

        if (user.client.isRegular)
            return true;
        else return false;
    }

    const getShoppingListValue = () => {
        var item = sessionStorage.getItem('user')
        var user = item ? JSON.parse(item) : {}

        var value = 0;
        var shoppingListContent = cart.getProducts();

        for (var id in shoppingListContent) {
            value += shoppingListContent[id].price * shoppingListContent[id].quantity;
        }

        if (user.client.isRegular)
            value = value * 0.8;

        return value;
    }

    return (
        <div>
            {cart.isNotEmpty() &&
                <>
                    {!spinner && isUserRegular() && <div className='payment-box-popup'>
                        <div className='payment-amount-popup'> {'ILOŚĆ PRODUKTÓW: ' + cart.getListProductsAmount()}</div>
                        <div className='payment-popup'>
                            <div className='summary-popup'>
                            </div>
                            <div className='summary-popup-sum'>
                                {'SUMA: ' + parseFloat(getShoppingListValue()).toFixed(2)} zł
                            </div>
                            <Tag style={{ fontSize: '15px' }} color="geekblue">-20%</Tag>
                        </div>
                    </div>}

                    {!spinner && !isUserRegular() && <div className='payment-box-popup'>
                    <div className='payment-amount-popup'> {'ILOŚĆ PRODUKTÓW: ' +cart.getListProductsAmount()}</div>
                        <div className='payment-popup'>
                            <div className='summary-popup'>
                            </div>
                            <div className='summary-popup-sum'>
                                {'SUMA: ' + parseFloat(getShoppingListValue()).toFixed(2)} zł
                            </div>
                        </div>
                    </div>}

                    {spinner &&
                        <div style={{ textAlign: 'right', marginRight: '70px', marginTop: '70px' }}>
                            <Spin />
                        </div>
                    }

                </>
            }
        </div>
    )
}

export default CartPopup