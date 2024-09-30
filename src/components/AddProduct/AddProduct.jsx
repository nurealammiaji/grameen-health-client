import React from 'react';
import ProductForm from '../ProductForm/ProductForm';
import HelmetAsync from './../HelmetAsync/HelmetAsync';
import { RiCloseLargeFill } from 'react-icons/ri';

const AddProduct = () => {
    return (
        <div>
            <HelmetAsync title={"Add Product"} />
            <dialog id="add_product_modal" className="modal modal-bottom md:modal-middle">
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
                <div className="fixed modal-action top-10 left-2 md:top-0 md:right-1/2">
                    <form method="dialog">
                        <button className="btn btn-error btn-sm"><RiCloseLargeFill className="text-xl text-white md:hidden" /><span className="hidden text-white md:block">Close</span></button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default AddProduct;