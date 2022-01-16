import React, { useState, useEffect } from 'react'
import './SharedPanel.css'
import { Divider, BackTop, } from 'antd';
import { Input, Space } from 'antd';
import { Button, Select, Carousel, Spin } from 'antd';
import { UpCircleFilled, } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

const contentStyle = {
    height: '650px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const SharedPanel = (props) => {
    const [searchValue, setSearchValue] = useState("")
    const [focus, setFocus] = useState('none')

    const [fetched, setFetched] = useState(false);
    const [templatesFetched, setTemplatesFetched] = useState([]);

    const fetchTemplates = () => {
        setFetched(false)
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        fetch(`http://localhost:8080/storage/shoppinglist`, requestOptions)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                setTemplatesFetched(res)
                setFetched(true)
            })
    };

    const displaySavedListsContent = (elems) => {
        return elems.filter((elem) => {
            const elemName = elem.product.name.toLowerCase();

            return elemName.includes(searchValue.toLowerCase())
        }).map((pair) => {
            return <div></div>
        })
    }

    const con = [
        { name: 'filet z kurczaka wielokrotnie pasionego trawą', quantity: 5 },
        { name: 'brokuł', quantity: 5 },
        { name: 'pieczarki', quantity: 5 },
        { name: 'śmietana', quantity: 5 },
        { name: 'cebula', quantity: 5 },
        { name: 'mąka', quantity: 5 },
        { name: 'mleko', quantity: 5 },
        { name: 'jajko 1szt', quantity: 5 },
        { name: 'woda', quantity: 5 },
        { name: 'olej', quantity: 5 }
    ]


    const renderListContent = (listContent) => {
        return listContent.map(e => {
            return (
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <p style={{ width: '70%' }}>{e.name}</p>
                    <p>{e.quantity}</p>
                </div>
            );
        })
    }

    const renderShopSuggestion = (listName, listContent) => {
        return (
            <div className='template-suggestion-wrap'>
                <div style={{ textAlign: 'center', marginBottom: '10px', fontSize: '30px' }}>{listName}</div>
                <div style={{ borderBottom: 'solid 1px white', width: '80%', margin: 'auto', marginBottom: '10px' }}></div>
                <div style={{ borderBottom: 'solid 1px white', width: '80%', margin: 'auto' }}>
                    {renderListContent(listContent)}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}><Button type={'ghost'} style={{ border: 'none', color: 'white' }}>DODAJ DO LISTY</Button></div>
            </div>
        );
    }

    useEffect(() => {
    }, [])

    return (
        <div className="saved-lists-panel">
            <div className='payment-title-client'>
                POLECAMY
            </div>
            <Divider />
            {!fetched &&
                <div class="lista" id="content1">
                    <div className="admin-spinner">
                        <Spin />
                    </div>
                </div>
            }

            {fetched &&
                <>
                    <div style={{ padding: '0px 50px 0px 50px' }}>
                        <Carousel >
                            <div id="container" onMouseEnter={() => { setFocus('true') }} onMouseLeave={() => { setFocus('false') }}>
                                <div id="navi">
                                    <img style={{ width: '1523px', height: '650px' }} src='https://s3.przepisy.pl/przepisy3ii/img/variants/800x0/nalesniki-z-kurczakiem-i-brokulami.jpg'></img>
                                </div>

                                <div className="hidden">
                                    {renderShopSuggestion('Naleśniki z kurczakiem i brokułami', con)}
                                </div>



                                {false && <>{focus === 'true' && <div id="infoin">

                                    <div id="list-content-bar-in-top">
                                        {renderShopSuggestion('Naleśniki z kurczakiem i brokułami', con)}
                                    </div>
                                </div>}
                                    {focus === 'false' && <div id="infoout">
                                        <div id="list-content-bar-out">
                                            {renderShopSuggestion('Naleśniki z kurczakiem i brokułami', con)}
                                        </div>
                                    </div>}
                                </>}


                            </div>

                            <div>
                                <h3 style={contentStyle}>2</h3>
                            </div>
                            <div>
                                <h3 style={contentStyle}>3</h3>
                            </div>
                            <div>
                                <h3 style={contentStyle}>4</h3>
                            </div>
                        </Carousel>
                    </div>

                    <Divider />
                    <div className='payment-title-client'>
                        SPRAWDŹ CO POLECAJĄ UŻYTKOWNICY
                    </div>
                    <Divider />

                    <div class='search-filter-bar'>
                        <Search size={'large'} placeholder="input search text" allowClear value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} onSearch={(val) => { setSearchValue(val) }} />
                    </div>

                    <div className='shared-panel-content'>
                        <Space direction='horizontal' wrap style={{ justifyContent: 'center', gap: '25px', marginTop: '20px' }}>
                            {/*displaySavedListsContent(props.pantry, editing)*/}
                        </Space>
                    </div>

                    <BackTop>
                        <UpCircleFilled style={{ fontSize: '40px', color: 'rgb(0,21,41)' }} />
                    </BackTop>
                </>}
        </div>
    )
}

export default SharedPanel