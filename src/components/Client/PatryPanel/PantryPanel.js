import React, { useState } from 'react'
import './PantryPanel.css'
import { Divider, BackTop } from 'antd';
import { PageHeader, Statistic, Row, Input, Space } from 'antd';
import { Button, InputNumber, Select } from 'antd';
import { PlusOutlined, MinusOutlined, CloseOutlined } from '@ant-design/icons';

import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import { UpCircleFilled ,} from '@ant-design/icons';
import PantryItem from './PantryItem/PantryItem';

const { Search } = Input;
const { Option } = Select;


const PantryPanel = (props) => {
    const [searchValue, setSearchValue] = useState("")
    const [modName, setModName] = useState('')
    const [modCount, setModCount] = useState(1)
    const [editing, setEditing] = useState(false);

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
            })
    }

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
        if(itemName == '') return -1;

        var content = props.content;
        var idx = content.findIndex(i => i.name === itemName);
        return content[idx].id
    }

    const handleClick = () => {
        console.log(modName, modCount)
        var id = getProdId(modName)
        if(id == -1) return;
        addToPantry(id, modCount)
        props.forceUpdate();
    }

    const displayPantryContent = (elems, isEdited) => {
        return elems.filter((elem) => {
            const elemName = elem.product.name.toLowerCase();

            return elemName.includes(searchValue.toLowerCase())
        }).map((pair) => {
            return <PantryItem forceUpdate={props.forceUpdate} addToPantry={addToPantry} isEdited={isEdited} pair={pair}></PantryItem>})
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

    return (
        <div className="pantry-panel">
            <div className='payment-title-client'>
                TWOJA SPIŻARNIA
            </div>
            <Divider />

            <div style={{display : 'flex', justifyContent: 'center'}}>
                <Space direction='vertical'>

                    {!editing &&
                    <Button type="primary" shape="default" size={'large'} onClick={() => { setEditing(!editing) }}>
                        EDYTUJ SPIŻARNIĘ
                    </Button>}

                    {
                        editing &&
                        <Space direction='horizontal' >
                            <Select size="large" style={{width : 250}}
                                showSearch
                                placeholder="Wybierz produkt"
                                optionFilterProp="children"
                                onChange={setProduct}
                                filterOption={(input, option) =>
                                    option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {getOptionValues(props.content)}
                            </Select>

                            <InputNumber size="large" min={1} max={100} defaultValue={1} onChange={setCount} />

                            <Button type="primary" shape="rectangle" size={'large'} onClick={handleClick}>
                                DODAJ
                            </Button>

                            {editing &&
                                <Button type="primary" shape="default" size={'large'} onClick={() => { setEditing(!editing) }}>
                                    ZATWIERDŹ
                                </Button>}
                        </Space>
                    }
                </Space>
            </div>

            <div class='search-filter-bar'>
                <Search size={'large'} placeholder="input search text" allowClear value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} onSearch={(val) => { setSearchValue(val) }} />
            </div>
            <div className='pantry-panel-content'>
                <Space direction='horizontal' wrap style={{ justifyContent: 'center', gap: '25px', marginTop: '20px' }}>
                    {displayPantryContent(sortProductsById(props.pantry), editing)}
                </Space>
            </div>
            <BackTop>
                <UpCircleFilled style={{ fontSize: '40px', color: 'rgb(0,21,41)' }} />
            </BackTop>
        </div>
    )
}

export default PantryPanel