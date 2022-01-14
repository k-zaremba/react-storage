import React from 'react'
import './OrdersPanel.css'
import { BackTop, Table, Tag, Popover, Button, Card } from 'antd';
import { UpCircleFilled } from '@ant-design/icons';
import OrderItem from './OrdersList/OrderItem/OrderItem';


const OrdersPanel = (props) => {

    var data;

    const getData = () => {

        var orderHistory = props.content;
        data = [];

        orderHistory.forEach((e) => {

            if (e.order.statusOrder !== 'cancelled') {
                var obj = {
                    idZ: e.order.id,
                    date: e.order.ordertime,
                    firstname: e.order.client.firstname,
                    lastname: e.order.client.lastname,
                    value: e.order.value,
                    products: e.productList,
                    paymentStatus: e.order.statusPayment,
                    orderStatus: e.order.statusOrder
                }
                data.push(obj)
            }
        })

        data = sortOrdersById(data)
        return data;
    }

    function compare(a, b) {
        if (a.idZ < b.idZ)
           return -1
        if (a.idZ > b.idZ)
           return 1
        return 0
     }

    const sortOrdersById = (arr) => {
        return arr.sort(compare)
    }

    const getDate = (localDate) => {
        var d = new Date(localDate);

        return ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
            d.getFullYear();
    }
    
    const postChanges = (orderId, orderStatus, orderPayment) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        fetch(`http://localhost:8080/shop/order/edit?orderId=${orderId}&statusOrder=${orderStatus}&statusPayment=${orderPayment}`, requestOptions)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
            })
        props.forceUpdate()
    }


    const getPaymentOrderStatus = (status) => {
        if (status === 'paid')
            return 'Opłacone';
        if (status === 'cashon')
            return 'Gotówka przy odbiorze';
        if (status === 'pending')
            return 'Oczekujące';
    }
    
    const displayChangeCard = (record) => {
        return (
            <>
                    <div onClick={() => {postChanges(record.idZ, 'completed',record.paymentStatus)}}><Card hoverable className='worker-order-status-completed'>Zrealizowane</Card></div>
                    <div onClick={() => {postChanges(record.idZ, 'received',record.paymentStatus)}}><Card hoverable className='worker-order-status-received'>Odebrane</Card></div>
                    <div onClick={() => {postChanges(record.idZ, 'cancelled',record.paymentStatus)}}><Card hoverable className='worker-order-status-cancelled'>Anulowane</Card></div>
            </>
        )
    }

    const getDefaultOrderStatusTag = (status, record) => {
        if (status === 'placed')
            return (
                <>
                    <Popover placement="left" content={displayChangeCard(record)}>
                        <Tag style={{ fontSize: '14px' }} color="geekblue">Złożone</Tag>
                    </Popover>
                </>);

        if (status === 'completed')
            return (
                <>
                    <Popover placement="left" content={displayChangeCard(record)}>
                        <Tag style={{ fontSize: '14px' }} color="green">Zrealizowane</Tag>
                    </Popover>
                </>);
        if (status === 'received')
            return (
                <>
                    <Popover placement="left" content={displayChangeCard(record)}>
                        <Tag style={{ fontSize: '14px' }} color="gold">Odebrane</Tag>
                    </Popover>
                </>);
        if (status === 'cancelled')
            return (
                <>
                    <Popover placement="left" content={displayChangeCard(record)}>
                        <Tag style={{ fontSize: '14px' }} color="volcano">Anulowane</Tag>
                    </Popover>
                </>);
    }

    const displayOrderContent = (elems) => {
        return elems.map((e) => {
            return <OrderItem forceUpdate={props.forceUpdate} key={e.product.id} itemInfo={e}></OrderItem>
        })
    }

    const columns = [
        {
            title: 'Nr zamówienia',
            dataIndex: 'idZ',
            key: 'idZ',
            render: val => <p style={{ fontSize: '18px', margin: 'auto' }}>{val}</p>,
            sorter: {
                compare: (a, b) => a.idZ - b.idZ,
                multiple: 1,
              },
        },
        {
            title: 'Data',
            dataIndex: 'date',
            key: 'date',
            render: val => <p style={{ fontSize: '18px', margin: 'auto' }}>{getDate(val)}</p>,
            sorter: {
                compare: (a, b) => String(b.date).localeCompare(String(a.date)),
                multiple: 1,
              },
        },
        {
            title: 'Imię',
            dataIndex: 'firstname',
            key: 'firstname',
            render: val => <p style={{ fontSize: '18px', margin: 'auto' }}>{val}</p>,
            sorter: {
                compare: (a, b) => String(b.firstname).localeCompare(String(a.firstname)),
                multiple: 1,
              },
        },
        {
            title: 'Nazwisko',
            dataIndex: 'lastname',
            key: 'lastname',
            render: val => <p style={{ fontSize: '18px', margin: 'auto' }}>{val}</p>,
            sorter: {
                compare: (a, b) => String(b.lastname).localeCompare(String(a.lastname)),
                multiple: 1,
              },
        },
        {
            title: 'Kwota',
            dataIndex: 'value',
            key: 'value',
            render: val => <p style={{ fontSize: '18px', margin: 'auto' }}>{val.toLocaleString(undefined, { minimumFractionDigits: 2 })} zł</p>,
            sorter: {
                compare: (a, b) => a.value - b.value,
                multiple: 1,
            },
        },
        {
            title: 'Zamówione produkty',
            dataIndex: 'products',
            key: 'products',
            render: val =>
                <>
                    <Popover placement="bottom" content={displayOrderContent(val)}>
                        <Button style={{ marginBottom: 'auto', marginLeft: '60px' }} type='text'>sprawdź</Button>
                    </Popover>
                </>,
        },
        {
            title: 'Status płatności',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: val => <>{getPaymentOrderStatus(val)}</>,
            sorter: {
                compare: (a, b) => String(b.paymentStatus).localeCompare(String(a.paymentStatus)),
                multiple: 1,
              },
        },
        {
            title: 'Status zamówienia',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            render: (val, record) => <>{getDefaultOrderStatusTag(val, record)}</>,
            sorter: {
                compare: (a, b) => String(b.orderStatus).localeCompare(String(a.orderStatus)),
                multiple: 1,
              },
        },
    ];

    return (
        <div className="history-panel-content">
            <Table pagination={false} columns={columns} dataSource={getData()} />
            <BackTop>
                <UpCircleFilled style={{ fontSize: '40px', color: 'rgb(0,21,41)' }} />
            </BackTop>
        </div>
    )
}

export default OrdersPanel