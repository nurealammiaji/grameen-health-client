import React from 'react'
import HelmetAsync from './../../components/HelmetAsync/HelmetAsync';
import OrderForm from '../../components/orderForm/orderForm';

const Order = () => {
    return (
        <div>
            <HelmetAsync title={"Order"} />
            Order
            <OrderForm />
        </div>
    )
}

export default Order;