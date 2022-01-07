import React, { useState } from 'react'
import './CardPaymentPanel.css'
import { Form, Input, Button, Select, Row, Col} from 'antd';
import Cleave from 'cleave.js/react';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 3,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const tailFormItemLayout = {
  wrapperCol: {
      xs: {
      span: 24,
      offset: 0,
      },
      sm: {
      span: 16,
      offset: 8,
      },
  },
};

const { Option } = Select;

const CardPaymentPanel = (props) =>{

    const onFinish = (values) => {
        console.log(values);
        props.setOption(9);
      };
    
        return (
          <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
          

          <Form.Item 
          name={['card', 'card-number']}
          label="Numer karty"
          rules={[
            {
              required: true,
              message: 'To pole jest wymagane!'
            },
          ]}
          >
            <Cleave
              className='ant-input'
              placeholder="XXXX XXXX XXXX XXXX"
              options={{creditCard: true}}
              onChange={event => { console.log(event.target.rawValue, event.target.value) }}
            />
          </Form.Item>



          <Form.Item
            name={['user', 'name']}
            label="Imię i nazwisko posiadacza"
            rules={[
              {
                required: true,
                message: 'To pole jest wymagane!'
              },
            ]}
          >  
          <Input placeholder="Jan Kowalski"/>
          </Form.Item>

          <Form.Item label="Data ważności">
          <Row gutter={8}>
          <Col span={8}>
            <Form.Item
              name={['user', 'month']}
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Wprowadź odpowiedni miesiąc',
                },
              ]}
            >
              <Select>
                  <Option value="01">01</Option>
                  <Option value="02">02</Option>
                  <Option value="03">03</Option>
                  <Option value="04">04</Option>
                  <Option value="05">05</Option>
                  <Option value="06">06</Option>
                  <Option value="07">07</Option>
                  <Option value="08">08</Option>
                  <Option value="09">09</Option>
                  <Option value="10">10</Option>
                  <Option value="11">11</Option>
                  <Option value="12">12</Option>
              </Select>
            </Form.Item >
          </Col>
          <div style={{fontSize : '18px', marginLeft : '10px', marginRight : '10px'}}>/</div>
          <Col span={8}>
          <Form.Item
              name={['user', 'year']}
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Wprowadź odpowiedni rok',
                },
              ]}
            >
          <Select>
                <Option value="21">21</Option>
                <Option value="22">22</Option>
                <Option value="23">23</Option>
                <Option value="24">24</Option>
                <Option value="25">25</Option>
                <Option value="26">26</Option>
                <Option value="27">27</Option>
                <Option value="28">28</Option>
                <Option value="29">29</Option>
            </Select>
            </Form.Item >
          </Col>
          </Row>
          </Form.Item>

          <Form.Item name={['user', 'ccv']} label="CCV"
          rules={[
            {
              required: true,
              message: 'To pole jest wymagane!'
            },
          ]}>
            <Input.Password />
          </Form.Item>


          <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Zapłać
          </Button>
          <Button type="ghost" htmlType="submit">
            
          </Button>
          <Button onClick={() => {props.setOption(6)}}>
            Anuluj
          </Button>
        </Form.Item>
            
            
        </Form>
      );
}

export default CardPaymentPanel