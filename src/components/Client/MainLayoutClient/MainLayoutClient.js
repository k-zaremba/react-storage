import React, { useState, useEffect, useReducer } from 'react'
import { Layout, Menu, Spin, Popover, Button, Badge } from 'antd';
import StoreList from '../StoreList/StoreList'
import HistoryPanel from '../HistoryPanel/HistoryPanel';
import PantryPanel from '../PatryPanel/PantryPanel'
import auth from '../../../auth.js'
import cart from '../../../cart';

import './MainLayoutClient.css'

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ShoppingCartOutlined,
    UnorderedListOutlined,
    FieldTimeOutlined,
    LogoutOutlined,
    ShoppingOutlined,
    DatabaseOutlined, // spizarnia 
    ReadOutlined, // listy uzytkownikow
    ProfileOutlined // lista zakupowa
} from '@ant-design/icons';
import PaymentPanel from '../PaymentPanel/PaymentPanel';
import CardPaymentPanel from '../CardPaymentPanel/CardPaymentPanel';
import CardPaymentConfirmationPanel from '../CardPaymentConfirmationPanel/CardPaymentConfirmationPanel';
import CashPaymentConfirmationPanel from '../CashPaymentConfirmationPanel/CashPaymentConfirmationPanel';
import { useNavigate } from 'react-router-dom';
import order from '../../../order';
import CartClick from './CartClick/CartClick';
import CartPopup from './CartPopup/CartPopup';
import CartPanel from '../CartPanel/CartPanel';

const { Header, Sider, Content } = Layout;


