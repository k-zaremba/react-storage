import React, { useState } from 'react'
import './PantryCreation.css'
import { Button, InputNumber, Select, Space } from 'antd';
import PantryList from '../PantryList/PantryList';

const { Option } = Select;



const PantryCreation = (props) => {
    const [shopContent, setShopContent] = useState(props.shopContent);
    const [pantryContent, setPantryContent] = useState(props.pantryContent);
    const [modName, setModName] = useState('')
    const [modCount, setModCount] = useState(1)

    const [editing, setEditing] = useState(false);

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
    
    const handleAddition = () => {
        console.log(modName)
        console.log(modCount)

        var data = pantryContent;
        var val = modName

        var filteredObj = data.find(function(item, i){
            if(item.name === val){
                index = i;
                return i;
            }
        });

        var index = data.findIndex(function(item, i){
        return item.name === val
        });


        console.log(index); 



        if(index >= 0){
            pantryContent[index].count += modCount; 
        }else{
            pantryContent.push({name : modName, count : modCount});
        }

        console.log(filteredObj)
    }

    const renderPantryLists = () => {
        return (
        <div className='content-bar'>
            {/*<PantryList editing={editing} pantryContent={pantryContent.slice(0,Math.ceil(pantryContent.length/2))} ></PantryList>}
            {<PantryList editing={editing} pantryContent={pantryContent.slice(Math.ceil(pantryContent.length/2))} ></PantryList>*/}
            
            {<PantryList editing={editing} pantryContent={pantryContent}></PantryList>}
        </div>);
    }

    console.log(pantryContent)

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

                <Button type="primary" shape="rectangle" size={'medium'} onClick={handleAddition}>
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

