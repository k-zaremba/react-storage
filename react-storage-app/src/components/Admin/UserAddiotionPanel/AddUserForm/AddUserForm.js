import React, { useState, useEffect } from 'react'
import './AddUserForm.css'

import { Form, Input, Button, Select, Alert } from 'antd';
const { Option } = Select;
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

const AddUserForm = () => {

  const [successful, setSuccessful] = useState(false)
  const [formFailed, setFormFailed] = useState(false)
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
        permission: formValues.position
      })
    };

    fetch('http://localhost:8080/storage/user/register', requestOptions)
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

  useEffect(() => {
    if (successful) {
      let timer1 = setTimeout(() => setSuccessful(false), 4000);
      return () => {
        clearTimeout(timer1);
      };
    }
  }, [successful])

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    setFormFailed(false);
    setSuccessful(false);
    requestRegistration(values);
  };

  return (

    <div className='worker-addition-form'>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        className="register-panel-form"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Imię"
          rules={[{ required: true, message: 'Pole nie może być puste!', whitespace: true }]}
        >
          <Input className='admin-input-area' />
        </Form.Item>

        <Form.Item
          name="lastname"
          label="Nazwisko"
          rules={[{ required: true, message: 'Pole nie może być puste!', whitespace: true }]}
        >
          <Input className='admin-input-area'/>
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
          <Input className='admin-input-area'/>
        </Form.Item>

        <Form.Item
          name="login"
          label="Login"
          rules={[{ required: true, message: 'Pole nie może być puste!', whitespace: true }]}
        >
          <Input className='admin-input-area'/>
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
          <div className='admin-input-password-area'>
          <Input.Password />
          </div>
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Potwierdź hasło"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Pole nie może być puste!',
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
          <div className='admin-input-password-area'>
          <Input.Password />
          </div>
        </Form.Item>

        <Form.Item
          name="position"
          label="Stanowisko"
          rules={[
            {
              required: true,
              message: 'Pole nie może być puste!',
            }]}>
          <Select defaultValue=" " onChange={(val) => { console.log(val) }}>
            <Option value="2">Pracownik</Option>
            <Option value="1">Menedżer</Option>
          </Select>
        </Form.Item>

        {formFailed &&
          <Alert style={{ width: '67%', marginLeft: 'auto', marginBottom: '20px' }}
            message="Login lub email są już zajęte"
            type="error"
            showIcon
          />
        }

        {successful &&
          <Alert style={{ width: '67%', marginLeft: 'auto', marginBottom: '20px' }}
            message="Użytkownik dodany"
            type="success"
            showIcon
          />
        }

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary"  htmlType="submit" className='confirm-button-admin' >
            Zatwierdź
          </Button>
        </Form.Item>

      </Form>
    </div>
  );
};

export default AddUserForm