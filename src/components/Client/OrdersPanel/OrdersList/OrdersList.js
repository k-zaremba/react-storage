import React, { useState } from 'react'
import './OrdersList.css'
import { ShoppingOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import { PageHeader, Tag, Button, Statistic, Descriptions, Row, Popover } from 'antd';
import OrderItem from '../OrderItem/OrderItem';
const { Panel } = Collapse;


const OrdersList = (props) => {

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

    const getDefaultOrderStatusTag = (status) => {
        if (status === 'placed')
            return (<Tag style={{ fontSize: '14px' }} color="geekblue">Złożone</Tag>);
        if (status === 'completed')
            return (<Tag style={{ fontSize: '14px' }} color="green">Gotowe do odbioru</Tag>);
        if (status === 'received')
            return (<Tag style={{ fontSize: '14px' }} color="gold">Odebrane</Tag>);
        if (status === 'cancelled')
            return (<Tag style={{ fontSize: '14px' }} color="volcano">Anulowane</Tag>);
    }


    const getDate = () => {
        var d = new Date(props.orderInfo.order.ordertime);

        return ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
            d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

    }

    const displayOrders = (elems) => {
        return elems.map((e) => {
            return <OrderItem forceUpdate={props.forceUpdate} key={e.product.id} itemInfo={e}></OrderItem>
        })
    }

    return (
        <>
            <div className='hist-order-list'>
            <PageHeader
                onBack={() => { }}
                backIcon={<ShoppingOutlined />}
                title={'Nr zamówienia: ' + props.orderInfo.order.id}
                tags={getDefaultOrderStatusTag(props.orderInfo.order.statusOrder)}
                subTitle={getDate()}
            >
                <Row>
                    <Statistic
                        title="Kwota"
                        value={props.orderInfo.order.value.toLocaleString(undefined, { minimumFractionDigits: 2 }) + ' zł'}
                        style={{
                            margin: '0 32px',
                        }}
                    />
                    <Statistic title="Status płatności" value={getPaymentOrderStatus(props.orderInfo.order.statusPayment)} />
                    <Popover placement="right"  content={displayOrders(props.orderInfo.productList)}>
                        <Button style ={{marginBottom: 'auto', marginLeft : '60px'}} type='text'>Zamówione produkty</Button>
                    </Popover>
                </Row>
            </PageHeader>
            </div>

        </>
    )
}

export default OrdersList