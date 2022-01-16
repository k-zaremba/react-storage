import React, { useState, useEffect } from 'react'
import './SharedPanel.css'
import { Divider, BackTop, } from 'antd';
import { Input, Space } from 'antd';
import { Button, Select, Carousel, Spin } from 'antd';
import { UpCircleFilled, } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

const SharedPanel = (props) => {
    const [searchValue, setSearchValue] = useState("")

    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(true);
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
                setLoading(false)
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


    const renderListContent = (listContent) => {
        return listContent.map(e => {
            return (
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <p style={{ width: '70%' }}>{e.product.name}</p>
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

    const imagesPredefined = [
        "https://s3.przepisy.pl/przepisy3ii/img/variants/800x0/nalesniki-z-kurczakiem-i-brokulami.jpg",
        "https://s3.przepisy.pl/przepisy3ii/img/variants/800x0/rosol_z_kury170242.jpg",
        "https://s3.przepisy.pl/przepisy3ii/img/variants/800x0/18_szybko-i-smacznie3676551.jpg",
        "https://s3.przepisy.pl/przepisy3ii/img/variants/800x0/bogracz-tradycyjny.jpg",
        "https://s3.przepisy.pl/przepisy3ii/img/variants/800x0/wegetarianski-mix-grillowane-tortille-z-warzywami-i-kielkami-slonecznika613581.jpg"
    ]

    const getAllShopSuggestions = () => {
        console.log(templatesFetched)
        return templatesFetched.map((t) => {
            return (
                <div id="container">
                    <div id="navi">
                        <img style={{ width: '1523px', height: '650px' }} src={imagesPredefined[t.shoppingList.id - 1]}></img>
                    </div>

                    <div className="hidden">
                        {renderShopSuggestion(t.shoppingList.nameList, t.productModelList)}
                    </div>
                </div>
            );
        })
    }

    useEffect(() => {
        if (loading)
            fetchTemplates();
    }, [])

    return (
        <div className="saved-lists-panel">
            <div className='payment-title-client'>
                POLECAMY!
            </div>
            <Divider />
            {!fetched &&
                <div className="admin-spinner">
                    <Spin />
                </div>
            }

            {fetched &&
                <>
                    <div style={{ padding: '0px 50px 0px 50px' }}>
                        <Carousel >
                            {getAllShopSuggestions()}
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