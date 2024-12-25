import React, { useContext } from 'react';
import HelmetAsync from '../../../../components/HelmetAsync/HelmetAsync';
import usePayments from '../../../../hooks/usePayments';
import { PaymentContext } from '../../../../providers/PaymentProvider';
import AddPayment from '../../../../components/AddPayment/AddPayment';
import { RiAddBoxFill, RiDeleteBin2Fill } from 'react-icons/ri';

const ManagePayments = () => {

    const { addPayment, editPayment, deletePayments, selectedPayments, setSelectedPayments, } = useContext(PaymentContext);

    const { isPaymentsLoading, payments, refetchPayments, isPaymentsError, paymentsError } = usePayments();

    const handleDeletePayments = async () => {
        try {
            await deletePayments()
                .then(({ data }) => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Deleted Successfully !!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setSelectedPayments([]);
                    refetchPayments();
                })
                .catch((err) => {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: `${err.message}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
        } catch (err) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${err.message}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div>
            <HelmetAsync title={"Payments"} />
            <div>
                <div className="mx-auto sm:w-6/12 divider divider-success"><h3 className="px-4 pt-1 pb-2 text-2xl font-bold text-white bg-success">Manage Payments</h3></div>
            </div>
            <br /><br />
            <div className="items-center justify-around gap-5 text-center md:flex">
                <div>
                    <button onClick={() => document.getElementById('add_payment_modal').showModal()} className="btn btn-outline btn-info"><RiAddBoxFill className="text-2xl" />Payment</button>
                </div>
                {/* <div className="mt-5 md:mt-0">
                    <SearchPayments />
                </div> */}
                <div className="mt-5 md:mt-0">
                    <button disabled={selectedPayments?.length === 0} onClick={handleDeletePayments} className="btn btn-outline btn-error"><RiDeleteBin2Fill className="text-2xl" />Payment</button>
                </div>
            </div>
            <br />
            <AddPayment />
            <br />
            <div>
                {/* <PaymentLists /> */}
            </div>
        </div>
    );
};

export default ManagePayments;