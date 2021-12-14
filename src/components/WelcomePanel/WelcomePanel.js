import React from 'react'
import './WelcomePanel.css'

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const WelcomePanel = (props) =>{

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        props.setClientState('logged');
    };
      
    return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
        <Form.Item
            name="username"
            rules={[
            {
                required: true,
                message: 'Wprowadź login!',
            },
            ]}
        >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Login" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Wprowadź hasło!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Hasło"
        />
      </Form.Item>
      <Form.Item>

        <a className="login-form-forgot" href="">
          Nie pamiętasz hasła?
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Zaloguj
        </Button>   Lub  <Button onClick={()=>{props.setClientState('registering')}}>Zarejetruj się</Button >
      </Form.Item>
    </Form>
  );
};

export default WelcomePanel