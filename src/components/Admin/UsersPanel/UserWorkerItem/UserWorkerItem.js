import React, { useState, useEffect } from 'react'
import './UserWorkerItem.css'
import { Input, Select, Card, Divider } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';

const UserItem = (props) => {

    const { Option } = Select;

    const [editing, setEditing] = useState(false);
    const [actions, setActions] = useState([]);

    const setEmail = (v) =>{
        props.userEdit.email = v 
    }
    
    const setPosition = (v) =>{
        props.userEdit.position = v 
    }
    const setPassword = (v) =>{
        props.userEdit.password = v 
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

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                password: props.userEdit.password,
                email: props.userEdit.email,
                permission: props.userEdit.position
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
            <EditOutlined key="edit" onClick={enterEditing}/>,
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
            <EditOutlined key="edit" onClick={enterEditing}/>
        ])
        resetValues();
    }

    const resetValues = () => {
        setPassword(null)
        setPosition(null)
        setEmail(null)
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
            <Card headStyle={{fontSize : '20px'}} className='worker-t' title={"Id pracownika: " + props.userInfo.worker.id}
            bordered={true} hoverable 
                actions={actions}
            >

                <div className='user-info'>
                    <div className='user-info-name'>Imię</div>
                    <div>{props.userInfo.worker.firstname}</div>
                </div>

                <div className='user-info'>
                    <div className='user-info-name'>Nazwisko</div>
                    <div>{props.userInfo.worker.lastname}</div>
                </div>

                <div className='user-info'>
                    <div className='user-info-name'>Login</div>
                    <div>{props.userInfo.login}</div>
                </div>

                <Divider/>

                {!editing && <div className='user-info'>
                    <div className='user-info-name'>Stanowisko</div>
                    <Select disabled bordered={false} defaultValue={props.userInfo.worker.position} />
                </div>}

                {editing && <div className='user-info'>
                    <div className='user-info-name' >Stanowisko</div>
                    <Select className='selecting' defaultValue={props.userInfo.worker.position} bordered={false} onChange={(option) => { setPosition(option) }}>
                        <Option value="2">Pracownik</Option>
                        <Option value="1">Menedżer</Option>
                    </Select>
                </div>}

                {!editing && <div className='user-info'>
                    <div className='user-info-name'>Email</div>
                    <Input id='user-input-vals'  style={{textAlign : 'right'}} bordered={false} disabled value={props.userInfo.email} ></Input>
                </div>}

                {editing && <div className='user-info'>
                    <div className='user-info-name'>Email</div>
                    <Input id='user-input-vals' style={{borderBottom : 'solid 1px #8ca7bf', textAlign : 'right'}} bordered={false} defaultValue={props.userInfo.email} onChange={(e) => { setEmail(e.target.value) }}></Input>
                </div>}

                {!editing && <div className='user-info'>
                    <div className='user-info-name'></div>
                    <Input id='user-input-vals' bordered={false} disabled></Input>
                </div>}

                {editing && <div className='user-info'>
                    <div className='user-info-name'>Nowe hasło</div>
                    <Input id='user-input-vals' style={{borderBottom : 'solid 1px #8ca7bf', textAlign : 'right'}} bordered={false} onChange={(e) => { setPassword(e.target.value) }}></Input>
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

export default UserItem