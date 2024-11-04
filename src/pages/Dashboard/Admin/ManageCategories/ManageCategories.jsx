import React, { useContext } from 'react';
import HelmetAsync from '../../../../components/HelmetAsync/HelmetAsync';
import AddCategory from '../../../../components/AddCategory/AddCategory';
import { RiAddBoxFill, RiDeleteBin2Fill } from 'react-icons/ri';
import SearchProducts from '../../../../components/SearchProducts/SearchProducts';
import CategoryLists from '../../../../components/CategoryLists/CategoryLists';
import Swal from 'sweetalert2';
import useCategories from '../../../../hooks/useCategories';
import { CategoryContext } from '../../../../providers/CategoryProvider';

const ManageCategories = () => {

    const { isCategoriesLoading, categories, refetchCategories, isCategoriesError, categoriesError } = useCategories();

    const { addCategory, editCategory, deleteCategory, selectedCategories, setSelectedCategories } = useContext(CategoryContext);

    const handleDeleteCategories = async () => {
        try {
            await deleteCategory()
                .then(({ data }) => {
                    console.log(data);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Deleted Successfully !!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setSelectedCategories([]);
                    refetchCategories();
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
            <HelmetAsync title={"Categories"} />
            <div>
                <div className="w-10/12 mx-auto divider"><h3 className="text-2xl font-bold text-success">Manage Categories</h3></div>
            </div>
            <br />
            <div className="items-center justify-around gap-5 text-center md:flex">
                <div>
                    <button onClick={() => document.getElementById('add_category_modal').showModal()} className="btn btn-outline btn-info"><RiAddBoxFill className="text-2xl" />Category</button>
                </div>
                {/* <div className="mt-5 md:mt-0">
                    <SearchProducts />
                </div> */}
                <div className="mt-5 md:mt-0">
                    <button disabled={selectedCategories?.length === 0} onClick={handleDeleteCategories} className="btn btn-outline btn-error"><RiDeleteBin2Fill className="text-2xl" />Category</button>
                </div>
            </div>
            <br />
            <AddCategory />
            <br />
            <div>
                <CategoryLists />
            </div>
        </div>
    );
};

export default ManageCategories;