import React, { useState } from 'react'
import './HistoryList.css'
import { CaretRightOutlined, ImportOutlined, DeleteOutlined } from '@ant-design/icons';
import { Collapse, Button } from 'antd';
import HistoryItem from '../HistoryItem/HistoryItem';
const { Panel } = Collapse;


const HistoryList = (props) =>{

    const [historyListInfo, setHistoryListInfo] = useState(props.historyListInfo);

    const displayHistoryListContent = (elems) => {
        return elems.map((prod) => {
            return <HistoryItem key={prod.name} itemInfo={prod}></HistoryItem>
        })
    }
    
    return (
        <div className='hist-list'>
            <Collapse
                bordered={false}
                defaultActiveKey={['0']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="custom-collapse"
                
            >
                <Panel header={historyListInfo.name} key="1" className="custom-item-list-panel" >
                    {displayHistoryListContent(historyListInfo.content)}
                    <div className="item-inside">
                        <Button type="primary" shape="round" icon={<ImportOutlined />}>Importuj listę</Button>
                        <Button type="danger" shape="round" icon={<DeleteOutlined />}></Button>
                    </div>
                </Panel>
            </Collapse>
        </div>
    )
}

export default HistoryList