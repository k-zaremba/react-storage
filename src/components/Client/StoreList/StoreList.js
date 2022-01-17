import React, { useState , useEffect} from 'react'
import './StoreList.css'
import StoreItem from './StoreItem/StoreItem';
import { Space, Input, BackTop, Divider, Spin } from 'antd';
import { UpCircleFilled } from '@ant-design/icons';
const { Search } = Input;


const StoreList = (props) => {

    const [searchValue, setSearchValue] = useState("")
    const [storeContentFetched, setStoreContentFetched] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(true);


    const fetchStoreContent = () => {
        setFetched(false)
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        fetch('http://localhost:8080/storage/products', requestOptions)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                setStoreContentFetched(res)
                setFetched(true)
                setLoading(false);
            })
    };

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

    useEffect(() => {
        if (loading)
            fetchStoreContent();
    }, [])

    return (
        <div>
            <div class='search-filter-bar'>
                <Search size={'large'} placeholder="Nazwa produktu" allowClear value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} onSearch={(val) => { setSearchValue(val) }} />
            </div>
            <Divider />
            {!fetched &&
                <div className="admin-spinner">
                    <Spin />
                </div>
            }
            {fetched && 
            <Space direction='horizontal' wrap style={{ justifyContent : 'center', gap: '25px', marginTop: '20px' }}>
                {displayShopContentFiltered(sortProductsById(storeContentFetched))}
            </Space>}
            <BackTop>
                <UpCircleFilled style={{ fontSize: '40px', color: 'rgb(0,21,41)' }} />
            </BackTop>
        </div>
    )
}

export default StoreList