import React from 'react'
import './HistoryPanel.css'
import HistoryList from '../HistoryList/HistoryList';
import { Space, Input } from 'antd';
const { Search } = Input;

const HistoryPanel = () =>{
        
    const displayHistoryPanelContent = (elems) => {
        return elems.map((prod) => {
            return <HistoryList key={prod.name} historyListInfo={prod}></HistoryList>
        })
    }

    const listaNazwana = {
        name : "Lista na szybkie śniadanie!",
        content : [
            {name : "bułka", count : 3},
            {name : "szynka 200g", count : 2},
            {name : "masło", count : 1},
            {name : "ketchup", count : 1}]
        };

    const listaNienazwana = {
        name : "Środa 13/12/2021 18:23",
        content : [
            {name : "jajka 1 szt", count : 3},
            {name : "szynka 200g", count : 3},
            {name : "jogurt naturalny", count : 3}]
        };
    
    const historyListsFetched = [listaNazwana, listaNienazwana, listaNienazwana, listaNienazwana];

    return (
        <div className="history-panel-content">
                <div class ='search-filter-bar'>
                    <Search placeholder="input search text" allowClear onSearch={()=>{}} style={{ width: '100%' }} />
                </div>
                <div className='history-lists-holder' >
                    <div>
                        <Space direction='vertical' wrap className="history-lists-col">
                            {displayHistoryPanelContent(historyListsFetched.slice(0,Math.ceil(historyListsFetched.length/2)))}
                        </Space>
                        <Space direction='vertical' wrap className="history-lists-col">
                            {displayHistoryPanelContent(historyListsFetched.slice(Math.ceil(historyListsFetched.length/2)))}
                        </Space>
                    </div>
                </div>
        </div>
    )
}

export default HistoryPanel