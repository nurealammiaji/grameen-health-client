import React from 'react';
import HelmetAsync from '../../../../components/HelmetAsync/HelmetAsync';
import AddProduct from '../../../../components/AddProduct/AddProduct';

const ManageProducts = () => {
    return (
        <div>
            <HelmetAsync title={"Products"} />
            Manage Products
            <AddProduct />
        </div>
    );
};

export default ManageProducts;