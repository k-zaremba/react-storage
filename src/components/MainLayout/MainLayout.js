import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import StoreList from '../StoreList/StoreList'
import HistoryPanel from '../HistoryPanel/HistoryPanel';

import './MainLayout.css'

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    ShoppingCartOutlined,
    UnorderedListOutlined,
    LogoutOutlined,
    TeamOutlined
  } from '@ant-design/icons';
import ShoppingList from '../ShoppingList/ShoppingList';
import PantryPanel from '../PantryPanel/PantryPanel';
import WelcomePanel from '../WelcomePanel/WelcomePanel';
import RegisterPanel from '../RegisterPanel/RegisterPanel';

const { Header, Sider, Content } = Layout;


const MainLayout = () => {

    const [collapsed, setCollapsed] = useState(false);
    const [clientState, setClientState] = useState('logged');
    const [option, setOption] = useState(1);
    const [shopContentFetched, setShopContentFetched] = useState([]);


    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const fetchStoreContent = () => {

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
                setShopContentFetched(res)
            })
    };
    

    const getStore = () => {
        return (
                <div class="panels">
                    <div class ="lista" id="content1">
                        {option===1 && <PantryPanel content={shopContentFetched}></PantryPanel>}
                        {option===3 && <HistoryPanel></HistoryPanel>}
                        {option===4 && <StoreList content={shopContentFetched}></StoreList>}
                    </div>
                    <div class ="lista" id="content2">
                        <ShoppingList></ShoppingList>
                    </div>
                </div>
        );
    }

    return(
        <div>
            <Layout>
            <Sider className="sider-menu" trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<UserOutlined />} onClick={()=>{setOption(1)}} >
                Spiżarnia
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined /> } onClick={()=>{setOption(2)}} >
                Nasz wybór!
                </Menu.Item>
                <Menu.Item key="3" icon={<UnorderedListOutlined />} onClick={()=>{setOption(3)}} >
                Historia
                </Menu.Item>
                <Menu.Item key="4" icon={<ShoppingCartOutlined />} onClick={()=>{fetchStoreContent(); setOption(4)}} >
                Sklep
                </Menu.Item>
                <Menu.Item key="5" icon={<TeamOutlined />} onClick={()=>{setOption(5)}} >
                Inni polecają
                </Menu.Item>
                <Menu.Item key="6" icon={<LogoutOutlined />} onClick={()=>{setClientState('logging')}} >
                LOGOUT
                </Menu.Item>
            </Menu>
            </Sider>
            <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} >
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: ()=>{toggle()},
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

                {
                    clientState==='logging' &&
                    <div>
                        <WelcomePanel setClientState={setClientState}></WelcomePanel>
                    </div>
                }

                {
                    clientState==='registering' &&
                    <div>
                        <RegisterPanel setClientState={setClientState}></RegisterPanel>
                    </div>
                }
                
                {
                    clientState==='logged' && 
                    getStore()
                }


            </Content>
            </Layout>
        </Layout>
        </div>
    )
    }

export default MainLayout;