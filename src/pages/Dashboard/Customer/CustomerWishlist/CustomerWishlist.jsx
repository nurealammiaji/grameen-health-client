import React from 'react';
import HelmetAsync from '../../../../components/HelmetAsync/HelmetAsync';

const CustomerWishlist = () => {
    return (
        <div>
            <HelmetAsync title={"Wishlist"} />
            <div>
                <div className="mx-auto sm:w-6/12 divider divider-success"><h3 className="px-4 pt-1 pb-2 text-2xl font-bold text-white bg-success">My Wishlist</h3></div>
            </div>
            <br /><br />
        </div>
    );
};

export default CustomerWishlist;