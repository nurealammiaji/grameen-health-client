import React, { useContext } from 'react';
import HelmetAsync from '../../../../components/HelmetAsync/HelmetAsync';
import { RiAddBoxFill, RiDeleteBin2Fill } from 'react-icons/ri';
import AddShop from '../../../../components/AddShop/AddShop';
import ShopLists from '../../../../components/ShopLists/ShopLists';
import { ShopContext } from '../../../../providers/ShopProvider';
import Swal from 'sweetalert2';
import useShops from '../../../../hooks/useShops';

const ManageShops = () => {

    const { selectedShops, setSelectedShops, deleteShops } = useContext(ShopContext);
    const { isShopsLoading, shops, refetchShops, isShopsError, shopsError } = useShops();

    const handleDeleteShops = async () => {
        try {
            await deleteShops()
                .then(({ data }) => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Deleted Successfully !!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setSelectedShops([]);
                    refetchShops();
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
            <HelmetAsync title={"Shops"} />
            <div>
                <div className="mx-auto sm:w-6/12 divider divider-success"><h3 className="p-2 text-2xl font-bold text-white bg-success">Manage Shops</h3></div>
            </div>
            <br /><br />
            <div className="items-center justify-around gap-5 text-center md:flex">
                <div>
                    <button onClick={() => document.getElementById('add_shop_modal').showModal()} className="btn btn-outline btn-info"><RiAddBoxFill className="text-2xl" />Shop</button>
                </div>
                <div className="mt-5 md:mt-0">
                    {/* <SearchProducts /> */}
                </div>
                <div className="mt-5 md:mt-0">
                    <button disabled={selectedShops?.length === 0} onClick={handleDeleteShops} className="btn btn-outline btn-error"><RiDeleteBin2Fill className="text-2xl" />Shop</button>
                </div>
            </div>
            <br />
            <AddShop />
            <br />
            <div>
                <ShopLists />
            </div>
        </div>
    );
};

export default ManageShops;