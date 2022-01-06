import React from 'react'
import './HistoryPanel.css'
import HistoryList from '../HistoryList/HistoryList';
import { Space, Input } from 'antd';
const { Search } = Input;

const HistoryPanel = (props) =>{
        
    const displayHistoryPanelContent = (elems) => {
        return elems.map((prod) => {
            return <HistoryList importHandler={props.importHandler} deletionHandler={props.deletionHandler} forceUpdate={props.forceUpdate} key={prod.name} historyListInfo={prod}></HistoryList>
        })
    }

    return (
        <div className="history-panel-content">
                <div class ='search-filter-bar'>
                    <Search placeholder="input search text" allowClear onSearch={()=>{}} style={{ width: '100%' }} />
                </div>
                <div className='history-lists-holder' >
                    <div>
                        <Space direction='vertical' wrap className="history-lists-col">
                            {displayHistoryPanelContent(props.historyContent.slice(0,Math.ceil(props.historyContent.length/2)))}
                        </Space>
                        <Space direction='vertical' wrap className="history-lists-col">
                            {displayHistoryPanelContent(props.historyContent.slice(Math.ceil(props.historyContent.length/2)))}
                        </Space>
                    </div>
                </div>
        </div>
    )
}

export default HistoryPanel