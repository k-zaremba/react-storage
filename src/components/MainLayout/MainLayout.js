import React, { useState, useEffect} from 'react'
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
    const [storeContentFetched, setStoreContentFetched] = useState([]);
    const [shoppingListContent, setShoppingListContent] = useState([]);
    const [pantryContent, setPantryContent] = useState([]);


    const toggle = () => {
        setCollapsed(!collapsed);
    };


    const shoppingListAdditionHandler = (item, count) => {
        var content = shoppingListContent;
        var idx = content.findIndex(i => i.name === item.name);

        if (idx != -1) {
            content[idx].count += count
        }else{
            content.push({name: item.name, count: count})
        }
        
        console.log(content);
        setShoppingListContent(content);
    }

    
    const pantryListAdditionHandler = (modName, modCount) => {

        if(modName == '') return

        var data = pantryContent;
        var val = modName

        var index = data.findIndex(function(item, i){
        return item.name === val
        });

        console.log(index); 

        if(index >= 0){
            data[index].count += modCount; 
        }else{
            data.push({name : modName, count : modCount});
        }

        setPantryContent(data)
    }

    const pantryListDeletionHandler = (prod) => {
        console.log('deletion called.')
        setPantryContent(pantryContent.filter((elem) => { return elem.name !== prod.name }))
    }
        
    const shoppingListDeletionHandler = (prod) => {
        console.log('deletion called.')
        setShoppingListContent(shoppingListContent.filter((elem) => { return elem.name !== prod.name }))
    }

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
                setStoreContentFetched(res)
            })
    };
    

    const getStore = () => {
        return (
                <div class="panels">
                    <div class ="lista" id="content1">
                        {option===1 && <PantryPanel shopContent={storeContentFetched} pantryContent={pantryContent} additionHandler={pantryListAdditionHandler} deletionHandler={pantryListDeletionHandler}></PantryPanel>}
                        {option===3 && <HistoryPanel></HistoryPanel>}
                        {option===4 && <StoreList content={storeContentFetched} additionHandler={shoppingListAdditionHandler}></StoreList>}
                    </div>
                    <div class ="lista" id="content2">
                        <ShoppingList content={shoppingListContent} deletionHandler={shoppingListDeletionHandler}></ShoppingList>
                    </div>
                </div>
        );
    }

    useEffect(() => { // fetch conenet on page load
        fetchStoreContent();
        console.log("mounted. filled.")

        setPantryContent([
            {img_url : 'http://www.leclerc.rzeszow.pl/foto_shop/177/5906040063522_T1.jpg', name : "masło", count : 3},
            {img_url : 'http://www.leclerc.rzeszow.pl/foto_shop/177/5906040063522_T1.jpg', name : "bułka", count : 2},
            {img_url : 'https://www.pngall.com/wp-content/uploads/2016/04/Carrot-PNG.png', name : "cebula", count : 2},
            {img_url : 'https://www.pngall.com/wp-content/uploads/2016/04/Carrot-PNG.png', name : "marchew 250g", count : 2},
            {img_url : 'https://e-delikatesydwojka.pl//app/uploads/2019/12/szynka_z_kotla.png', name : "szynka 200g", count : 2},
            {img_url : 'https://e-delikatesydwojka.pl//app/uploads/2019/12/szynka_z_kotla.png', name : "ketchup", count : 2},
            {img_url : 'http://www.leclerc.rzeszow.pl/foto_shop/177/5906040063522_T1.jpg', name : "ryż biały", count : 2},
            {img_url : 'https://e-delikatesydwojka.pl//app/uploads/2019/12/szynka_z_kotla.png', name : "sól 1kg", count : 2},
            {img_url : 'http://www.leclerc.rzeszow.pl/foto_shop/177/5906040063522_T1.jpg', name : "ziemniak", count : 2},
            {img_url : 'https://www.pngall.com/wp-content/uploads/2016/04/Carrot-PNG.png', name : "mleko", count : 6},
            {img_url : 'http://www.leclerc.rzeszow.pl/foto_shop/177/5906040063522_T1.jpg', name : "jogurt naturalny", count : 2}])
    }, [])

    useEffect(() => {
        if(clientState=='logged'){
            console.log('logged from useEffect')
            // fetch pantry from database if user is normal client
        }
    }, [clientState])

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
                <Menu.Item key="4" icon={<ShoppingCartOutlined />} onClick={()=>{setOption(4)}} >
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