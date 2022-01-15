import React, { useState } from 'react'
import './SavedListsPanel.css'
import { Divider, BackTop } from 'antd';
import { PageHeader, Statistic, Row, Input, Space } from 'antd';
import { Button, InputNumber, Select } from 'antd';
import { PlusOutlined, MinusOutlined, CloseOutlined } from '@ant-design/icons';

import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import { UpCircleFilled, } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;


const SavedListsPanel = (props) => {
    const [searchValue, setSearchValue] = useState("")

    const displaySavedListsContent = (elems) => {
        return elems.filter((elem) => {
            const elemName = elem.product.name.toLowerCase();

            return elemName.includes(searchValue.toLowerCase())
        }).map((pair) => {
            return <div></div>
        })
    }

    return (
        <div className="saved-lists-panel">
            <div className='payment-title-client'>
                TWOJE LISTY
            </div>
            <Divider />

            <div class='search-filter-bar'>
                <Search size={'large'} placeholder="input search text" allowClear value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} onSearch={(val) => { setSearchValue(val) }} />
            </div>

            <div className='pantry-panel-content'>
                <Space direction='horizontal' wrap style={{ justifyContent: 'center', gap: '25px', marginTop: '20px' }}>
                    {/*displaySavedListsContent(props.pantry, editing)*/}
                </Space>
            </div>

            <BackTop>
                <UpCircleFilled style={{ fontSize: '40px', color: 'rgb(0,21,41)' }} />
            </BackTop>
        </div>
    )
}

export default SavedListsPanel