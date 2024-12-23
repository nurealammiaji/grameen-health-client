import React from 'react';
import { useTranslation } from 'react-i18next';
import EditPayment from '../EditPayment/EditPayment';

const PaymentDetails = ({ paymentData }) => {

    const { _id, status} = paymentData;
    const { t } = useTranslation();
    const server = import.meta.env.VITE_BACKEND_URL;

    return (
        <div>
            <div className="w-10/12 mx-auto overflow-scroll card glass md:overflow-hidden">
                <div className="relative">
                    <figure className="w-full h-60">
                        <img className="w-full" src="" alt="Payment Image" />
                    </figure>
                    <span className={`${status === "active" && "badge-success" || status === "inactive" && "badge-error" || status === "pending" && "badge-warning"} text-white shadow absolute top-5 right-5 z-10 badge sm:badge-lg capitalize`}>{status}</span>
                </div>
                <div className="card-body">
                    <div className="flex justify-between">
                        <h2 className="text-3xl card-title">{"name"}</h2>
                        <div className="card-actions">
                            <button onClick={() => document.getElementById('edit_payment_modal').showModal()} className="btn btn-primary btn-xs sm:btn-sm">Edit</button>
                        </div>
                    </div>
                    <p className="mt-5 text-lg">{"description"}</p>
                    <div className="mt-8">
                        <h4 className="mb-2 font-semibold">Shop Address</h4>
                        <hr className="w-3/12 mb-2 border-primary" />
                        <p>{"manufacturer"}</p>
                    </div>
                    <div className="mt-5">
                        <h4 className="mb-2 font-semibold">Shop Owner</h4>
                        <hr className="w-3/12 mb-2 text-error border-primary" />
                        <p>Name: <span className="badge">{"manufacturer"}</span></p>
                        <p className="mt-1">Phone: <span className="badge">{"manufacturer"}</span></p>
                    </div>
                </div>
            </div>
            <EditPayment paymentData={paymentData} />
        </div>
    );
};

export default PaymentDetails;
