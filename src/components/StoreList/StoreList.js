import React, { useState } from 'react'
import './StoreList.css'
import StoreItem from '../StoreItem/StoreItem';
import { Space, Input } from 'antd';
const { Search } = Input;


const StoreList = (props) =>{

    const [shopContent, setShopContent] = useState(props.content)
    const [searchValue, setSearchValue] = useState("")

    console.log(shopContent)

    const displayShopContentFiltered = (elems) => {
        
        return elems.filter((elem) => {
            const elemName = elem.name.toLowerCase();

            return elemName.includes(searchValue.toLowerCase())})
            .map((prod) => {
                return <StoreItem key={prod.id} itemInfo={prod}></StoreItem>
        })
    }

    return (
        <div>
            <div class ='search-filter-bar'>
                <Search placeholder="input search text" allowClear onSearch={(val)=>{setSearchValue(val)}}/>
            </div>
            <Space direction='horizontal' wrap style={{justifyContent: 'center', gap : '25px', marginTop : '20px'}}>
                {displayShopContentFiltered(shopContent)}
            </Space>
        </div>
    )
}

export default StoreList