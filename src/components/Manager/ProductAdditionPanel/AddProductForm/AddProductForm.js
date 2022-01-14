import React, { useState, useEffect } from 'react'
import './AddProductForm.css'

import { Form, Input, Button, Alert } from 'antd';

const AddProductForm = () => {
    const [successful, setSuccessful] = useState(false)
    const [formFailed, setFormFailed] = useState(false)

    const requestProductAddition = (formValues) => {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                name: formValues.name,
                value: formValues.price,
                imgUrl: formValues.imgUrl})
        };

        fetch('http://localhost:8080/shop/product/add', requestOptions)
            .then(res => res.json())
            .then((res) => {
              console.log(res)
              if (res.id != null)
                setSuccessful(true);
              else
                setFormFailed(true);
            })
    }

    const onFinish = (values) => {
        console.log('PRODUCT values of form: ', values);
        setFormFailed(false);
        setSuccessful(false);
        requestProductAddition(values);
    };

    useEffect(() => {
        if (successful) {
            let timer1 = setTimeout(() => setSuccessful(false), 4000);
            return () => {
                clearTimeout(timer1);
            };
        }
    }, [successful])

    return (
        <Form
            name="normal_login"
            className="prduct-add-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Wprowadź nazwę produktu!',
                    },
                ]}
            >
                <Input
                    placeholder="nazwa produktu" size={'large'} />
            </Form.Item>

            <Form.Item
                name="price"
                rules={[
                    {
                        required: true,
                        message: 'Wprowadź cenę!',
                    },
                ]}
            >
                <Input
                    placeholder="cena" size={'large'}
                />
            </Form.Item>

            <Form.Item
                name="imgUrl"
                rules={[
                    {
                        required: true,
                        message: 'Wprowadź adres obrazka!',
                    },
                ]}
            >
                <Input
                    placeholder="adres obrazka" size={'large'}
                />
            </Form.Item>

            {formFailed &&
                <Alert style={{ width: 400, marginLeft: 'auto', marginBottom: '10px' }}
                    message="Produkt o podanej nazwie znajduje się już w bazie sklepu"
                    type="error"
                    showIcon
                />
            }

            {successful &&
                <Alert style={{ width: 400, marginLeft: 'auto', marginBottom: '10px' }}
                    message="Produkt został pomyślnie dodany"
                    type="success"
                    showIcon
                />
            }

            <Form.Item>
                <Button  type="primary" htmlType="submit" className="login-form-button" size={'large'}> 
                    Dodaj produkt
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddProductForm