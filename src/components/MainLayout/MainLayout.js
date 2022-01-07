import React, { useState, useEffect, useReducer} from 'react'
import { Layout, Menu } from 'antd';
import StoreList from '../StoreList/StoreList'
import HistoryPanel from '../HistoryPanel/HistoryPanel';

import './MainLayout.css'

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    ShoppingCartOutlined,
    UnorderedListOutlined,
    LogoutOutlined,
    TeamOutlined
  } from '@ant-design/icons';
import ShoppingList from '../ShoppingList/ShoppingList';
import PantryPanel from '../PantryPanel/PantryPanel';
import WelcomePanel from '../WelcomePanel/WelcomePanel';
import RegisterPanel from '../RegisterPanel/RegisterPanel';
import PaymentPanel from '../PaymentPanel/PaymentPanel';
import CardPaymentPanel from '../CardPaymentPanel/CardPaymentPanel';
import CardPaymentConfirmationPanel from '../CardPaymentConfirmationPanel/CardPaymentConfirmationPanel';
import CashPaymentConfirmationPanel from '../CashPaymentConfirmationPanel/CashPaymentConfirmationPanel';

const { Header, Sider, Content } = Layout;


const MainLayout = () => {

    const [collapsed, setCollapsed] = useState(false);
    const [clientState, setClientState] = useState('logged');
    const [option, setOption] = useState(6); // TODO: zmiana na 1
    const [storeContentFetched, setStoreContentFetched] = useState([]);
    const [shoppingListContent, setShoppingListContent] = useState([]);
    const [historyContent, setHistoryContent] = useState([]);
    const [pantryContent, setPantryContent] = useState([]);

    
    const [force, forceUpdate] = useReducer(x => x + 1, 0);

    function update() {
        console.log('calling force update from MainLayout.update() button.')
        forceUpdate();
    }

    const toggle = () => {
        setCollapsed(!collapsed);
    };


    const shoppingListAdditionHandler = (item, count) => {
        if (count === 0) return;

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

        var indexInStore = storeContentFetched.findIndex(function(item, i){
            return item.name === val
        });

        var url = storeContentFetched[indexInStore].imgUrl

        if(index >= 0){
            data[index].count += modCount; 
        }else{
            data.push({name : modName, count : modCount, img_url : url});
        }

        setPantryContent(data)
    }

    const historyListImportHandler = (content) => {
        var data = shoppingListContent;

        content.forEach(elem => {
            var idx = data.findIndex(i => i.name === elem.name);

            if (idx != -1) {
                data[idx].count += elem.count
            }else{
                data.push({name: elem.name, count: elem.count})
            }
        });
        
        console.log(content);
        setShoppingListContent(data);
    }

    const historyListDeletionHandler = (name) => {
        console.log('deletion history called.')
        setHistoryContent(historyContent.filter((elem) => { return elem.name !== name }))
    }

    const pantryListDeletionHandler = (prod) => {
        console.log('deletion pantry called.')
        setPantryContent(pantryContent.filter((elem) => { return elem.name !== prod.name }))
    }
        
    const shoppingListDeletionHandler = (prod) => {
        console.log('deletion shopping called.')
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
                        {option===3 && <HistoryPanel forceUpdate={forceUpdate} historyContent={historyContent} importHandler={historyListImportHandler} deletionHandler={historyListDeletionHandler}></HistoryPanel>}
                        {option===4 && <StoreList forceUpdate={forceUpdate} content={storeContentFetched} additionHandler={shoppingListAdditionHandler}></StoreList>}
                    </div>
                    <div class ="lista" id="content2">
                        <ShoppingList content={shoppingListContent} deletionHandler={shoppingListDeletionHandler} force={force} setOption={setOption}></ShoppingList>
                    </div>
                </div>
        );
    }

    const getPayment = () => {
        return (
            <PaymentPanel setOption={setOption}></PaymentPanel>
        )
    }

    const getCardPayment = () => {
        return (
            <CardPaymentPanel setOption={setOption}></CardPaymentPanel>
        )
    }

    const getCardConfirmation = () => {
        return (
            <CardPaymentConfirmationPanel setOption={setOption}></CardPaymentConfirmationPanel>
        )
    }

    const getCashConfirmation = () => {
        return (
            <CashPaymentConfirmationPanel setOption={setOption}></CashPaymentConfirmationPanel>
        )
    }

    useEffect(() => { // fetch conenet on page load
        fetchStoreContent();
        console.log(storeContentFetched)
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

            const listaNazwana = {
                name : "Lista na szybkie śniadanie!",
                content : [
                    {name : "bułka", count : 3},
                    {name : "szynka 200g", count : 2},
                    {name : "masło", count : 1},
                    {name : "ketchup", count : 1}]
                };
        
            const listaNienazwana = {
                name : "Środa 13/12/2021 18:23",
                content : [
                    {name : "jajka 1 szt", count : 3},
                    {name : "szynka 200g", count : 3},
                    {name : "jogurt naturalny", count : 3}]
                };
            
            const listaNienazwana1 = {
                    name : "Środa 13/12/2021 18:24",
                    content : [
                        {name : "jajka 1 szt", count : 3},
                        {name : "szynka 200g", count : 1},
                        {name : "jogurt naturalny", count : 3}]
                };
                
            const historyListsFetched = [listaNazwana, listaNienazwana, listaNienazwana1];

            setHistoryContent(historyListsFetched);
    }, [])

    useEffect(() => {
        if(clientState=='logged'){
            console.log('logged from useEffect')
            // fetch pantry from database if user is normal client and history lists
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
                    clientState==='logged' && (1 <= option && option <= 5) && 
                    getStore()
                }
                
                {   
                    clientState==='logged' && option === 6 && 
                    getPayment()
                }

                {   
                clientState==='logged' && option === 7 && 
                    getCardPayment()
                }

                {clientState==='logged' && option === 8 && 
                    getCashConfirmation()
                }

                {clientState==='logged' && option === 9 && 
                    getCardConfirmation()
                }

                

            </Content>
            </Layout>
        </Layout>
        </div>
    )
    }

export default MainLayout;