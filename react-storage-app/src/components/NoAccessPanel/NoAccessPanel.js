import React from 'react'
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NoAccessPanel = () => {
  const navigate = useNavigate();

  return (
    <div className='out-wrapper'>
    <Result 
    status="403"
    title="403"
    subTitle="Nie masz wystarczających uprawnień."
    extra={<Button type="primary" onClick={() => navigate(-2)}>Powrót</Button>}
    /></div>

  );
};

export default NoAccessPanel