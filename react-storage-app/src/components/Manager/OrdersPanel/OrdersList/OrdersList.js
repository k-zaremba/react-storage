import React, { useState } from 'react'
import './OrdersList.css'
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import OrderItem from './OrderItem/OrderItem';
const { Panel } = Collapse;

const OrdersList = (props) => {
    const displayOrdersListContent = (elems) => {
        return elems.map((prod) => {
            return <OrderItem key={prod.name} itemInfo={prod}></OrderItem>
        })
    }

    const getDefaultOrderStatus = (status) => {
        if (status === 'placed')
            return 'Złożone';
        if (status === 'completed')
            return 'Zrealizowane';
        if (status === 'received')
            return 'Odebrane';
        if (status === 'cancelled')
            return 'Anulowane';
    }

    const getPaymentOrderStatus = (status) => {
        if (status === 'paid')
            return 'Opłacone';
        if (status === 'cashon')
            return 'Gotówka przy odbiorze';
        if (status === 'pending')
            return 'Oczekujące';
    }

    const getDate = () => {
        var date = new Date(props.orderInfo.order.ordertime);

        return "Data: " + date.getDate() +
            "/" + (date.getMonth() + 1) +
            "/" + date.getFullYear() +
            " " + date.getHours() +
            ":" + date.getMinutes() +
            ":" + date.getSeconds();
    }

    return (
        <div className='order-list-man'>
            <div className='order-list-top'>
                <div style={{ textAlign: 'left' }}>id: {props.orderInfo.order.id}</div>
                <div style={{ textAlign: 'right' }}>
                    {getDate()}
                </div>
            </div>

            <div className='order-list-bottom'>
                <div className='order-list-info'>
                    <div>
                        <div>Id klienta: {props.orderInfo.order.client.id}</div>
                        <div>Imię: {props.orderInfo.order.client.firstname}</div>
                        <div>Nazwisko: {props.orderInfo.order.client.lastname}</div>
                        <div>Regularny klient: {props.orderInfo.order.client.isRegular ? 'TAK' : 'NIE'}</div>
                    </div>
                    <div  style={{textAlign : 'right'}}>
                        <div>
                            Status zamowienia: {getDefaultOrderStatus(props.orderInfo.order.statusOrder)}
                        </div>

                        <div>
                            Status płatności: {getPaymentOrderStatus(props.orderInfo.order.statusPayment)}
                        </div>
                        <div>Kwota: {props.orderInfo.order.value} PLN</div>
                    </div>
                </div>


            <Collapse
                bordered={false}
                defaultActiveKey={['0']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="custom-collapse"

            >
                <Panel header='zamówione produkty' key="1" className="custom-item-list-panel" >
                    {displayOrdersListContent(props.orderInfo.productList)}
                </Panel>

            </Collapse>

            </div>            
        </div>
    )
}

export default OrdersList