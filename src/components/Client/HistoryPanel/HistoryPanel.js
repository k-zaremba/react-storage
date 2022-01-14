import React from 'react'
import './HistoryPanel.css'
import HistoryList from './HistoryList/HistoryList';
import { Divider, BackTop } from 'antd';
import { UpCircleFilled  } from '@ant-design/icons';

const HistoryPanel = (props) => {

    const displayHistoryPanelContent = (elems) => {
        return elems.map((order) => {
            return <><HistoryList forceUpdate={props.forceUpdate} key={order.order.id} orderInfo={order}></HistoryList><Divider/></>
        })
    }

    return (
        <div className="history-panel-content">
            <div className='history-lists-holder' >
                    {displayHistoryPanelContent(props.content)}
            </div>
            <BackTop>
                <UpCircleFilled style={{fontSize : '40px', color : 'rgb(0,21,41)'}}/>
            </BackTop>
        </div>
    )
}

export default HistoryPanel