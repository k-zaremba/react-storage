import React, { useState } from 'react'
import './StoreList.css'
import StoreItem from './StoreItem/StoreItem';
import { Space, Input, BackTop, Divider } from 'antd';
import { UpCircleFilled } from '@ant-design/icons';
const { Search } = Input;


const StoreList = (props) => {

    const [searchValue, setSearchValue] = useState("")

    const displayShopContentFiltered = (elems) => {

        return elems.filter((elem) => {
            const elemName = elem.name.toLowerCase();

            return elemName.includes(searchValue.toLowerCase())
        })
            .map((prod) => {
                return <StoreItem force={props.force} forceShoppingList={props.forceShoppingList} forceShoppingListUpdate={props.forceShoppingListUpdate} key={prod.id} itemInfo={prod}></StoreItem>
            })
    }

    function compare(a, b) {
        if (a.id < b.id)
            return -1
        if (a.id > b.id)
            return 1
        return 0
    }

    const sortProductsById = (arr) => {
        return arr.sort(compare)
    }

    return (
        <div>
            <div class='search-filter-bar'>
                <Search size={'large'} placeholder="input search text" allowClear value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} onSearch={(val) => { setSearchValue(val) }} />
            </div>
            <Divider />
            <Space direction='horizontal' wrap style={{ justifyContent : 'center', gap: '25px', marginTop: '20px' }}>
                {displayShopContentFiltered(sortProductsById(props.content))}
            </Space>
            <BackTop>
                <UpCircleFilled style={{ fontSize: '40px', color: 'rgb(0,21,41)' }} />
            </BackTop>
        </div>
    )
}

export default StoreList