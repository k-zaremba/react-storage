import React, { useState } from 'react'
import './PantryPanel.css'
import { Divider, BackTop } from 'antd';
import { PageHeader, Statistic, Row, Input, Space } from 'antd';
import { Button, InputNumber, Select } from 'antd';
import { PlusOutlined, MinusOutlined, CloseOutlined } from '@ant-design/icons';

import { RadarChartOutlined } from '@ant-design/icons';
import { UpCircleFilled } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;


const PantryPanel = (props) => {
    const [searchValue, setSearchValue] = useState("")
    const [modName, setModName] = useState('')
    const [modCount, setModCount] = useState(1)
    const [editing, setEditing] = useState(false);

    const addToPantry = (itemId, quantity) => {
        console.log(itemId)
        console.log(quantity)
        if (quantity == 0) return;

        var item = sessionStorage.getItem('user')
        var user = item ? JSON.parse(item) : {}

        console.log(user.client.id)

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
        var content = props.content;
        var idx = content.findIndex(i => i.name === itemName);
        return content[idx].id
    }

    const handleClick = () => {
        console.log(modName, modCount)
        addToPantry(getProdId(modName), modCount)
        props.forceUpdate();
    }

    const displayPantryContent = (elems, isEdited) => {
        return elems.filter((elem) => {
            const elemName = elem.product.name.toLowerCase();

            return elemName.includes(searchValue.toLowerCase())
        }).map((pair) => {
            return <><div className='pantry-list-item'>
                <PageHeader style={{ width: '500px' }}
                    onBack={() => { }}
                    backIcon={<RadarChartOutlined />}
                >

                    <Row style={{ justifyContent: 'space-evenly' }}>
                        <img src={pair.product.imgUrl} width='140px' height='120px' />
                        {!isEdited && <div>
                            <Statistic
                            title="Nazwa produktu"
                            value={pair.product.name}
                            style={{
                                margin: '0 10px',
                            }}
                            />
                            <Statistic style={{
                                margin: '0 10px',
                            }} title="Ilość w spiżarni" value={pair.quantity} />

                        </div>}
                        {isEdited && <div style={{margin: '0 10px'}}>
                            <p style={{marginBottom : 4, color : 'rgba(0,0,0,0.45)', fontSize : '14px'}}> Nazwa produktu </p>
                            <p style={{marginBottom : 0, color : 'rgba(0,0,0,0.85)', fontSize : '24px'}}> {pair.product.name} </p>
                            <p style={{marginBottom : 4, color : 'rgba(0,0,0,0.45)', fontSize : '14px'}}> Ilość w spiżarni </p>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Space size="middle">
                                    <p style={{ marginBottom: 0, color: 'rgba(0,0,0,0.85)', fontSize: '24px' }}> {pair.quantity} </p>
                                    <Button style={{ border: 'none' }} icon={<MinusOutlined />} />
                                    <Button style={{ border: 'none' }} icon={<PlusOutlined />} />
                                    <Button type='danger' style={{ border: 'none', background: 'white', color: 'red', boxShadow: '0 2px 0 rgb(0 0 0 / 2%)' }} icon={<CloseOutlined />} />
                                </Space>

                            </div>
                        </div>}
                    </Row>
                    <Divider />
                </PageHeader>
            </div>
            </>
        })
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
                    {displayPantryContent(props.pantry, editing)}
                </Space>
            </div>
            <BackTop>
                <UpCircleFilled style={{ fontSize: '40px', color: 'rgb(0,21,41)' }} />
            </BackTop>
        </div>
    )
}

export default PantryPanel