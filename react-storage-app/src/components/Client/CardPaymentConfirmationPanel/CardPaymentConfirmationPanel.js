import React, { useState, useEffect } from 'react'
import { Divider, Button, Result } from 'antd';

import './CardPaymentConfirmationPanel.css'

const CardPaymentConfirmationPanel = (props) => {
    const [time, setTime] = useState(5);

    const countDown = () => {
        if(time === 0)  return;

        setTimeout(function() {
            setTime(time-1);
        }, 1000);
    }

    const redirect = () => {
        if(time === 0){
            setTimeout(function() {
                props.setActiveWindow(1);
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

            <Result
                status="success"
                title="Płatność powiodła się"
                subTitle={`Zostaniesz przeniesiony na stronę główną za ${renderTimer()}...`}
                extra={[
                    <Button type="primary" size='large' key="console" onClick={() => {
                        setTimeout(function () {
                            props.setActiveWindow(1);
                        }, 300);
                    }}>
                        Wróć do sklepu
                    </Button>,
                ]}
            />
        </div>
    )
}
export default CardPaymentConfirmationPanel