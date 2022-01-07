import React, { useState } from 'react'
import './RegisterPanel.css'

import { Form, Input, Button } from 'antd';

const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

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

const RegisterPanel = (props) =>{
    
    const requestRegistration = (formValues) => {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                login: formValues.login, 
                name: formValues.name,
                surname: formValues.surname,
                email: formValues.email,
                password: formValues.password,
                permission: 2})
        };

        fetch('http://localhost:8080/storage/user/register', requestOptions)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
            })
    }


    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        requestRegistration(values);
        props.setClientState('logging');
      };

    return (
   
        <Form
      {...formItemLayout}
      form={form}
      name="register"
      className="register-form"
      onFinish={onFinish}
      scrollToFirstError
    >
    
    <Form.Item
        name="name"
        label="Imię"
        rules={[{ required: true, message: 'Pole nie może być puste!', whitespace: true }]}
    >
        <Input />
      </Form.Item>

      <Form.Item
        name="surname"
        label="Nazwisko"
        rules={[{ required: true, message: 'Pole nie może być puste!', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'Wprowadzony E-mail nie jest prawidłowy!',
          },
          {
            required: true,
            message: 'Pole nie może być puste!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="login"
        label="Login"
        tooltip="Login służy do logowania się na stronę"
        rules={[{ required: true, message: 'Pole nie może być puste!', whitespace: true }]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item
        name="password"
        label="Hasło"
        rules={[
          {
            required: true,
            message: 'Pole nie może być puste!',
          },
        ]}
        hasFeedback
      >
        <Input.Password/>
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Potwierdź hasło"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Potwierdź swoje hasło!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Wprowadzone hasła nie są zgodne!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Zarejestruj
          </Button>
          <Button type="ghost" htmlType="submit">
            
          </Button>
          <Button onClick={() => {props.setClientState('logging')}}>
            Anuluj
          </Button>
        </Form.Item>
    </Form>

  );
};

export default RegisterPanel