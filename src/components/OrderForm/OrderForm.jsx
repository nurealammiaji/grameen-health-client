import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const OrderForm = () => {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);

    const paymentMethod = watch('paymentMethod');

    const onSubmit = async (data) => {
        try {
            // Adjust the data before sending it to the server
            const orderData = {
                userId: data.userId,
                products: [
                    {
                        productId: data.productId1,
                        quantity: data.quantity1,
                        price: data.price1,
                    },
                    {
                        productId: data.productId2,
                        quantity: data.quantity2,
                        price: data.price2,
                    }
                ],
                total: data.total,
                deliveryAddress: data.deliveryAddress,
                paymentMethod: data.paymentMethod,
                paymentInfo: {
                    transactionId: data.transactionId,
                    amount: data.total,
                    ...(data.paymentMethod === 'MFS' && {
                        mobileNumber: data.mobileNumber,
                        mfsProvider: data.mfsProvider
                    }),
                    ...(data.paymentMethod === 'bank' && {
                        accountNumber: data.accountNumber,
                        bankName: data.bankName,
                        branch: data.branch
                    })
                }
            };

            // Send the request to create an order
            await axios.post('/api/orders', orderData);

            setSubmitted(true);
            reset();
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <div className="order-form">
            <h2>Create a New Order</h2>
            {submitted && <p>Order created successfully!</p>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>User ID</label>
                    <input {...register('userId', { required: true })} placeholder="User ID" />
                    {errors.userId && <span>This field is required</span>}
                </div>

                <h4>Product 1</h4>
                <div>
                    <label>Product ID</label>
                    <input {...register('productId1', { required: true })} placeholder="Product ID" />
                    {errors.productId1 && <span>This field is required</span>}
                </div>
                <div>
                    <label>Quantity</label>
                    <input type="number" {...register('quantity1', { required: true })} placeholder="Quantity" />
                    {errors.quantity1 && <span>This field is required</span>}
                </div>
                <div>
                    <label>Price</label>
                    <input type="number" {...register('price1', { required: true })} placeholder="Price" />
                    {errors.price1 && <span>This field is required</span>}
                </div>

                <h4>Product 2</h4>
                <div>
                    <label>Product ID</label>
                    <input {...register('productId2', { required: true })} placeholder="Product ID" />
                    {errors.productId2 && <span>This field is required</span>}
                </div>
                <div>
                    <label>Quantity</label>
                    <input type="number" {...register('quantity2', { required: true })} placeholder="Quantity" />
                    {errors.quantity2 && <span>This field is required</span>}
                </div>
                <div>
                    <label>Price</label>
                    <input type="number" {...register('price2', { required: true })} placeholder="Price" />
                    {errors.price2 && <span>This field is required</span>}
                </div>

                <div>
                    <label>Total</label>
                    <input type="number" {...register('total', { required: true })} placeholder="Total" />
                    {errors.total && <span>This field is required</span>}
                </div>

                <div>
                    <label>Delivery Address</label>
                    <input {...register('deliveryAddress', { required: true })} placeholder="Delivery Address" />
                    {errors.deliveryAddress && <span>This field is required</span>}
                </div>

                <div>
                    <label>Payment Method</label>
                    <select {...register('paymentMethod', { required: true })}>
                        <option value="">Select Payment Method</option>
                        <option value="MFS">Mobile Financial Service (MFS)</option>
                        <option value="bank">Bank Payment</option>
                        <option value="cash_on_delivery">Cash on Delivery</option>
                    </select>
                    {errors.paymentMethod && <span>This field is required</span>}
                </div>

                {/* MFS Payment Fields */}
                {paymentMethod === 'MFS' && (
                    <>
                        <div>
                            <label>Transaction ID</label>
                            <input {...register('transactionId', { required: true })} placeholder="Transaction ID" />
                            {errors.transactionId && <span>This field is required</span>}
                        </div>
                        <div>
                            <label>Mobile Number</label>
                            <input {...register('mobileNumber', { required: true })} placeholder="Mobile Number" />
                            {errors.mobileNumber && <span>This field is required</span>}
                        </div>
                        <div>
                            <label>MFS Provider</label>
                            <select {...register('mfsProvider', { required: true })}>
                                <option value="">Select MFS Provider</option>
                                <option value="bKash">bKash</option>
                                <option value="Nagad">Nagad</option>
                                <option value="Upay">Upay</option>
                            </select>
                            {errors.mfsProvider && <span>This field is required</span>}
                        </div>
                    </>
                )}

                {/* Bank Payment Fields */}
                {paymentMethod === 'bank' && (
                    <>
                        <div>
                            <label>Transaction ID</label>
                            <input {...register('transactionId', { required: true })} placeholder="Transaction ID" />
                            {errors.transactionId && <span>This field is required</span>}
                        </div>
                        <div>
                            <label>Account Number</label>
                            <input {...register('accountNumber', { required: true })} placeholder="Account Number" />
                            {errors.accountNumber && <span>This field is required</span>}
                        </div>
                        <div>
                            <label>Bank Name</label>
                            <input {...register('bankName', { required: true })} placeholder="Bank Name" />
                            {errors.bankName && <span>This field is required</span>}
                        </div>
                        <div>
                            <label>Branch</label>
                            <input {...register('branch', { required: true })} placeholder="Branch" />
                            {errors.branch && <span>This field is required</span>}
                        </div>
                    </>
                )}

                <button type="submit">Submit Order</button>
            </form>
        </div>
    );
};

export default OrderForm;
