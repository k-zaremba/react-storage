import React from 'react'
import './OrdersPanel.css'
import OrdersList from './OrdersList/OrdersList';
import { Divider, BackTop } from 'antd';
import { UpCircleFilled  } from '@ant-design/icons';

const OrdersPanel = (props) => {

    const displayOrdersPanelContent = (elems) => {
        return elems.map((order) => {
            return <><OrdersList forceUpdate={props.forceUpdate} key={order.order.id} orderInfo={order}></OrdersList><Divider/></>
        })
    }

    return (
        <div className="history-panel-content">
            <div className='history-lists-holder' >
                    {displayOrdersPanelContent(props.content)}
            </div>
            <BackTop>
                <UpCircleFilled style={{fontSize : '40px', color : 'rgb(0,21,41)'}}/>
            </BackTop>
        </div>
    )
}

export default OrdersPanel