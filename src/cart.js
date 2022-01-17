import { message } from "antd";

class Cart {
    constructor() {
    }

    updateProduct(itemInfo, quantity) {
        var cart = JSON.parse(sessionStorage.getItem("cart"));
        if(cart === null) cart = {};

        var itemId = itemInfo.id;

        if(cart[itemId] == null){
            cart[itemId] = {
                name : itemInfo.name,
                quantity : quantity,
                price : itemInfo.value}
            message.success(`Produkt '${itemInfo.name}' dodany do koszyka`, 2);

        }else{
            var val = parseInt(cart[itemId].quantity)
            cart[itemId].quantity = val + quantity;
        }

        if(parseInt(cart[itemId].quantity) <= 0){
            delete cart[itemId]
            message.error(`Produkt '${itemInfo.name}' usunięty z listy`, 2);
        }
        sessionStorage.setItem("cart", JSON.stringify(cart));
    }

    deleteProduct(itemInfo) {
        var cart = JSON.parse(sessionStorage.getItem("cart"));

        if (cart == null) return;
        if (Object.keys(cart).length === 0) return;

        var itemId = itemInfo.id;
        delete cart[itemId]
        message.error(`Produkt '${itemInfo.name}' usunięty z listy`, 2);
        
        sessionStorage.setItem("cart", JSON.stringify(cart));
    }

    getProducts() {
        return JSON.parse(sessionStorage.getItem("cart"));
    }

    clearCart() {
        sessionStorage.removeItem("cart");
    }

    getProductsOrderMap() {
        var cart = JSON.parse(sessionStorage.getItem("cart"));
        if(cart === null) cart = {};

        var orderMap = {};

        for (var id in cart){
            orderMap[id] = cart[id].quantity
        }
        
        return orderMap;
    }

    isNotEmpty() {
        var cart = JSON.parse(sessionStorage.getItem("cart"));

        if (cart == null) return false;
        if (Object.keys(cart).length === 0) return false;

        return true;
    }

    contains(itemInfo) {
        var cart = JSON.parse(sessionStorage.getItem("cart"));

        if (cart == null) return;
        if (Object.keys(cart).length === 0) return;

        var itemId = itemInfo.id;
        return (cart[itemId] != null)
    }

    getListProductsAmount() {
        var cart = JSON.parse(sessionStorage.getItem("cart"));

        if (cart == null) return 0;
        if (Object.keys(cart).length === 0) return 0;

        var amount = 0;

        for (var id in cart) {
            amount += cart[id].quantity;
        }

        return amount;
    }
}

export default new Cart();