import React, { useState } from 'react'
import './OrdersPanel.css'
import { BackTop, Table, Tag, Popover, Button, Divider, Card, Spin } from 'antd';
import { UpCircleFilled, PieChartOutlined } from '@ant-design/icons';
import OrderItem from './OrdersList/OrderItem/OrderItem';

const OrdersPanel = (props) => {
    const [spinner, setSpinner] = useState(false)
    const [buttonBlock, setButtonBlock] = useState(true)

    var data;
    var statisticsData;

    const getData = () => {

        var orderHistory = props.content;
        data = [];

        orderHistory.forEach((e) => {

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
        })
        data = sortOrdersById(data)
        return data;
    }

    
    const getStatsData = () => {

        var statistics = props.stats.productListModel;
        statisticsData = [];

        statistics.forEach((i) => {

            var obj = {
                idP: i.product.id,
                name: i.product.name,
                price: i.product.value,
                score: i.product.score,
                scoreNum: i.product.scoreNumber,
                quantity: i.quantity
            }
            statisticsData.push(obj)
        })
        statisticsData = sortProductsByScore(statisticsData)
        return statisticsData;
    }

    const onFinish = () => {
        setSpinner(true)
        setButtonBlock(false)
        setTimeout(() => {
          setSpinner(false);
        }
          , 2000);
      };
    
    function compareId(a, b) {
        if (a.idZ < b.idZ)
            return -1
        if (a.idZ > b.idZ)
            return 1
        return 0
    }

    const sortOrdersById = (arr) => {
        return arr.sort(compareId)
    }
        
    function compareScore(a, b) {
        if (a.score > b.score)
            return -1
        if (a.score < b.score)
            return 1
        return 0
    }

    const sortProductsByScore = (arr) => {
        return arr.sort(compareScore)
    }

    const getDate = (localDate) => {
        var d = new Date(localDate);

        return ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
            d.getFullYear();
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
            return (
                <Tag style={{ fontSize: '14px' }} color="geekblue">Złożone</Tag>
            )
        if (status === 'completed')
            return (
                <Tag style={{ fontSize: '14px' }} color="green">Zrealizowane</Tag>
            );
        if (status === 'received')
            return (
                <Tag style={{ fontSize: '14px' }} color="gold">Odebrane</Tag>
            );
        if (status === 'cancelled')
            return (
                <Tag style={{ fontSize: '14px' }} color="volcano">Anulowane</Tag>
            );
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
            render: val => <>{getDefaultOrderStatusTag(val)}</>,
            sorter: {
                compare: (a, b) => String(b.orderStatus).localeCompare(String(a.orderStatus)),
                multiple: 1,
            },
        },
    ];

    const statisticsColumns = [
        {
            title: 'Id produktu',
            dataIndex: 'idP',
            key: 'idP',
            render: val => <p style={{ fontSize: '18px', margin: 'auto' }}>{val}</p>,
            sorter: {
                compare: (a, b) => a.idP - b.idP,
                multiple: 1,
            },
        },
        {
            title: 'Nazwa produktu',
            dataIndex: 'name',
            key: 'name',
            render: val => <p style={{ fontSize: '18px', margin: 'auto' }}>{val}</p>,
            sorter: {
                compare: (a, b) => String(b.name).localeCompare(String(a.name)),
                multiple: 1,
            },
        },
        {
            title: 'Cena',
            dataIndex: 'price',
            key: 'price',
            render: val => <p style={{ fontSize: '18px', margin: 'auto' }}>{val.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>,
            sorter: {
                compare: (a, b) => a.price - b.price,
                multiple: 1,
            },
        },
        {
            title: 'Ocena',
            dataIndex: 'score',
            key: 'score',
            render: val => <p style={{ fontSize: '18px', margin: 'auto' }}>{val.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>,
            sorter: {
                compare: (a, b) => a.score - b.score,
                multiple: 1,
            },
        },
        {
            title: 'Ilość ocen',
            dataIndex: 'scoreNum',
            key: 'scoreNum',
            render: val => <p style={{ fontSize: '18px', margin: 'auto' }}>{val}</p>,
            sorter: {
                compare: (a, b) => a.scoreNum - b.scoreNum,
                multiple: 1,
            },
        },
        {
            title: 'Sprzedana ilość',
            dataIndex: 'quantity',
            key: 'quantity',
            render: val => <p style={{ fontSize: '18px', margin: 'auto' }}>{val}</p>,
            sorter: {
                compare: (a, b) => a.quantity - b.quantity,
                multiple: 1,
            },
        },

    ]

    return (
        <div className="man-order-panel-content">
            <div className='manager-stats-info-entering-title'>
                HISTORIA ZAMÓWIEŃ
            </div>
            <Divider />

            <div style={{ height: '770px' }}>
                <Table pagination columns={columns} dataSource={getData()} />
            </div>
            <Divider />


            {buttonBlock && <div className='wrapper-statistics' onClick={onFinish}>
                <Card className='statistics-card'
                    hoverable
                    bordered={true}
                    style={{ borderRadius: '20px', width: '100%' }}
                    cover={<PieChartOutlined style={{ fontSize: '100px', color: 'rgb(0,21,41)', marginTop: '30px' }} />}
                >
                    <p style={{ height: '10px', fontSize: '40px', fontWeight: '700', textAlign: 'center' }}>SPRAWDŹ STATYSTYKI</p>
                    <Divider />
                </Card>
            </div>}

            {spinner &&
                <div style={{width : '205px', margin : 'auto', textAlign : 'center', marginTop: '100px'}}>
                  <Spin />
                </div>
            }

            {!buttonBlock && !spinner &&
                <div>
                    <div className='manager-stats-info-entering-title'>
                        STATYSTYKI PRODUKTÓW
                    </div>
                    <Divider/>
                    <Table style={{ marginTop: 56 }} pagination columns={statisticsColumns} dataSource={getStatsData()} />
                </div>}
            <BackTop>
                <UpCircleFilled style={{ fontSize: '40px', color: 'rgb(0,21,41)' }} />
            </BackTop>
        </div>
    )
}

export default OrdersPanel