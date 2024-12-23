import React, { useContext, useEffect, useState } from 'react';
import ShopList from '../ShopList/ShopList';
import useShops from './../../hooks/useShops';
import { ShopContext } from '../../providers/ShopProvider';
import ShopEditForm from '../ShopEditForm/ShopEditForm';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const ShopLists = () => {

    const { selectedShops, setSelectedShops, deleteShops } = useContext(ShopContext);
    const { isShopsLoading, shops, refetchShops, isShopsError, shopsError } = useShops();
    const [allSelected, setAllSelected] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        if (shops) {
            setAllSelected(selectedShops.length === shops.length && shops.length > 0);
        }
    }, [selectedShops, shops]);

    // Function to handle checkbox changes
    const handleCheckboxChange = (shopId) => {
        setSelectedShops((prevSelected) => {
            if (prevSelected.includes(shopId)) {
                // If already selected, remove it
                return prevSelected.filter(id => id !== shopId);
            } else {
                // If not selected, add it
                return [...prevSelected, shopId];
            }
        });
    };

    // Function to handle "Select All" checkbox
    const handleSelectAllChange = () => {
        if (allSelected) {
            setSelectedShops([]); // Deselect all
        } else {
            setSelectedShops(shops.map(shop => shop._id)); // Select all
        }
    };

    const onStatusChange = (shopId, newStatus) => {
        console.log(`Shop ID: ${shopId}, New Status: ${newStatus}`);
        // axiosPrivate.put(`/shops/${shopId}`, { status: newStatus })
        //      .then(response => {
        //          // Handle success
        //      })
        //      .catch(error => {
        //          // Handle error
        //      });
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="text-black border bg-slate-100">
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox checkbox-error tooltip tooltip-right" data-tip="Select All" checked={allSelected} onChange={handleSelectAllChange} />
                                </label>
                            </th>
                            <th>Shop Name</th>
                            <th>Merchant</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Shops */}
                        {
                            (shops) &&
                            shops.map((shop, index) => <ShopList key={shop._id} shop={shop} index={index} isSelected={selectedShops.includes(shop._id)} onCheckboxChange={handleCheckboxChange} onStatusChange={onStatusChange} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ShopLists;