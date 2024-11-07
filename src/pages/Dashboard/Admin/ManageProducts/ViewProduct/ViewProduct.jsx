import React, { useEffect, useState } from 'react';
import HelmetAsync from '../../../../../components/HelmetAsync/HelmetAsync';
import { useLoaderData } from 'react-router-dom';
import ProductDetails from '../../../../../components/ProductDetails/ProductDetails';

const ViewProduct = () => {

    const product = useLoaderData();
    const [productData, setProductData] = useState();

    useEffect(() => {
        if (product) {
            setProductData(product.data);
        }
    }, [product])

    return (
        <div>
            <HelmetAsync title={"Details"} />
            <div>
                <div className="w-6/12 mx-auto divider divider-success"><h3 className="text-2xl font-bold text-success">Product Details</h3></div>
            </div>
            <br />
            {
                (productData) &&
                <ProductDetails productData={productData} />
            }
        </div>
    );
};

export default ViewProduct;