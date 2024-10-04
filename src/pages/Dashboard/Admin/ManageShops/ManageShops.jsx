import React from 'react';
import HelmetAsync from '../../../../components/HelmetAsync/HelmetAsync';
import { RiAddBoxFill, RiDeleteBin2Fill } from 'react-icons/ri';
import AddShop from '../../../../components/AddShop/AddShop';

const ManageShops = () => {
    return (
        <div>
            <HelmetAsync title={"Shops"} />
            <div>
                <div className="divider w-10/12 mx-auto"><h3 className="text-2xl font-bold text-success">Manage Shops</h3></div>
            </div>
            <br />
            <div className="md:flex items-center justify-around gap-5 text-center">
                <div>
                <button onClick={() => document.getElementById('add_shop_modal').showModal()} className="btn btn-outline btn-info"><RiAddBoxFill className="text-2xl" /> Add Shop</button>
                </div>
                <div className="mt-5 md:mt-0">
                    {/* <SearchProducts /> */}
                </div>
                <div className="mt-5 md:mt-0">
                    <button disabled className="btn btn-outline btn-error"><RiDeleteBin2Fill className="text-2xl" /> Delete Shop</button>
                </div>
            </div>
            <br />
            <AddShop />
        </div>
    );
};

export default ManageShops;