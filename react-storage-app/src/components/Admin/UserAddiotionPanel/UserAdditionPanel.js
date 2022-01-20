import React from 'react'
import './UserAdditionPanel.css'
import AddUserForm from './AddUserForm/AddUserForm';
import { Divider } from 'antd';

const UserAdditionPanel = () =>{

    return (
        <div >
            <div className='card-info-entering-title'>
        UTWÓRZ KONTO PRACOWNICZE
      </div>
            <Divider />
            <AddUserForm/>
        </div>
  );
};

export default UserAdditionPanel