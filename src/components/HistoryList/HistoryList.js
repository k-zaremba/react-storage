import React, { useState } from 'react'
import './HistoryList.css'
import { CaretRightOutlined, ImportOutlined, DeleteOutlined } from '@ant-design/icons';
import { Collapse, Button } from 'antd';
import HistoryItem from '../HistoryItem/HistoryItem';
const { Panel } = Collapse;


const HistoryList = (props) =>{

    const displayHistoryListContent = (elems) => {
        return elems.map((prod) => {
            return <HistoryItem forceUpdate={props.forceUpdate} key={prod.name} itemInfo={prod}></HistoryItem>
        })
    }

    const importList = () => {
        props.importHandler(props.historyListInfo.content);
        props.forceUpdate();
    }

    const deleteList = () =>{
        props.deletionHandler(props.historyListInfo.name);
    }
    
    return (
        <div className='hist-list'>
            <Collapse
                bordered={false}
                defaultActiveKey={['0']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="custom-collapse"
                
            >
                <Panel header={props.historyListInfo.name} key="1" className="custom-item-list-panel" >
                    {displayHistoryListContent(props.historyListInfo.content)}
                    <div className="item-inside">
                        <Button type="primary" shape="round" onClick={importList} icon={<ImportOutlined />}>Importuj listę</Button>
                        <Button type="danger" shape="round" onClick={deleteList} icon={<DeleteOutlined />}></Button>
                    </div>
                </Panel>
            </Collapse>
        </div>
    )
}

export default HistoryList