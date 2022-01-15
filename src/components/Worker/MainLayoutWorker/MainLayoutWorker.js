import React, { useState, useEffect, useReducer } from 'react'
import { Layout, Menu, Spin } from 'antd';
import StoreList from '../StoreList/StoreList'
import OrdersPanel from '../OrdersPanel/OrdersPanel';
import { useNavigate } from 'react-router-dom';
import auth from '../../../auth.js'

import './MainLayoutWorker.css'

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ProjectOutlined,
    UnorderedListOutlined,
    LogoutOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;


const MainLayoutWorker = () => {

    const [collapsed, setCollapsed] = useState(false);
    const [activeWindow, setActiveWindow] = useState(1);
    
    const [storeContentFetched, setStoreContentFetched] = useState([]);
    const [ordersFetched, setOrdersFetched] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [force, forceUpdate] = useReducer(x => x + 1, 0);
    const navigate = useNavigate()

    const toggle = () => {
        setCollapsed(!collapsed);
    };

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

    const fetchOrders = () => {
        setFetched(false)
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        fetch('http://localhost:8080/storage/order/list', requestOptions)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                setOrdersFetched(res)
                setFetched(true)
            })
    };

    const getView = () => {

        if (!fetched) {
            return (
                <div className="admin-spinner">
                    <Spin />
                </div>
            );
        }

        return (
            <div class="worker-panels">
                <div class="worker-content-list" id="worker-content-1">
                    {activeWindow === 1 && <StoreList forceUpdate={forceUpdate} content={storeContentFetched}></StoreList>}
                    {activeWindow === 2 && <OrdersPanel forceUpdate={forceUpdate} content={ordersFetched} ></OrdersPanel>}
                </div>
            </div>
        );
    }

    const logoutAccount = () => {
        auth.logout(() => { navigate('/'); sessionStorage.removeItem('user') });
    }

    useEffect(() => { 
        if(activeWindow === 1)
            fetchStoreContent();
        if(activeWindow === 2)
            fetchOrders();
    }, [force])

    return (
        <div>
            <Layout id='components-layout-demo-custom-trigger-worker'>
            <Sider className="sider-menu" trigger={null} collapsible collapsed={collapsed} />

                <Sider style={{ position: 'fixed' }} className="sider-menu" trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo" />
                    <Menu className='test-wrapper-worker' theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" className="menu-item-selector" icon={<ProjectOutlined style={{fontSize : '20px'}} />} onClick={() => { setActiveWindow(1); forceUpdate() }} >
                            Stan
                        </Menu.Item>

                        <Menu.Item key="2" className="menu-item-selector" icon={<UnorderedListOutlined style={{fontSize : '20px'}}/>} onClick={() => { setActiveWindow(2); forceUpdate() }} >
                            Zamówienia
                        </Menu.Item>

                        <Menu.Item key="4" className="menu-item-selector" icon={<LogoutOutlined style={{fontSize : '20px'}}/>} onClick={logoutAccount} >
                            Wyloguj
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} >
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => { toggle() },
                        })}
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

export default MainLayoutWorker;