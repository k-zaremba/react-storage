import React, { useState, useEffect } from 'react'
import './PantryItem.css'
import { Button, InputNumber, Divider, PageHeader, Row, Badge } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { EditOutlined, CheckOutlined } from '@ant-design/icons';



const PantryItem = (props) => {
    const [editing, setEditing] = useState(false);
    const [deleted, setDeleted] = useState(false)
    const [value, setValue] = useState(props.pair.quantity)
    const [dummyValue, setDummyValue] = useState(props.pair.quantity)

    useEffect(() => {
        setEditing(false)
    }, [props.isEdited])

    const deleteFromPantry = () =>{
        props.addToPantry(props.pair.product.id, -dummyValue);
        setDeleted(true)
    }

    const handleConfirm = () => {
        console.log(value)
        console.log(dummyValue)

        if (value == dummyValue) return;

        if(value == 0){
            console.log(value)
            deleteFromPantry();
            return;
        }

        props.addToPantry(props.pair.product.id, value - dummyValue);
        setDummyValue(value)
    }

    const handleDelete = () => {
        setTimeout(() => {
            deleteFromPantry();
        }, 250);
    }

    return (<>
        {!deleted && <>
        {!editing && <div className='pantry-list-item'>
            {props.isEdited &&
                <div className='pantry-item-buttons-holder' id='height-in-pantry-item'>
                    <Button onClick={() => { handleDelete(); }} type='danger' style={{ border: 'none', backgroundColor: 'rgba(0, 0, 0, 0)', color: 'red', boxShadow: '0 2px 0 rgb(0 0 0 / 2%)' }} icon={<CloseOutlined style={{ fontSize: 22 }} />} />
                    <Button onClick={() => { setEditing(!editing) }} style={{ border: 'none', backgroundColor: 'rgba(0, 0, 0, 0)' }}><EditOutlined style={{ fontSize: 22 }} /></Button>
                </div>}

            {dummyValue <= 2 && 
            <Badge.Ribbon placement='start' text="Mała ilość w spiżarni!" color="#e3a977">
            <PageHeader style={{ width: '500px' }}
            >

                <Row style={{ justifyContent: 'space-evenly' }}>
                    <img src={props.pair.product.imgUrl} width='140px' height='120px' />

                    <div style={{ margin: '0 10px' }}>
                        <p style={{ marginBottom: 4, color: 'rgba(0,0,0,0.45)', fontSize: '14px' }}> Nazwa produktu </p>
                        <p style={{ marginBottom: 0, color: 'rgba(0,0,0,0.85)', fontSize: '24px' }}> {props.pair.product.name} </p>
                        <p style={{ marginBottom: 4, color: 'rgba(0,0,0,0.45)', fontSize: '14px' }}> Ilość w spiżarni </p>


                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ marginBottom: 0, color: 'rgba(0,0,0,0.85)', fontSize: '24px', padding: '0px 11px' }}> {dummyValue} </p>
                        </div>
                    </div>
                </Row>
                <Divider />
            </PageHeader>
            </Badge.Ribbon>}

            {dummyValue > 2 &&
            <PageHeader style={{ width: '500px' }}
            >

                <Row style={{ justifyContent: 'space-evenly' }}>
                    <img src={props.pair.product.imgUrl} width='140px' height='120px' />

                    <div style={{ margin: '0 10px' }}>
                        <p style={{ marginBottom: 4, color: 'rgba(0,0,0,0.45)', fontSize: '14px' }}> Nazwa produktu </p>
                        <p style={{ marginBottom: 0, color: 'rgba(0,0,0,0.85)', fontSize: '24px' }}> {props.pair.product.name} </p>
                        <p style={{ marginBottom: 4, color: 'rgba(0,0,0,0.45)', fontSize: '14px' }}> Ilość w spiżarni </p>


                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ marginBottom: 0, color: 'rgba(0,0,0,0.85)', fontSize: '24px', padding: '0px 11px' }}> {dummyValue} </p>
                        </div>
                    </div>
                </Row>
                <Divider />
            </PageHeader>}

        </div>}

        {editing &&
            <div className='pantry-list-item-editing'>

                {props.isEdited &&
                    <div className='pantry-item-buttons-holder-editing'>
                        <Button onClick={() => { handleDelete(); }} type='danger' style={{ border: 'none', backgroundColor: 'rgba(0, 0, 0, 0)', color: 'red', boxShadow: '0 2px 0 rgb(0 0 0 / 2%)' }} icon={<CloseOutlined style={{ fontSize: 22 }} />} />
                        <Button onClick={() => { setEditing(!editing); handleConfirm(); }} style={{ border: 'none', backgroundColor: 'rgba(0, 0, 0, 0)' }}><CheckOutlined style={{ fontSize: 22 }} /></Button>
                    </div>}

                <PageHeader style={{ width: '500px' }}
                    onBack={() => { }}
                >

                    <Row style={{ justifyContent: 'space-evenly' }}>
                        <img src={props.pair.product.imgUrl} width='140px' height='120px' />

                        <div style={{ margin: '0 10px' }}>
                            <p style={{ marginBottom: 4, color: 'rgba(0,0,0,0.45)', fontSize: '14px' }}> Nazwa produktu </p>
                            <p style={{ marginBottom: 0, color: 'rgba(0,0,0,0.85)', fontSize: '24px' }}> {props.pair.product.name} </p>
                            <p style={{ marginBottom: 4, color: 'rgba(0,0,0,0.45)', fontSize: '14px' }}> Ilość w spiżarni </p>


                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <InputNumber style={{ fontSize: 24, borderBottom: 'solid 1px black' }} size={'middle'} min={0} max={500} defaultValue={dummyValue} bordered={false} onChange={(v) => { setValue(v) }}></InputNumber>
                            </div>
                        </div>
                    </Row>
                    <Divider />
                </PageHeader>

            </div>}
            
        </>}
    </>
    )
}

export default PantryItem