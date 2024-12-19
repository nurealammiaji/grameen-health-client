import React from 'react';
import HelmetAsync from '../../../../components/HelmetAsync/HelmetAsync';

const MerchantProducts = () => {
    return (
        <div>
            <HelmetAsync title={"Products"} />
            <div>
                <div className="mx-auto sm:w-6/12 divider divider-success"><h3 className="p-2 text-2xl font-bold text-white bg-success">My Products</h3></div>
            </div>
            <br /><br />
        </div>
    );
};

export default MerchantProducts;