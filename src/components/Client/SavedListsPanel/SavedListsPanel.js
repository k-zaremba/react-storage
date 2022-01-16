import React, { useState, useEffect } from 'react'
import './SavedListsPanel.css'
import { Divider, BackTop } from 'antd';
import { Input, Space } from 'antd';
import { Select, Spin, Card, List } from 'antd';
import { Drawer, Button } from 'antd';
import { UpCircleFilled, } from '@ant-design/icons';
import { EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import SavedList from './SavedList/SavedList';
import InfiniteScroll from 'react-infinite-scroll-component';

const { Search } = Input;
const { Option } = Select;


const SavedListsPanel = (props) => {
    const [searchValue, setSearchValue] = useState("")
    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(true);
    const [savedListsFetched, setSavedListsFetched] = useState([]);
    const [visible, setVisible] = useState(false);
    const [editing, setEditing] = useState(false);
    const [drawerContent, setDrawerContent] = useState([])
    const [drawerName, setDrawerName] = useState('')
    const [newName, setNewName] = useState('')



    const fetchSavedLists = () => {
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
        fetch(`http://localhost:8080/storage/shoppinglist/${user.client.id}`, requestOptions)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                setSavedListsFetched(res)
                setFetched(true)
                setLoading(false)
            })
    };

    const displaySavedListsFiltered = (elems) => {
        return elems.filter((elem) => {
            const elemName = elem.shoppingList.nameList.toLowerCase();
            return elemName.includes(searchValue.toLowerCase())}).map((pair) => {
            return <SavedList pair={pair} setDrawerName={setDrawerName} setDrawerContent={setDrawerContent} showDrawer={showDrawer} closeDrawer={closeDrawer}></SavedList>
    })}

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
        setEditing(false)
    };

    const closeDrawer = () => {
        setVisible(false)
    };

    const getDrawerContent = () => {
        var content = drawerContent;
        var price = 0;
        content.forEach((elem) => {price += elem.product.value * elem.quantity})
        return (
            <>
                {!editing && 
                    <>
                        <div style={{marginBottom : '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Button onClick={() => { setEditing(!editing) }} style={{ border: 'none',  backgroundColor : 'rgba(0,0,0,0)' }}><EditOutlined style={{ fontSize: '18px'}} /></Button>

                        </div>
                        <div style={{ fontSize: '25px', textAlign: 'center', width: '100%' }}>{drawerName}</div>
                    </>
                }

                {editing && 
                    <>
                        <div style={{marginBottom : '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Button onClick={() => { }} type='danger' style={{ border: 'none', backgroundColor: 'rgba(0, 0, 0, 0)', color: 'red', boxShadow: '0 2px 0 rgb(0 0 0 / 2%)' }} icon={<DeleteOutlined style={{ fontSize: 22 }} />} />
                            <Button onClick={() => {setEditing(!editing)}} style={{ border: 'none', backgroundColor : 'rgba(0,0,0,0)' }}><CheckOutlined style={{ fontSize: '18px' }} /></Button>
                        </div>
                        <Input style={{ fontSize: 25, borderBottom: 'solid 1px black' }} size={'middle'} defaultValue={drawerName} bordered={false} onChange={(v) => { setNewName(v) }}></Input>

                    </>
                }

                <Divider />

                <InfiniteScroll
                    dataLength={20}
                    hasMore={false}
                    endMessage={<Divider style={{ fontSize: '17px' }} plain>{price.toFixed(2)} zł</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        dataSource={content}
                        renderItem={elem => (
                            <List.Item style={{padding : '7px', justifyContent : 'space-around'}} key={elem.product.id}>
                                    <div style={{ width: '200px', textAlign: 'left', fontSize: '17px' }}>{elem.product.name}</div>
                                    <div style={{ fontSize: '17px' }}>{elem.quantity}</div>
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>


            </>
        );

    }

    useEffect(() => {
        if (loading)
            fetchSavedLists();
    }, [])

    return (
        <div className="saved-lists-panel">
            <div className='payment-title-client'>
                TWOJE LISTY
            </div>
            <Divider />
            <div style={{ marginTop: 16 }}>

            </div>
            {!fetched &&
                <div className="admin-spinner">
                    <Spin />
                </div>
            }

            {fetched &&
                <>
                    <div class='search-filter-bar'>
                        <Search size={'large'} placeholder="input search text" allowClear value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} onSearch={(val) => { setSearchValue(val) }} />
                    </div>

                    <div className='saved-lists-panel-content'>
                        {displaySavedListsFiltered(sortListsByName(savedListsFetched))}
                    </div>

                    <Drawer
                        placement="right"
                        closable={false}
                        onClose={closeDrawer}
                        visible={visible}
                        getContainer={true}
                        autoFocus={false}
                        style={{position: 'absolute', top: `${window.pageYOffset}px` }}
                    >
                        {getDrawerContent(drawerContent)}
                    </Drawer>
                </>
            }

            <BackTop>
                <UpCircleFilled style={{ fontSize: '40px', color: 'rgb(0,21,41)' }} />
            </BackTop>
        </div>
    )
}

export default SavedListsPanel