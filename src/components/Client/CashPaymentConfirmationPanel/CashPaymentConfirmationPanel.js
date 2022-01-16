import React, { useState, useEffect } from 'react'
import { Divider, Result, Button } from 'antd';
import './CashPaymentConfirmationPanel.css'

const CashPaymentConfirmationPanel = (props) => {
    const [time, setTime] = useState(5);

    const countDown = () => {
        if (time === 0) return;

        setTimeout(function () {
            setTime(time - 1);
        }, 1000);
    }

    const redirect = () => {
        if (time === 0) {
            setTimeout(function () {
                props.setActiveWindow(9);
            }, 300);
        }
    }

    const renderTimer = () => {
        countDown();
        redirect();
        return time;
    }

    useEffect(() => {
    }, [])

    return (
        <div className='confirmation-panel'>
            <div className='card-info-entering-title'>
                DZIĘKUJEMY ZA ZAKUPY!
            </div>
            <Divider />
            <div className='redirect-text'>
                <div className='confirmation-title'>

                </div>

            </div>

            <Result
                status="success"
                title="Zapraszamy do płatności przy odbiorze"
                subTitle={`Zostaniesz przeniesiony na stronę główną za ${renderTimer()}...`}
                extra={[
                    <Button type="primary" size='large' key="console" onClick={() => {
                        setTimeout(function () {
                            props.setActiveWindow(9);
                        }, 300);
                    }}>
                        Wróć do sklepu
                    </Button>,
                ]}
            />
        </div>
    )
}
export default CashPaymentConfirmationPanel