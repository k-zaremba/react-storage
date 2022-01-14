import React, { useState } from 'react'
import './PaymentPanel.css'
import { Button, Divider, Card } from 'antd';
import { CreditCardFilled, ShopFilled } from '@ant-design/icons';

const PaymentPanel = (props) => {

    const postChanges = (orderId) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        fetch(`http://localhost:8080/shop/order/edit?orderId=${orderId}&statusOrder=placed&statusPayment=cashon`, requestOptions)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
            })
    }

    const changeOrderState = () => {
        var orderId = sessionStorage.getItem('activeOrderId')
        postChanges(orderId);
        sessionStorage.removeItem('activeOrderId')
        sessionStorage.removeItem('cart')
    }

    return (
        <div className='payment-panel-client'>
            <div className='payment-title-client'>
                WYBIERZ METODĘ PŁATNOŚCI
            </div>
            <Divider />
            <div className='payment-methods-client'>

                <div className='test-wrapper-payment' onClick={() => { props.setActiveWindow(5) }}>
                    <Card className='payment-option'
                        hoverable
                        bordered={true}
                        style={{ borderRadius: '60px', width: '100%' }}
                        cover={<CreditCardFilled style={{ fontSize: '200px', color: 'rgb(0,21,41)', marginTop: '30px' }} />}
                    >
                        <p style={{ height: '10px', fontSize: '40px', fontWeight: '700', textAlign: 'center' }}>KARTĄ PRZEZ INTERNET</p>
                        <Divider />
                    </Card>
            </div>

                <div className='test-wrapper-payment' onClick={() => { changeOrderState(); props.setActiveWindow(7) }}>
                    <Card className='payment-option'
                        hoverable
                        bordered={true}
                        style={{ borderRadius: '60px', width: '100%' }}
                        cover={<ShopFilled style={{ fontSize: '200px', color: 'rgb(0,21,41)', marginTop: '30px' }} />}
                    >
                        <p style={{ height: '10px', fontSize: '40px', fontWeight: '700', textAlign: 'center' }}>GOTÓWKĄ PRZY ODBIORZE</p>
                        <Divider />
                    </Card>
                </div>

            </div>


        </div>
    )
}
export default PaymentPanel