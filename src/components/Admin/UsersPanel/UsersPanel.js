import React from 'react'
import UsersList from './UsersList/UsersList';
import './UsersPanel.css'
import { BackTop } from 'antd';
import { UpCircleFilled  } from '@ant-design/icons';

const UsersPanel = (props) =>{

    return (
        <div>
            <UsersList content={props.content} forceUpdate={props.forceUpdate}></UsersList>
            <BackTop>
                <UpCircleFilled style={{fontSize : '40px', color : 'rgb(0,21,41)'}}/>
            </BackTop>
        </div>
    )
}

export default UsersPanel