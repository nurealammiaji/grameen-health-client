import React from 'react';
import ProductForm from '../ProductForm/ProductForm';
import HelmetAsync from './../HelmetAsync/HelmetAsync';

const AddProduct = () => {
    return (
        <div>
            <HelmetAsync title={"Add Product"} />
            <dialog id="add_product_modal" className="modal modal-bottom">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-error absolute right-2 top-2">✕</button>
                    </form>
                    <div className="text-center">
                        <h3 className="font-bold text-lg text-success">Add Product</h3>
                    </div>
                    <div className="py-4">
                        <ProductForm />
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-error btn-sm">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AddProduct;