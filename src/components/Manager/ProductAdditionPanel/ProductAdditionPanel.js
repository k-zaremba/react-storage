import React from 'react'
import './ProductAdditionPanel.css'
import AddProductForm from './AddProductForm/AddProductForm';
import { Divider } from 'antd';

const ProductAdditionPanel = () => {

  return (
    <div>
      <div className='manager-stats-info-entering-title'>
        DODAJ PRODUKT DO SYSTEMU
      </div>
      <Divider />
      <AddProductForm></AddProductForm>
    </div>
  )
};

export default ProductAdditionPanel