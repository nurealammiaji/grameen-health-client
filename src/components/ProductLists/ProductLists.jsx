import React, { useContext, useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import ProductList from '../ProductList/ProductList';
import useProducts from '../../hooks/useProducts';
import { ProductContext } from '../../providers/ProductProvider';

const ProductLists = () => {

    const { selectedProducts, setSelectedProducts, deleteProducts } = useContext(ProductContext);
    const { isProductsLoading, products, refetchProducts, isProductsError, productsError } = useProducts();
    const [allSelected, setAllSelected] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        if (products) {
            setAllSelected(selectedProducts.length === products.length && products.length > 0);
        }
    }, [selectedProducts, products]);

    // Function to handle checkbox changes
    const handleCheckboxChange = (productId) => {
        setSelectedProducts((prevSelected) => {
            if (prevSelected.includes(productId)) {
                // If already selected, remove it
                return prevSelected.filter(id => id !== productId);
            } else {
                // If not selected, add it
                return [...prevSelected, productId];
            }
        });
    };

    // Function to handle "Select All" checkbox
    const handleSelectAllChange = () => {
        if (allSelected) {
            setSelectedProducts([]); // Deselect all
        } else {
            setSelectedProducts(products.map(product => product._id)); // Select all
        }
    };

    const onStatusChange = (productId, newStatus) => {
        console.log(`Product ID: ${productId}, New Status: ${newStatus}`);
        // axiosPrivate.put(`/products/${productId}`, { status: newStatus })
        //      .then(response => {
        //          // Handle success
        //      })
        //      .catch(error => {
        //          // Handle error
        //      });
    };

    const onCampaignChange = (productId, newCampaign) => {
        console.log(`Product ID: ${productId}, New Campaign: ${newCampaign}`);
        // axiosPrivate.put(`/products/${productId}`, { campaign: newCampaign })
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
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" checked={allSelected} onChange={handleSelectAllChange} />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Merchant</th>
                            <th>Status</th>
                            <th>Campaign</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Products */}
                        {
                            (products) &&
                            products.map((product, index) => <ProductList key={product._id} product={product} index={index} isSelected={selectedProducts.includes(product._id)} onCheckboxChange={handleCheckboxChange} onStatusChange={onStatusChange} onCampaignChange={onCampaignChange} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductLists;