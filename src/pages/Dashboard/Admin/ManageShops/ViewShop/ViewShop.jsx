import React, { useEffect, useState } from 'react';
import HelmetAsync from '../../../../../components/HelmetAsync/HelmetAsync';
import ShopDetails from './../../../../../components/ShopDetails/ShopDetails';
import { useLoaderData } from 'react-router-dom';

const ViewShop = () => {

    const shop = useLoaderData();
    const [shopData, setShopData] = useState();

    useEffect(() => {
        if (shop) {
            setShopData(shop.data);
        }
    }, [shop])

    return (
        <div>
            <HelmetAsync title={"View"} />
            <div>
                <div className="w-6/12 mx-auto divider divider-success"><h3 className="text-2xl font-bold text-success">Shop Details</h3></div>
            </div>
            <br />
            {
                (shopData) &&
                <ShopDetails shopData={shopData} />
            }
        </div>
    );
};

export default ViewShop;