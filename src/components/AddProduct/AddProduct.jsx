import React from 'react';
import ProductForm from '../ProductForm/ProductForm';
import HelmetAsync from './../HelmetAsync/HelmetAsync';
import { RiCloseLargeFill } from 'react-icons/ri';

const AddProduct = () => {
    return (
        <div>
            <HelmetAsync title={"Add Product"} />
            <dialog id="add_product_modal" className="modal modal-middle">
                <div className="modal-box">
                    {/* <form method="dialog">
                        <button className="absolute btn btn-sm btn-circle btn-error right-2 top-2">✕</button>
                    </form> */}
                    <div className="text-center">
                        <div className="w-10/12 mx-auto divider divider-success">
                            <h3 className="text-xl font-bold text-success">Add Product</h3>
                        </div>
                    </div>
                    <div className="py-4">
                        <ProductForm />
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

export default AddProduct;