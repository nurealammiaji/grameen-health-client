import React, { useEffect, useState } from 'react';
import HelmetAsync from '../../../../../components/HelmetAsync/HelmetAsync';
import { useLoaderData } from 'react-router-dom';
import PaymentDetails from './../../../../../components/PaymentDetails/PaymentDetails';

const ViewPayment = () => {

    const payment = useLoaderData();
    const [paymentData, setPaymentData] = useState();

    useEffect(() => {
        if (payment) {
            setPaymentData(payment.data);
        }
    }, [payment])

    return (
        <div>
            <HelmetAsync title={"Details"} />
            <div>
                <div className="w-6/12 mx-auto divider divider-success"><h3 className="text-2xl font-bold text-success">Payment Details</h3></div>
            </div>
            <br />
            {
                (paymentData) &&
                <PaymentDetails paymentData={paymentData} />
            }
        </div>
    );
};

export default ViewPayment;