import React, { useState, useEffect } from 'react'
import './SharedPanel.css'
import { Button, Select, Carousel, Spin, List, Drawer, Divider, BackTop, Input } from 'antd';
import { UpCircleFilled, } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import cart from '../../../cart';
import SavedPublicList from './SavedPublicList/SavedPublicList';

const { Search } = Input;
const { Option } = Select;



const SharedPanel = (props) => {
    const [searchValue, setSearchValue] = useState("")
    const [fetched, setFetched] = useState(false);
    const [fetched2, setFetched2] = useState(false);

    const [loading, setLoading] = useState(true);
    const [templatesFetched, setTemplatesFetched] = useState([]);
    const [drawerInfo, setDrawerInfo] = useState({})
    const [visible, setVisible] = useState(false);
    const [publicListsFetched, setPublicListsFetched] = useState([]);


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

    const fetchPublicLists = (withSpinner) => {
        if (withSpinner) setFetched2(false)
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        fetch(`http://localhost:8080/storage/shoppinglist/public`, requestOptions)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                setPublicListsFetched(res)
                if (withSpinner) setFetched2(true)
            })
    };

    const imagesPredefined = [
        "https://s3.przepisy.pl/przepisy3ii/img/variants/800x0/nalesniki-z-kurczakiem-i-brokulami.jpg",
        "https://ocdn.eu/pulscms-transforms/1/wbzk9kpTURBXy85MDI1NjNmMTljNzFmYTI2ZGE4Y2E4MzA1YjZjZThkNS5qcGeTlQMAJ80E5s0CwZMJpjc5OWM3MwaTBc0EsM0CdoGhMAE/rosol.jpg",
        "https://s3.przepisy.pl/przepisy3ii/img/variants/800x0/18_szybko-i-smacznie3676551.jpg",
        "https://s3.przepisy.pl/przepisy3ii/img/variants/800x0/bogracz-tradycyjny.jpg",
        "https://s3.przepisy.pl/przepisy3ii/img/variants/800x0/wegetarianski-mix-grillowane-tortille-z-warzywami-i-kielkami-slonecznika613581.jpg"
    ]

    const imageLastPanel = [
        "https://s3.przepisy.pl/przepisy3ii/img/variants/800x0/pio_13089948401588919579000.jpg",
        "https://s3.przepisy.pl/przepisy3ii/img/variants/800x0/zapiekane-nalesniki-po-bolonsku.jpg",
        "https://s3.przepisy.pl/przepisy3ii/img/variants/800x0/schab-z-pieczarkami-pod-pierzynka-z-majonezu-i-zoltego-sera-3.jpg",
        "https://s3.przepisy.pl/przepisy3ii/img/variants/800x0/golonka-w-piwie352401.jpg",
        "https://s3.przepisy.pl/przepisy3ii/img/variants/800x0/zupa-meksykanska-z-ogorkiem-i-papryka.jpg",
        "https://s3.przepisy.pl/przepisy3ii/img/variants/800x0/pio_12677431041588874770000.jpg",
        "https://s3.przepisy.pl/przepisy3ii/img/variants/800x0/kolorowe-risotto-z-kurczakiem.jpg",
        "https://s3.przepisy.pl/przepisy3ii/img/variants/800x0/pieczony-krolik.jpg",
        "https://s3.przepisy.pl/przepisy3ii/img/variants/800x0/salatka-sledziowa-z-miemniakami-i-zielonym-groszkiem474141.jpg",
    ]


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
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}><Button type={'ghost'} onClick={() => { addTemplateToCart(listContent) }} style={{ border: 'none', color: 'white' }}>DODAJ DO LISTY</Button></div>
            </div>
        );
    }

    const addTemplateToCart = (content) => {
        content.forEach(element => {
            cart.updateProduct(element.product, element.quantity)
        });
        props.forceShoppingListUpdate();
    }

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

    const getLastPanelContent = () => {
        return imageLastPanel.map((imgSrc) => {
            return <img style={{ width: '507.66px', height: '216.66px' }} src={imgSrc}></img>
        })
    }

    useEffect(() => {
        if (loading)
            fetchTemplates();
            fetchPublicLists(true);
    }, [])

    const contentStyle = {
        height: '650px',
        color: '#fff',
        lineHeight: '160px',
        background: '#364d79',
    };

    function compare(a, b) {
        if (a.shoppingList.nameList < b.shoppingList.nameList)
            return -1
        if (a.shoppingList.nameList > b.shoppingList.nameList)
            return 1
        return 0
    }

    const sortListsByName = (arr) => {
        return arr.sort(compare)
    }

    const showDrawer = () => {
        setVisible(true)
    };

    const closeDrawer = () => {
        setVisible(false)
    };

    const displayPublicListsFiltered = (elems) => {
        return elems.filter((elem) => {
            const elemName = elem.shoppingList.nameList.toLowerCase();
            return elemName.includes(searchValue.toLowerCase())
        }).map((pair) => {
            return <SavedPublicList setDrawerInfo={setDrawerInfo} pair={pair} showDrawer={showDrawer} closeDrawer={closeDrawer}></SavedPublicList>
        })
    }

    const addPublicListToCart = () => {
        var content = drawerInfo.content;
        console.log(content)
        content.forEach(element => {
            cart.updateProduct(element.product, element.quantity)
        });
        props.forceShoppingListUpdate();
    }

    const getDrawerContent = () => {
        var content = drawerInfo.content;

        return (
            <>
                <div style={{ fontSize: '25px', textAlign: 'center', width: '100%' }}>{drawerInfo.name}</div>
                <Divider />

                <InfiniteScroll
                    dataLength={20}
                    hasMore={false}
                    endMessage={<Divider plain style={{ marginTop: '15px' }}>
                        <Button type={'ghost'} onClick={() => { addPublicListToCart() }} style={{ border: 'none', fontSize: '18px' }}>
                            DODAJ DO LISTY
                        </Button>
                    </Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        dataSource={content}
                        renderItem={elem => (
                            <List.Item style={{ padding: '7px', justifyContent: 'space-between' }} key={elem.product.id}>
                                <img src={elem.product.imgUrl} style={{ width: '23px', height: '23px' }} />
                                <div style={{ width: '200px', textAlign: 'left', fontSize: '17px' }}>{elem.product.name}</div>
                                <div style={{ fontSize: '17px' }}>{elem.quantity}</div>
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </>
        );

    }

    return (
        <div className="shared-panel">
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
                        <Carousel autoplay>

                            {getAllShopSuggestions()}

                            <div>
                                <div style={contentStyle}>
                                    <div id="container">
                                        <div id='navi1' style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', height: '650px', width: '1523px' }}>
                                            {getLastPanelContent()}
                                        </div>

                                        <div className="hidden2">
                                            <div className='template-final-wrap'>
                                                <div style={{ borderBottom: 'solid 1px white', width: '80%', margin: 'auto' }}></div>
                                                <div style={{ textAlign: 'center', fontSize: '100px', fontWeight: '100' }}>
                                                    WIĘCEJ WKRÓTCE
                                                </div>
                                                <div style={{ borderBottom: 'solid 1px white', width: '80%', margin: 'auto' }}>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Carousel>
                    </div>

                    <Divider />
                    <div className='payment-title-client'>
                        SPRAWDŹ CO POLECAJĄ UŻYTKOWNICY
                    </div>
                    <Divider />

                    <div class='search-filter-bar'>
                        <Search size={'large'} placeholder="Nazwa listy" allowClear value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} onSearch={(val) => { setSearchValue(val) }} />
                    </div>

                    {!fetched2 &&
                        <div className="admin-spinner">
                            <Spin />
                        </div>
                    }
                    {fetched2 &&
                        <>
                            <div className='saved-lists-panel-content'>
                                {displayPublicListsFiltered(sortListsByName(publicListsFetched))}
                            </div>
                        </>
                    }


                    <div className='drawer-wrapper'>
                        <Drawer
                            placement="right"
                            closable={false}
                            onClose={closeDrawer}
                            visible={visible}
                            getContainer={true}
                            autoFocus={false}
                            style={{ position: 'absolute', top: `${window.pageYOffset}px` }}
                        >
                            {getDrawerContent()}
                        </Drawer>
                    </div>
                    <BackTop>
                        <UpCircleFilled style={{ fontSize: '40px', color: 'rgb(0,21,41)' }} />
                    </BackTop>
                </>}
        </div>
    )
}

export default SharedPanel