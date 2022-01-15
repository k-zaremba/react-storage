import React, { useState } from 'react'
import './OrdersList.css'
import { CaretRightOutlined, ImportOutlined, DeleteOutlined } from '@ant-design/icons';
import { Collapse, Button, Select, Space } from 'antd';
import OrderItem from './OrderItem/OrderItem';
const { Panel } = Collapse;
const { Option } = Select;

const OrdersList = (props) => {
    const [editing, setEditing] = useState(false);
    const [statusOrder, setStatusOrder] = useState(props.orderInfo.order.statusOrder);

    const displayOrdersListContent = (elems) => {
        return elems.map((prod) => {
            return <OrderItem key={prod.name} itemInfo={prod}></OrderItem>
        })
    }

    const postChanges = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        fetch(`http://localhost:8080/storage/order/edit?orderId=${props.orderInfo.order.id}&statusOrder=${statusOrder}&statusPayment=${props.orderInfo.order.statusPayment}`, requestOptions)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
            })
    }

    const changeOrderState = () => {
        postChanges();
        setStatusOrder(props.orderInfo.order.statusOrder)
        props.forceUpdate();
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
        <div className='order-list'>
            <div style={{ textAlign: 'center' }}>
                {getDate()}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div>
                    <div>idZamowienia</div>
                    <div>{props.orderInfo.order.id}</div>
                </div>
                <div>
                    <div>idKlienta</div>
                    <div>{props.orderInfo.order.client.id}</div>
                </div>
                <div>
                    <div>kwota</div>
                    <div>{props.orderInfo.order.value}</div>
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

            <div>
                STATUS zamowienia:
            </div>

            {!editing &&
                <div className="item-inside">
                    <Select defaultValue={getDefaultOrderStatus(props.orderInfo.order.statusOrder)} style={{ width: 120 }} disabled>
                        <Option value="completed">Zrealizowane</Option>
                        <Option value="cancelled">Anulowane</Option>
                        <Option value="received">Odebrane</Option>
                    </Select>
                </div>}

            {editing &&
                <div className="item-inside">
                    <Select defaultValue={getDefaultOrderStatus(props.orderInfo.order.statusOrder)} style={{ width: 120 }} onChange={(val) => {setStatusOrder(val)}}>
                        <Option value="completed">Zrealizowane</Option>
                        <Option value="cancelled">Anulowane</Option>
                        <Option value="received">Odebrane</Option>
                    </Select>
                </div>}

            <div className='user-buttons'>
                {!editing &&
                    <Button type='dashed' onClick={() => { setEditing(!editing);  }}> edytuj </Button>
                }
                {editing &&
                    <Button type='dashed' onClick={() => { setEditing(!editing); changeOrderState();}}> zatwierdź </Button>}
                {editing &&
                    <Button type="dashed" onClick={() => { setEditing(!editing); setStatusOrder(props.orderInfo.order.statusOrder)}}> anuluj </Button>}

            </div>

        </div>
    )
}

export default OrdersList