import React, { useState } from 'react'
import './PaymentPanel.css'
import { Button } from 'antd';

const PaymentPanel = (props) => {

    return(
    <div className='payment-panel'>
        <div className='payment-title'>
            WYBIERZ METODĘ PŁATNOŚCI
        </div>
        <div className='payment-methods'>
            <Button type="primary" shape="round" size={'large'} id='payment-btn' onClick={() => {props.setOption(7)}}>
                        KARTA
            </Button>
            <Button type="primary" shape="round" size={'large'} id='payment-btn' onClick={() => {props.setOption(8)}}>
                        GOTÓWKA
            </Button>
        </div>
    </div>          
    )
}
export default PaymentPanel