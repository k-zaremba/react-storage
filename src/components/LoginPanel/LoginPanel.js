import React, { useState, useEffect } from 'react'
import './LoginPanel.css'

import { Form, Input, Button, Alert, Divider, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import auth from '../../auth';
import order from '../../order';
import { useNavigate } from 'react-router-dom';

const LoginPanel = () => {
  const [successful, setSuccessful] = useState(false)
  const [formFailed, setFormFailed] = useState(false)
  const [spinner, setSpinner] = useState(false)

  const requestRegistration = (formValues) => {
    console.log(formValues.login)
    console.log(formValues.password)
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        login: formValues.login,
        password: formValues.password
      })
    };

    fetch('http://localhost:8080/shop/user/login', requestOptions)
      .then(res => res.json())
      .then((res) => {
        console.log('res from login:')
        console.log(res)
        sessionStorage.setItem('user', JSON.stringify(res))
        if (res.id != null) {
          setSuccessful(true);
        }
        else {
          setFormFailed(true);
          setSpinner(false);
        }
      })
  }

  const navigate = useNavigate()

  const onFinish = (values) => {
    setSuccessful(false);
    setFormFailed(false);
    setSpinner(true);
    console.log('Received values of form: ', values);
    requestRegistration(values)
  };

  const redirect = () => {
    var item = sessionStorage.getItem('user')
    var user = item ? JSON.parse(item) : {}

    if (user.permission === 0)
      navigate('/admin');

    if (user.permission === 1)
      navigate('/manager');

    if (user.permission === 2)
      navigate('/worker');

    if (user.permission === 3)
      navigate('/client');

  }

  useEffect(() => {
    auth.logout(() => { });
    order.cancelActive();

    if (successful) {
      let timer1 = setTimeout(() => {
        setSpinner(false);

        auth.login(() => { redirect() })
      }
        , 2000);

      return () => {
        clearTimeout(timer1);
      };
    } else {
      sessionStorage.removeItem('user')
    }
  }, [successful])

  return (
    <>
      <div style={{ height: "100px" }} />
      <div className='login-panel' id='fade-in-item'>
        <div className='login-panel-title'>
          Witamy w naszym sklepie!
        </div>
        <Divider />
        <Form
          name="normal_login"
          className="login-form-con"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="login"
            rules={[
              {
                required: true,
                message: 'Wprowadź login!',
              },
            ]}
          >
            <Input size={'large'} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Login" />
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
              size={'large'}
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Hasło"
            />
          </Form.Item>

          {formFailed &&
            <Alert style={{ width: '100%', marginBottom: '20px' }}
              message="Błędny login lub hasło"
              type="error"
              showIcon
            />
          }

          {spinner &&
            <div className="spinner-wrapper">
              <Spin />
            </div>
          }

          <Form.Item style={{ width: '60%', margin: 'auto' }}>
            <Button style={{ marginRight: '10px' }} type="primary" htmlType="submit" className="login-form-button-main" size={'large'}>
              Zaloguj
            </Button> Lub <Button style={{ marginLeft: '10px' }} onClick={() => { navigate('/register') }} size={'large'} >Zarejetruj się</Button >
          </Form.Item>

        </Form>
      </div>
      <div style={{ height: "426px" }} />
    </>
  );
};

export default LoginPanel