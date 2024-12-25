import React, { useContext } from 'react';
import HelmetAsync from '../../../../components/HelmetAsync/HelmetAsync';
import useOrders from '../../../../hooks/useOrders';
import { OrderContext } from '../../../../providers/OrderProvider';
import { RiAddBoxFill, RiDeleteBin2Fill } from 'react-icons/ri';
import AddOrder from '../../../../components/AddOrder/AddOrder';

const ManageOrders = () => {

    const { addOrder, editOrder, deleteOrders, selectedOrders, setSelectedOrders } = useContext(OrderContext);

    const { isOrdersLoading, orders, refetchOrders, isOrdersError, ordersError } = useOrders();

    const handleDeleteOrders = async () => {
        try {
            await deleteOrders()
                .then(({ data }) => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Deleted Successfully !!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setSelectedOrders([]);
                    refetchOrders();
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
            <HelmetAsync title={"Orders"} />
            <div>
                <div className="mx-auto sm:w-6/12 divider divider-success"><h3 className="px-4 pt-1 pb-2 text-2xl font-bold text-white bg-success">Manage Orders</h3></div>
            </div>
            <br /><br />
            <div className="items-center justify-around gap-5 text-center md:flex">
                <div>
                    <button onClick={() => document.getElementById('add_order_modal').showModal()} className="btn btn-outline btn-info"><RiAddBoxFill className="text-2xl" />Order</button>
                </div>
                {/* <div className="mt-5 md:mt-0">
                    <SearchOrders />
                </div> */}
                <div className="mt-5 md:mt-0">
                    <button disabled={selectedOrders?.length === 0} onClick={handleDeleteOrders} className="btn btn-outline btn-error"><RiDeleteBin2Fill className="text-2xl" />Order</button>
                </div>
            </div>
            <br />
            <AddOrder />
            <br />
            <div>
                {/* <OrderLists /> */}
            </div>
        </div>
    );
};

export default ManageOrders;