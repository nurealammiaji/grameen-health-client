import React from 'react';

const AddOrder = () => {
    return (
        <div>
            <dialog id="add_order_modal" className="modal modal-middle">
                <div className="modal-box">
                    <div className="text-center">
                        <div className="w-10/12 mx-auto divider divider-success">
                            <h3 className="text-xl font-bold text-success">Add Order</h3>
                        </div>
                    </div>
                    <div className="py-4">
                        {/* <OrderAddForm /> */}
                    </div>
                </div>
                <div className="fixed top-0 modal-action">
                    <form method="dialog">
                        <button className="btn btn-error btn-sm"><span className="text-white md:block">Close</span></button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default AddOrder;