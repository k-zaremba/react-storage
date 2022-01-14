class Order {
    constructor() {
    }

    cancelActive() {
        var orderId = sessionStorage.getItem('activeOrderId')
        if (!orderId)
            return;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        fetch(`http://localhost:8080/shop/order/edit?orderId=${orderId}&statusOrder=cancelled&statusPayment=pending`, requestOptions)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
            })

        sessionStorage.removeItem('activeOrderId')
    }
}

export default new Order();