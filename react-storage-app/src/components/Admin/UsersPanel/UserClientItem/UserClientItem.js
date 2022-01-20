import React, { useState, useEffect } from 'react'
import { Input, Select, Button, Card, Divider } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import './UserClientItem.css'

const UserClientItem = (props) => {

    const { Option } = Select;

    const [editing, setEditing] = useState(false);
    const [actions, setActions] = useState([]);

    const setEmail = (v) => {
        props.userEdit.email = v
    }

    const setRegular = (v) => {
        props.userEdit.regular = v
    }

    const setPassword = (v) => {
        props.userEdit.password = v
    }

    const setPhone = (v) => {
        props.userEdit.phone = v
    }

    const deleteUser = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        fetch(`http://localhost:8080/storage/user/delete?userId=${props.userInfo.id}`, requestOptions)
    }

    const postChanges = () => {
        console.log(props.userEdit.password)
        console.log(props.userEdit.email)
        console.log(props.userEdit.phone)
        console.log(props.userEdit.regular)

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                password: props.userEdit.password,
                email: props.userEdit.email,
                phoneNumber: props.userEdit.phone,
                isRegular: props.userEdit.regular
            })
        };

        fetch(`http://localhost:8080/storage/user/edit/${props.userInfo.id}`, requestOptions)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
            })
    }
 
    useEffect(() => {
        setActions([
            <EditOutlined key="edit" onClick={enterEditing}/>
          ])
    }, [])

    const enterEditing = () => {
        setEditing(true)
        setActions([
            <DeleteOutlined key="setting" onClick={handleDelete} />,
            <EditOutlined key="edit" onClick={handleCancelEditing} />,
            <CheckOutlined key="ellipsis" onClick={handleCommitEditing} />
        ])
    }

    const handleDelete = () => {
        delUser();
        setEditing(false)
        setActions([
            <EditOutlined key="edit" onClick={enterEditing} />
        ])
    }

    const handleCommitEditing = () => {
        editUserData()
        setEditing(false)
        setActions([
            <EditOutlined key="edit" onClick={enterEditing} />
        ])
    }

    const handleCancelEditing = () => {
        setEditing(false)
        setActions([
            <EditOutlined key="edit" onClick={enterEditing} />
        ])
        resetValues();
    }


    const resetValues = () => {
        setPassword(null)
        setEmail(null)
        setPhone(null)
        setRegular(null)
    }

    const editUserData = () => {
        postChanges();
        resetValues();
        props.forceUpdate();
    }

    const delUser = () => {
        deleteUser();
        resetValues();
        props.forceUpdate();
    }

    const getUserInfo = () => {
        return (
            <Card headStyle={{ fontSize: '20px' }} className='worker-t' title={"Id klienta: " + props.userInfo.client.id}
                bordered={true} hoverable
                actions={actions}
            >
                <div className='user-info'>
                    <div className='user-info-name'>Imię</div>
                    <div className='user-info-in-place'>{props.userInfo.client.firstname}</div>
                </div>

                <div className='user-info'>
                    <div className='user-info-name'>Nazwisko</div>
                    <div className='user-info-in-place'>{props.userInfo.client.lastname}</div>
                </div>

                <div className='user-info'>
                    <div className='user-info-name'>login</div>
                    <div className='user-info-in-place'>{props.userInfo.login}</div>
                </div>

                <Divider />

                {!editing && <div className='user-info'>
                    <div className='user-info-name'>Stały klient</div>
                    <Select disabled bordered={false}  style={{ marginLeft : 'auto'}} defaultValue={props.userInfo.client.isRegular ? 'tak' : 'nie'} />
                </div>}

                {editing && <div className='user-info'>
                    <div className='user-info-name'>Stały klient</div>
                    <Select bordered={false} style={{ marginLeft : 'auto'}} defaultValue={props.userInfo.client.isRegular ? 'tak' : 'nie'} onChange={(option) => { setRegular(option) }}>
                        <Option value="true">tak</Option>
                        <Option value="false">nie</Option>
                    </Select>
                </div>}

                {!editing && <div className='user-info'>
                    <div className='user-info-name'>Nr telefonu</div>
                    <Input id='user-input-vals' style={{ textAlign: 'right' }} bordered={false} disabled value={props.userInfo.client.phoneNumber}></Input>
                </div>}

                {editing && <div className='user-info'>
                    <div className='user-info-name'>Nr telefonu</div>
                    <Input id='user-input-vals' style={{ borderBottom: 'solid 1px #8ca7bf', textAlign: 'right' }} bordered={false} defaultValue={props.userInfo.client.phoneNumber} onChange={(e) => { setPhone(e.target.value) }}></Input>
                </div>}

                {!editing && <div className='user-info'>
                    <div className='user-info-name'>Email</div>
                    <Input id='user-input-vals' style={{ textAlign: 'right'  }} bordered={false} disabled value={props.userInfo.email}></Input>
                </div>}

                {editing && <div className='user-info'>
                    <div className='user-info-name'>Email</div>
                    <Input id='user-input-vals' style={{ borderBottom: 'solid 1px #8ca7bf', textAlign: 'right' }} bordered={false} defaultValue={props.userInfo.email} onChange={(e) => { setEmail(e.target.value) }}></Input>
                </div>}

                {!editing && <div className='user-info'>
                    <div className='user-info-name'></div>
                    <Input id='user-input-vals' bordered={false} disabled></Input>
                </div>}

                {editing && <div className='user-info'>
                    <div className='user-info-name'>Nowe hasło</div>
                    <Input id='user-input-vals' style={{ borderBottom: 'solid 1px #8ca7bf', textAlign: 'right'}} bordered={false} onChange={(e) => { setPassword(e.target.value) }}></Input>
                </div>}
            </Card>
        );
    }

    return (
        <div>
            {getUserInfo()}
        </div>
    )
}

export default UserClientItem