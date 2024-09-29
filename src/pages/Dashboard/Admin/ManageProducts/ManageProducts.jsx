import React from 'react';
import HelmetAsync from '../../../../components/HelmetAsync/HelmetAsync';
import AddProduct from '../../../../components/AddProduct/AddProduct';
import { RiAddBoxFill, RiDeleteBin2Fill } from 'react-icons/ri';
import SearchProducts from '../../../../components/SearchProducts/SearchProducts';

const ManageProducts = () => {
    return (
        <div>
            <HelmetAsync title={"Products"} />
            <div>
                <div className="divider w-10/12 mx-auto"><h3 className="text-2xl font-bold text-success">Manage Products</h3></div>
            </div>
            <br />
            <div className="md:flex items-center justify-around gap-5 text-center">
                <div>
                    <button onClick={() => document.getElementById('add_product_modal').showModal()} className="btn btn-outline btn-info"><RiAddBoxFill className="text-2xl" /> Add Product</button>
                </div>
                <div className="mt-5 md:mt-0">
                    <SearchProducts />
                </div>
                <div className="mt-5 md:mt-0">
                    <button disabled className="btn btn-outline btn-error"><RiDeleteBin2Fill className="text-2xl" /> Delete Product</button>
                </div>
            </div>
            <br />
            <AddProduct />
        </div>
    );
};

export default ManageProducts;