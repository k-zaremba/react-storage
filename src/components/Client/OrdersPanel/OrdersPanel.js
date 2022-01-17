import React, { useState, useEffect } from 'react'
import './OrdersPanel.css'
import OrdersList from './OrdersList/OrdersList';
import { Divider, BackTop, Spin } from 'antd';
import { UpCircleFilled } from '@ant-design/icons';

const OrdersPanel = (props) => {
    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(true);
    const [ordersListFetched, setOrdersListFetched] = useState([]);

    const fetchUserOrders = () => {
        var item = sessionStorage.getItem('user')
        var user = item ? JSON.parse(item) : {}

        setFetched(false)
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        fetch(`http://localhost:8080/storage/orders/history/${user.client.id}`, requestOptions)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                setOrdersListFetched(res)
                setFetched(true)
                setLoading(false)
            })
    };


    const displayOrdersPanelContent = (elems) => {
        return elems.map((order) => {
            return <><OrdersList forceUpdate={props.forceUpdate} key={order.order.id} orderInfo={order}></OrdersList><Divider /></>
        })
    }

    function compare(a, b) {
        if (a.order.id < b.order.id)
            return -1
        if (a.order.id > b.order.id)
            return 1
        return 0
    }

    const filterOrders = (statusList) => {
        var content = ordersListFetched.filter((e) => { return statusList.includes(e.order.statusOrder) })
        return content.sort(compare)
    }

    useEffect(() => {
        if (loading)
            fetchUserOrders();
    }, [])

    return (
        <>
            <div className='payment-title-client'>
                {props.title}
            </div>
            <Divider />
            <div className="history-panel-content">
                {!fetched &&
                    <div className="admin-spinner">
                        <Spin />
                    </div>
                }
                {fetched && <div className='history-lists-holder' >
                    {displayOrdersPanelContent(filterOrders(props.filters))}
                </div>}
                <BackTop>
                    <UpCircleFilled style={{ fontSize: '40px', color: 'rgb(0,21,41)' }} />
                </BackTop>
            </div>
        </>
    )
}

export default OrdersPanel