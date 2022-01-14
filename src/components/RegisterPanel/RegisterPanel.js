import React, { useState, useEffect } from 'react'
import './RegisterPanel.css'

import { Form, Input, Button, Alert, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

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

const RegisterPanel = (props) => {

  const [successful, setSuccessful] = useState(false)
  const [formFailed, setFormFailed] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (successful) {
      let timer1 = setTimeout(() => navigate('/'), 2000);
      return () => {
        clearTimeout(timer1);
      };
    }
  }, [successful])

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
        lastname: formValues.lastname,
        email: formValues.email,
        password: formValues.password,
        permission: 3,
        phoneNumber: formValues.phone
      })
    };

    fetch('http://localhost:8080/shop/user/register', requestOptions)
      .then(res => res.json())
      .then((res) => {
        console.log(res)
        if (res.id != null)
          setSuccessful(true);
        else
          setFormFailed(true);
      })
  }


  const [form] = Form.useForm();

  const onFinish = (values) => {
    setFormFailed(false);
    setSuccessful(false);
    requestRegistration(values);
  };
  // TODO: kolor buttona
  /*
  <Button type="primary" style={{ background: "red", borderColor: "yellow" }}>
  Submit
</Button>;*/

  return (
    <>
      <div style={{ height: "100px" }} />
      <div className='register-panel' id='fade-in-item'>
        <div className='register-panel-title'>
          Rejestracja
        </div>
        <Divider />
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
            name="lastname"
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
            name="phone"
            label="Nr telefonu"
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
            <Input.Password />
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

          {formFailed &&
            <Alert style={{ width: "330.75px", marginLeft: 'auto', marginBottom: '15px' }}
              message="Login lub email są już zajęte"
              type="error"
              showIcon
            />
          }

          {successful &&
            <Alert style={{ width: "330.75px", marginLeft: 'auto', marginBottom: '15px' }}
              message="Rejestracja powiodła się!"
              type="success"
              showIcon
            />
          }

          <Form.Item {...tailFormItemLayout} style={{ width: '90%', margin: 'auto' }}>
            <Button style={{ width: '50px' }} type="ghost" disabled />

            <Button type="primary" htmlType="submit">
              Zarejestruj
            </Button>
            <Button type="ghost" disabled />


            <Button onClick={() => { navigate('/') }}>
              Anuluj
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div style={{ height: "164px" }} />
    </>
  );
};

export default RegisterPanel