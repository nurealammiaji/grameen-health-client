import React from 'react';
import ShopList from '../ShopList/ShopList';
import useShops from './../../hooks/useShops';

const ShopLists = () => {

    const { isShopsLoading, shops, refetchShops, isShopsError, shopsError } = useShops();

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>SN</th>
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
                            shops.map((shop, index) => <ShopList key={shop._id} shop={shop} index={index} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ShopLists;