import React from 'react'
import './UsersList.css'
import {Space, Divider} from 'antd';
import UserWorkerItem from '../UserWorkerItem/UserWorkerItem';
import UserClientItem from '../UserClientItem/UserClientItem';


const UsersList = (props) =>{

    const displayWorkersList = (elems) => {

        return elems.map((user) => {
            return <UserWorkerItem userEdit={{position : null, email : null, password : null}} forceUpdate={props.forceUpdate} userInfo={user}></UserWorkerItem>
        })
    }

    const displayClientsList = (elems) => {

        return elems.map((user) => {
            return <UserClientItem userEdit={{regular : null, email : null, password : null, phone : null}} forceUpdate={props.forceUpdate} userInfo={user}></UserClientItem>
        })
    }

    function compare(a, b) {
        if (a.id < b.id)
           return -1
        if (a.id > b.id)
           return 1
        return 0
     }

    const filterWorkers = () => {
        var workers = props.content.filter((u) => {return u.worker})
        var workers = workers.filter((u) => {return u.id != 1})
        return workers.sort(compare)
    }

    const filterClients = () => {
        var clients = props.content.filter((u) => {return u.client})
        return clients.sort(compare)
    }

    return (
        <div>
            <div className='users-list'>
                <Divider style={{fontSize : '30px', fontWeight : 400}}>PRACOWNICY</Divider>
                <Space size={[8, 16]} wrap>
                    {displayWorkersList(filterWorkers())}
                </Space >
            </div>
            
            <Divider style={{fontSize : '30px', fontWeight : 400}}>KLIENCI</Divider>
                <Space size={[8, 16]} wrap>
                    {displayClientsList(filterClients())}
                </Space >
        </div>
    )
}

export default UsersList