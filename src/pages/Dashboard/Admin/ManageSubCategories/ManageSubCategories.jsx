import React from 'react';
import HelmetAsync from '../../../../components/HelmetAsync/HelmetAsync';
import AddCategory from '../../../../components/AddCategory/AddCategory';
import { RiAddBoxFill, RiDeleteBin2Fill } from 'react-icons/ri';
import SearchProducts from '../../../../components/SearchProducts/SearchProducts';
import AddSubCategory from '../../../../components/AddSubCategory/AddSubCategory';

const ManageSubCategories = () => {
    return (
        <div>
            <HelmetAsync title={"Sub Categories"} />
            <div>
                <div className="w-10/12 mx-auto divider"><h3 className="text-2xl font-bold text-success">Manage Sub Categories</h3></div>
            </div>
            <br />
            <div className="items-center justify-around gap-5 text-center md:flex">
                <div>
                    <button onClick={() => document.getElementById('add_subCategory_modal').showModal()} className="btn btn-outline btn-info"><RiAddBoxFill className="text-2xl" />Sub Category</button>
                </div>
                <div className="mt-5 md:mt-0">
                    <SearchProducts />
                </div>
                <div className="mt-5 md:mt-0">
                    <button disabled className="btn btn-outline btn-error"><RiDeleteBin2Fill className="text-2xl" />Sub Category</button>
                </div>
            </div>
            <br />
            <AddSubCategory />
        </div>
    );
};

export default ManageSubCategories;