import React, { useContext } from 'react';
import HelmetAsync from '../../../../components/HelmetAsync/HelmetAsync';
import AddProduct from '../../../../components/AddProduct/AddProduct';
import { RiAddBoxFill, RiDeleteBin2Fill } from 'react-icons/ri';
import SearchProducts from '../../../../components/SearchProducts/SearchProducts';
import Swal from 'sweetalert2';
import { ProductContext } from '../../../../providers/ProductProvider';
import useProducts from '../../../../hooks/useProducts';
import ProductLists from '../../../../components/ProductLists/ProductLists';

const ManageProducts = () => {

    const { addProduct, editProduct, deleteProducts, selectedProducts, setSelectedProducts } = useContext(ProductContext);

    const { isProductsLoading, products, refetchProducts, isProductsError, productsError } = useProducts();

    const handleDeleteProducts = async () => {
        try {
            await deleteProducts()
                .then(({ data }) => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Deleted Successfully !!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setSelectedProducts([]);
                    refetchProducts();
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
            <HelmetAsync title={"Products"} />
            <div>
                <div className="mx-auto sm:w-6/12 divider divider-success"><h3 className="p-2 text-2xl font-bold text-white bg-success">Manage Products</h3></div>
            </div>
            <br /><br />
            <div className="items-center justify-around gap-5 text-center md:flex">
                <div>
                    <button onClick={() => document.getElementById('add_product_modal').showModal()} className="btn btn-outline btn-info"><RiAddBoxFill className="text-2xl" />Product</button>
                </div>
                {/* <div className="mt-5 md:mt-0">
                    <SearchProducts />
                </div> */}
                <div className="mt-5 md:mt-0">
                    <button disabled={selectedProducts?.length === 0} onClick={handleDeleteProducts} className="btn btn-outline btn-error"><RiDeleteBin2Fill className="text-2xl" />Product</button>
                </div>
            </div>
            <br />
            <AddProduct />
            <br />
            <div>
                <ProductLists />
            </div>
        </div>
    );
};

export default ManageProducts;