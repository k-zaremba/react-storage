import React from 'react'
import './NotFoundPanel.css'
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFoundPanel = () => {
  const navigate = useNavigate();

  return (
    <div className='out-wrapper'>
    <Result 
    status="404"
    title="404"
    subTitle="Ta strona nie istnieje."
    extra={<Button type="primary" onClick={() => navigate(-1)}>Powrót</Button>}
    /></div>

  );
};

export default NotFoundPanel