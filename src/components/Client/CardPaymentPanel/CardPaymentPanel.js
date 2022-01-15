import React, { useState} from 'react'
import './CardPaymentPanel.css'
import { Form, Input, Button, Select, Row, Col, Divider, Spin} from 'antd';
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

const CardPaymentPanel = (props) => {
  const [spinner, setSpinner] = useState(false)

  const postChanges = (orderId) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    fetch(`http://localhost:8080/storage/order/edit?orderId=${orderId}&statusOrder=placed&statusPayment=paid`, requestOptions)
      .then(res => res.json())
      .then((res) => {
        console.log(res)
      })
  }

  const changeOrderState = () => {
    var orderId = sessionStorage.getItem('activeOrderId')
    postChanges(orderId);
    sessionStorage.removeItem('activeOrderId')
    sessionStorage.removeItem('cart')
  }

  const onFinish = () => {
    setSpinner(true)
    setTimeout(() => {
      setSpinner(false);
      changeOrderState();
      props.setActiveWindow(6);
    }
      , 2000);

  };

  return (
    <div>
      <div className='card-info-entering-title'>
        WPROWADŹ DANE KARTY
      </div>
      <Divider />
      <div className='card-panel-form-wrapper'>
        <Form {...layout}
          className="card-panel-form"
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          requiredMark={false}
          layout='vertical'
        >
          <Form.Item
            name={['card', 'card-number']}
            label={<p className='card-panel-form-names'>Numer karty</p>}
            rules={[
              {
                required: true,
                message: ''
              },
            ]}
          >
            <Cleave style={{fontSize : '16px', width : 'auto', height : 40.14}}
              className='ant-input'
              placeholder="XXXX XXXX XXXX XXXX"
              options={{ creditCard: true }}
              onChange={event => { console.log(event.target.rawValue, event.target.value) }}
            />
          </Form.Item>



          <Form.Item
            name={['user', 'name']}
            label={<p className='card-panel-form-names'>Imię i nazwisko</p>}
            rules={[
              {
                required: true,
                message: ''
              },
            ]}
          >
            <Input size={'large'} style={{ width: 'auto' }} placeholder="Jan Kowalski" />
          </Form.Item>

          <Form.Item label={<p className='card-panel-form-names'>Data ważności</p>}>
            <Row gutter={0} style={{ width: '205px' }}>
              <Col span={10}>
                <Form.Item
                  name={['user', 'month']}
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                >
                  <Select size={'large'}>
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
              <div style={{ fontSize: '23px', marginLeft: '10px', marginRight: '10px' }}>/</div>
              <Col span={10}>
                <Form.Item
                  name={['user', 'year']}
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                >
                  <Select size={'large'}>
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

          <Form.Item name={['user', 'ccv']} label={<p className='card-panel-form-names'>CCV</p>}
            rules={[
              {
                required: true,
                message: ''
              },
            ]}>
            <Input.Password size={'large'} style={{ width: '205px' }} />
          </Form.Item>

            
          <Form.Item >
            <div style={{ display: 'flex' }}>

              {!spinner && <>
                <Button type="primary" htmlType="submit">
                  Zapłać
                </Button>

                <Button type="ghost" disabled />
                <Button onClick={() => { props.setActiveWindow(4) }}>
                  Anuluj
                </Button>
              </>
              }
              {spinner &&
                <div style={{width : '205px', marginLeft : '90px'}}>
                  <Spin />
                </div>
              }

            </div>
          </Form.Item>

          

        </Form>
      </div>
    </div>
  );
}

export default CardPaymentPanel