const MainLayoutClient = () => {

    const [collapsed, setCollapsed] = useState(false);
    const [activeWindow, setActiveWindow] = useState(9);
    const [fetched, setFetched] = useState(false);
    const [storeContentFetched, setStoreContentFetched] = useState([]);
    const [ordersListFetched, setOrdersListFetched] = useState([]);
    const [pantryFetched, setPantryFetched] = useState([]);


    const navigate = useNavigate()
    const [force, forceUpdate] = useReducer(x => x + 1, 0);
    const [forceShoppingList, forceShoppingListUpdate] = useReducer(x => x + 1, 0);
    const [forceStore, forceStoreUpdate] = useReducer(x => x + 1, 0);
    const [clicked, setClicked] = useState(false)
    const [hovered, setHovered] = useState(false)

    const hide = () => {
        setClicked(false);
        setHovered(false);
    };

    const handleHoverChange = visible => {
        setHovered(visible)
        setClicked(false)
    };

    const handleClickChange = visible => {
        setClicked(visible)
        setHovered(false)
    };

    const hoverContent = <CartPopup></CartPopup>
    const clickContent = <CartClick hideCart={hide} setActiveWindow={setActiveWindow} force={forceShoppingList} forceStoreUpdate={forceStoreUpdate} forceShoppingListUpdate={forceShoppingListUpdate}></CartClick>;

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    function compare(a, b) {
        if (a.order.id < b.order.id)
            return -1
        if (a.order.id > b.order.id)
            return 1
        return 0
    }

    const filterOrders = (statusList) => {
        var content = ordersListFetched.filter((e) => { return statusList.includes(e.order.statusOrder) })
        return content.sort(compare)
    }

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
            })
    };

    const fetchUserOrders = () => {
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
        fetch(`http://localhost:8080/storage/orders/history/${user.client.id}`, requestOptions)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                setOrdersListFetched(res)
                setFetched(true)
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
                setFetched(true)
            })
    };

    useEffect(() => {
        order.cancelActive()

        if (activeWindow === 1 || activeWindow === 9){
            fetchStoreContent();
            fetchPantry();
        }

        if (activeWindow === 2 || activeWindow === 3)
            fetchUserOrders();

    }, [force])

    const getView = () => {
        return (
            <>
                {false && activeWindow === 1 && <div class="panels">

                    {!fetched &&
                        <div class="lista" id="content1">
                            <div className="admin-spinner">
                                <Spin />
                            </div>
                        </div>
                    }

                    {fetched &&
                        <div class="lista" id="content1">
                            <StoreList force={forceStore} forceShoppingList={forceShoppingList} forceStoreUpdate={forceStoreUpdate} forceShoppingListUpdate={forceShoppingListUpdate} content={storeContentFetched}></StoreList>
                        </div>
                    }
                </div>}

                {!fetched &&
                    <div className="admin-spinner">
                        <Spin />
                    </div>

                }

                {fetched && <div id="client-content-3" class="client-panels"> {/* background height dynamic */}
                    {activeWindow === 1 && <StoreList force={forceStore} forceShoppingList={forceShoppingList} forceStoreUpdate={forceStoreUpdate} forceShoppingListUpdate={forceShoppingListUpdate} content={storeContentFetched}></StoreList>}
                    {activeWindow === 2 && <HistoryPanel forceUpdate={forceUpdate} content={filterOrders(['completed', 'placed'])}></HistoryPanel>}
                    {activeWindow === 3 && <HistoryPanel forceUpdate={forceUpdate} content={filterOrders(['received'])}></HistoryPanel>}
                    {activeWindow === 8 && <CartPanel setActiveWindow={setActiveWindow} force={forceShoppingList} forceStoreUpdate={forceStoreUpdate} forceShoppingListUpdate={forceShoppingListUpdate}></CartPanel>}
                    {activeWindow === 9 && <PantryPanel forceUpdate={forceUpdate} pantry={pantryFetched} content={storeContentFetched}></PantryPanel>}
                </div>}

                {fetched && <div id="client-content-4" class="client-panels"> {/* background height fiexd */}
                    {activeWindow === 4 && <PaymentPanel setActiveWindow={setActiveWindow}></PaymentPanel>}
                    {activeWindow === 5 && <CardPaymentPanel setActiveWindow={setActiveWindow}></CardPaymentPanel>}
                    {activeWindow === 6 && <CardPaymentConfirmationPanel setActiveWindow={setActiveWindow}></CardPaymentConfirmationPanel>}
                    {activeWindow === 7 && <CashPaymentConfirmationPanel setActiveWindow={setActiveWindow}></CashPaymentConfirmationPanel>}
                </div>}
            </>
        );
    }

    const logoutAccount = () => {
        auth.logout(() => { navigate('/'); sessionStorage.removeItem('user'); order.cancelActive(); cart.clearCart() });
    }

    return (
        <div>
            <Layout id='components-layout-demo-custom-trigger-client'>

                <Sider className="sider-menu" trigger={null} collapsible collapsed={collapsed} />

                <Sider style={{ position: 'fixed' }} className="sider-menu" trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo" />
                    <Menu className='test-wrapper-client' theme="dark" mode="inline" defaultSelectedKeys={['5']}>
                        <Menu.Item className="menu-item-selector" key="5" icon={<DatabaseOutlined style={{ fontSize: '20px' }} />} onClick={() => { setActiveWindow(9); forceUpdate() }} >
                            Spiżarnia
                        </Menu.Item>

                        <Menu.Item className="menu-item-selector" key="1" icon={<ShoppingOutlined style={{ fontSize: '20px' }} />} onClick={() => { setActiveWindow(1); forceUpdate() }} >
                            Sklep
                        </Menu.Item>

                        <Menu.Item className="menu-item-selector" key="2" icon={<FieldTimeOutlined style={{ fontSize: '20px' }} />} onClick={() => { setActiveWindow(2); forceUpdate() }} >
                            W realizacji
                        </Menu.Item>

                        <Menu.Item className="menu-item-selector" key="3" icon={<UnorderedListOutlined style={{ fontSize: '20px' }} />} onClick={() => { setActiveWindow(3); forceUpdate() }} >
                            Historia
                        </Menu.Item>

                        <Menu.Item className="menu-item-selector" key="4" icon={<LogoutOutlined style={{ fontSize: '20px' }} />} onClick={logoutAccount} >
                            Wyloguj
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0, paddingRight : 30, display: 'flex', justifyContent: 'space-between' }} >
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => { toggle() },
                        })}

                        <Popover
                            style={{ width: 500 }}
                            content={hoverContent}
                            title="(kliknij aby zobaczyć więcej)"
                            trigger="hover"
                            visible={hovered}
                            onVisibleChange={handleHoverChange}
                            placement="bottomRight"
                        >
                            <Popover
                                content={
                                    <div>
                                        {clickContent}
                                        <a onClick={hide}>Zamknij</a>
                                    </div>
                                }
                                title="Twój koszyk"
                                trigger="click"
                                visible={clicked}
                                onVisibleChange={handleClickChange}
                                placement="bottomRight"
                            >
                                <Badge count={cart.getListProductsAmount()} overflowCount={99} style={{marginTop : 45, marginRight : 25}}>
                                    <ProfileOutlined style={{ fontSize: 40 }} className='trigger' />
                                </Badge>
                            </Popover>
                        </Popover>
                    </Header>

                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: '100vh',
                        }}
                    >
                        {getView()}
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default MainLayoutClient;