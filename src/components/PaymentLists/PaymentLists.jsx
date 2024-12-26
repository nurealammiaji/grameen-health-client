import React, { useContext, useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import ProductList from '../ProductList/ProductList';
import { PaymentContext } from '../../providers/PaymentProvider';
import usePayments from './../../hooks/usePayments';

const PaymentLists = () => {

    const { addPayment, editPayment, deletePayments, selectedPayments, setSelectedPayments, } = useContext(PaymentContext);
    const { isPaymentsLoading, payments, refetchPayments, isPaymentsError, paymentsError } = usePayments();
    const [allSelected, setAllSelected] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        if (payments) {
            setAllSelected(selectedPayments.length === payments.length && payments.length > 0);
        }
    }, [selectedPayments, payments]);

    // Function to handle checkbox changes
    const handleCheckboxChange = (productId) => {
        setSelectedPayments((prevSelected) => {
            if (prevSelected.includes(productId)) {
                // If already selected, remove it
                return prevSelected.filter(id => id !== productId);
            } else {
                // If not selected, add it
                return [...prevSelected, productId];
            }
        });
    };

    // Function to handle "Select All" checkbox
    const handleSelectAllChange = () => {
        if (allSelected) {
            setSelectedPayments([]); // Deselect all
        } else {
            setSelectedPayments(payments.map(product => product._id)); // Select all
        }
    };

    const onStatusChange = (productId, newStatus) => {
        console.log(`Product ID: ${productId}, New Status: ${newStatus}`);
        // axiosPrivate.put(`/products/${productId}`, { status: newStatus })
        //      .then(response => {
        //          // Handle success
        //      })
        //      .catch(error => {
        //          // Handle error
        //      });
    };

    const onCampaignChange = (productId, newCampaign) => {
        console.log(`Product ID: ${productId}, New Campaign: ${newCampaign}`);
        // axiosPrivate.put(`/products/${productId}`, { campaign: newCampaign })
        //      .then(response => {
        //          // Handle success
        //      })
        //      .catch(error => {
        //          // Handle error
        //      });
    };

    return (
        <div>
            <div className="overflow-x-auto">
                {
                    (payments) ?
                        <table className="table">
                            {/* head */}
                            <thead className="text-black border bg-slate-100">
                                <tr>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox checkbox-error tooltip tooltip-right" data-tip="Select All" checked={allSelected} onChange={handleSelectAllChange} />
                                        </label>
                                    </th>
                                    <th>Image / Name</th>
                                    <th>Merchant</th>
                                    <th>Status</th>
                                    <th>Campaign</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Payments */}
                                {
                                    (payments) &&
                                    payments.map((product, index) => <ProductList key={product._id} product={product} index={index} isSelected={selectedPayments.includes(product._id)} onCheckboxChange={handleCheckboxChange} onStatusChange={onStatusChange} onCampaignChange={onCampaignChange} />)
                                }
                            </tbody>
                        </table> :
                        <div>
                            <div className="flex items-center justify-center gap-4">
                                <div className="w-16 h-16 rounded-full skeleton shrink-0"></div>
                                <div className="flex flex-col gap-4">
                                    <div className="w-20 h-4 skeleton"></div>
                                    <div className="h-4 skeleton w-28"></div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="h-4 skeleton w-28"></div>
                                    <div className="h-4 skeleton w-28"></div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="h-4 skeleton w-28"></div>
                                    <div className="h-4 skeleton w-28"></div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="h-4 skeleton w-28"></div>
                                    <div className="h-4 skeleton w-28"></div>
                                </div>
                            </div>
                            <br />
                            <div className="flex items-center justify-center gap-4">
                                <div className="w-16 h-16 rounded-full skeleton shrink-0"></div>
                                <div className="flex flex-col gap-4">
                                    <div className="w-20 h-4 skeleton"></div>
                                    <div className="h-4 skeleton w-28"></div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="h-4 skeleton w-28"></div>
                                    <div className="h-4 skeleton w-28"></div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="h-4 skeleton w-28"></div>
                                    <div className="h-4 skeleton w-28"></div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="h-4 skeleton w-28"></div>
                                    <div className="h-4 skeleton w-28"></div>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default PaymentLists;