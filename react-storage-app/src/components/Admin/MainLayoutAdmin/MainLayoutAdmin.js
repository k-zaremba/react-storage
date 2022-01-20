import React, { useState, useEffect, useReducer } from 'react'
import { Layout, Menu, Spin } from 'antd';
import './MainLayoutAdmin.css'
import auth from '../../../auth.js'

import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, UsergroupAddOutlined, LogoutOutlined } from '@ant-design/icons';
import UsersPanel from '../UsersPanel/UsersPanel';
import UserAdditionPanel from '../UserAddiotionPanel/UserAdditionPanel';
import { useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;


const MainLayoutAdmin = () => {
    const [fetched, setFetched] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [activeWindow, setActiveWindow] = useState(1);
    const [usersFetched, setUsersFetched] = useState([]);
    const navigate = useNavigate()
    const [force, forceUpdate] = useReducer(x => x + 1, 0);

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const fetchUsers = () => {
        setFetched(false)
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        fetch('http://localhost:8080/storage/users', requestOptions)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                setUsersFetched(res)
                setFetched(true)
            })
    };

    const getView = () => {
        if (activeWindow === 1 && !fetched)
            return (
                <div className="admin-spinner">
                    <Spin />
                </div>
            );

        return (
            <div class="admin-panels">
                <div class="admin-content-list" id="admin-content-1">
                    {activeWindow === 1 && <UsersPanel forceUpdate={forceUpdate} content={usersFetched}></UsersPanel>}
                    {activeWindow === 2 && <UserAdditionPanel></UserAdditionPanel>}
                </div>
            </div>
        );
    }

    useEffect(() => {
        fetchUsers();
    }, [force])

    const logoutAccount = () => {
        auth.logout(() => { navigate('/'); sessionStorage.removeItem('user') });
    }

    return (
        <div>
            <Layout id='components-layout-demo-custom-trigger-admin'>

                <Sider className="sider-menu" trigger={null} collapsible collapsed={collapsed} />

                <Sider style={{ position: 'fixed' }} className="sider-menu" trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo"></div>
                    <Menu className='test-wrapper-admin' theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item   className="menu-item-selector" key="1" icon={< UserOutlined style={{fontSize : '20px'}} />} onClick={() => { setActiveWindow(1); forceUpdate() }} >
                            Użytkownicy
                        </Menu.Item>

                        <Menu.Item   className="menu-item-selector" key="2" icon={<UsergroupAddOutlined style={{fontSize : '20px'}}/>} onClick={() => { setActiveWindow(2) }} >
                            Utwórz konto
                        </Menu.Item>

                        <Menu.Item  className="menu-item-selector" key="4" icon={<LogoutOutlined style={{fontSize : '20px'}}/>} onClick={logoutAccount} >
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

export default MainLayoutAdmin;