import React, { useState, useEffect } from 'react'
import './PantryPanel.css'
import { Button, InputNumber, Select, Spin, Input, Space, Divider, BackTop, message  } from 'antd';
import { UpCircleFilled, } from '@ant-design/icons';
import PantryItem from './PantryItem/PantryItem';

const { Search } = Input;
const { Option } = Select;


const PantryPanel = (props) => {
    const [searchValue, setSearchValue] = useState("")
    const [modName, setModName] = useState('')
    const [modCount, setModCount] = useState(1)
    const [editing, setEditing] = useState(false);

    const [pantryFetched, setPantryFetched] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(true);

    const [storeContentFetched, setStoreContentFetched] = useState([]);
    const [fetched2, setFetched2] = useState(false);
    const [loading2, setLoading2] = useState(true);

    const [showMessage, setShowMessage] = useState(true);
    

    const addToPantry = (itemId, quantity) => {
        if (quantity == 0) return;

        var item = sessionStorage.getItem('user')
        var user = item ? JSON.parse(item) : {}

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                clientId: user.client.id,
                productId: itemId,
                quantity: quantity
            })
        };

        fetch(`http://localhost:8080/storage/pantry/add`, requestOptions)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                fetchPantry()
            })
    }

    const fetchStoreContent = () => {
        setFetched2(false)
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
                setFetched2(true)
                setLoading2(false)
            })
    };

    const fetchPantry = () => {
        var item = sessionStorage.getItem('user')
        var user = item ? JSON.parse(item) : {}

        setFetched(false)
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        fetch(`http://localhost:8080/storage/pantry/${user.client.id}`, requestOptions)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                setPantryFetched(res)
                setLoading(false)
                setFetched(true)
            })
    };

    const setCount = (value) => {
        setModCount(value)
    }

    const setProduct = (value) => {
        setModName(value)
    }

    const getOptionValues = (elems) => {
        return elems.map((prod) => {
            return <Option value={prod.name}>{prod.name}</Option>
        })
    }

    const getProdId = (itemName) => {
        if (itemName == '') return -1;

        var content = storeContentFetched;
        var idx = content.findIndex(i => i.name === itemName);
        return content[idx].id
    }

    const handleClick = () => {
        console.log(modName, modCount)
        var id = getProdId(modName)
        if (id == -1) return;
        addToPantry(id, modCount)
        props.forceUpdate();
    }

    const displayPantryContent = (elems, isEdited) => {
        return elems.filter((elem) => {
            const elemName = elem.product.name.toLowerCase();

            return elemName.includes(searchValue.toLowerCase())
        }).map((pair) => {
            return <PantryItem forceUpdate={props.forceUpdate} addToPantry={addToPantry} isEdited={isEdited} pair={pair}></PantryItem>
        })
    }


    function compare(a, b) {
        if (a.product.id < b.product.id)
            return -1
        if (a.product.id > b.product.id)
            return 1
        return 0
    }

    const sortProductsById = (arr) => {
        return arr.sort(compare)
    }

    useEffect(() => {
        if (loading){
            fetchPantry();
        }

        if(showMessage && pantryFetched.length !== 0){
            var content = pantryFetched;
            var idx = content.findIndex(i => i.quantity <= 2);
            if(idx !== -1){
                message.warning('Część twoich zapasów niedługo się wyczerpie');
            }

            setShowMessage(false)
        }

        if (loading2)
            fetchStoreContent()
    }, [pantryFetched])

    return (
        <div className="pantry-panel">
            <div className='payment-title-client'>
                TWOJA SPIŻARNIA
            </div>
            <Divider />

            {!fetched2 &&
                <div className="admin-spinner">
                    <Spin />
                </div>
            }

            {fetched2 &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Space direction='vertical'>

                        {!editing &&
                            <Button type="primary" shape="default" size={'large'} onClick={() => { setEditing(!editing) }}>
                                EDYTUJ SPIŻARNIĘ
                            </Button>}

                        {
                            editing &&
                            <Space direction='horizontal' >
                                <Select size="large" style={{ width: 250 }}
                                    showSearch
                                    placeholder="Wybierz produkt"
                                    optionFilterProp="children"
                                    onChange={setProduct}
                                    filterOption={(input, option) =>
                                        option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {getOptionValues(storeContentFetched)}
                                </Select>

                                <InputNumber size="large" min={1} max={100} defaultValue={1} onChange={setCount} />

                                <Button type="primary" shape="rectangle" size={'large'} onClick={handleClick}>
                                    DODAJ
                                </Button>

                                {editing &&
                                    <Button type="primary" shape="default" size={'large'} onClick={() => { setEditing(!editing); fetchPantry() }}>
                                        ZATWIERDŹ
                                    </Button>}
                            </Space>
                        }
                    </Space>
                </div>
            }

            {!fetched &&
                <div className="admin-spinner">
                    <Spin />
                </div>
            }

            {fetched &&
                <>
                    <div class='search-filter-bar'>
                        <Search size={'large'} placeholder="Nazwa produktu" allowClear value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} onSearch={(val) => { setSearchValue(val) }} />
                    </div>
                    <div className='pantry-panel-content'>
                        <div style={{display : 'flex', flexWrap : 'wrap', marginLeft : '25px', columnGap : '10px'}}>
                            {displayPantryContent(sortProductsById(pantryFetched), editing)}
                        </div>
                    </div>
                </>}
            <BackTop>
                <UpCircleFilled style={{ fontSize: '40px', color: 'rgb(0,21,41)' }} />
            </BackTop>
        </div>
    )
}

export default PantryPanel