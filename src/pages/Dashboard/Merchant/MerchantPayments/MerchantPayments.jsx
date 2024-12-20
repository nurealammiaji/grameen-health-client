import React from 'react';
import HelmetAsync from '../../../../components/HelmetAsync/HelmetAsync';

const MerchantPayments = () => {
    return (
        <div>
            <HelmetAsync title={"Payments"} />
            <div>
                <div className="mx-auto sm:w-6/12 divider divider-success"><h3 className="px-4 pt-1 pb-2 text-2xl font-bold text-white bg-success">My Payments</h3></div>
            </div>
            <br /><br />
        </div>
    );
};

export default MerchantPayments;