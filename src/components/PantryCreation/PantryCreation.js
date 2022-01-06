import React, { useState, useReducer } from 'react'
import './PantryCreation.css'
import { Button, InputNumber, Select, Space } from 'antd';
import PantryList from '../PantryList/PantryList';

const { Option } = Select;



const PantryCreation = (props) => {
    const [shopContent, setShopContent] = useState(props.shopContent);
    const [modName, setModName] = useState('')
    const [modCount, setModCount] = useState(1)
    const [editing, setEditing] = useState(false);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    function update() {
        console.log('calling force update from Dodaj button. shop contents are')
        forceUpdate();
    }

    const setCount = (value) => {
        setModCount(value)
    }

    const setProduct = (value) => {
        setModName(value)
    }

    const getOptionValues = (elems) => {
        return elems.map((prod) => {
            return <Option value={prod.name}>{prod.name}</Option>
        })
    }
    
   const handleClick = () => {
        props.additionHandler(modName,modCount); 
        setModName('');
        update();
   }

    const renderPantryLists = () => {
        return (
        <div className='content-bar'>
            {/*<PantryList editing={editing} pantryContent={pantryContent.slice(0,Math.ceil(pantryContent.length/2))} ></PantryList>}
            {<PantryList editing={editing} pantryContent={pantryContent.slice(Math.ceil(pantryContent.length/2))} ></PantryList>*/}
            
            {<PantryList editing={editing} key={1} pantryContent={props.pantryContent} deletionHandler={props.deletionHandler}></PantryList>}
        </div>);
    }

    return(
    <div className='edit-container'>
        <div className='edit-bar'>
        <Space direction='vertical'>
        
            <Button type="primary" shape="round" size={'large'} onClick={() => {setEditing(!editing)}}>
                EDYTUJ SPIŻARNIĘ
            </Button>

            {
            editing && 
            <Space direction='horizontal' >
                <Select
                    showSearch
                    placeholder="Wybierz produkt"
                    optionFilterProp="children"
                    onChange={setProduct}
                    filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
            >
                    {getOptionValues(shopContent)}
                </Select>
                    
                <InputNumber size="medium" min={1} max={100} defaultValue={1} onChange={setCount} />

                <Button type="primary" shape="rectangle" size={'medium'} onClick={handleClick}>
                    Dodaj
                </Button>
            </Space>
            }
        </Space>
        </div>
            {renderPantryLists()}
        </div>          
    )
}
export default PantryCreation

