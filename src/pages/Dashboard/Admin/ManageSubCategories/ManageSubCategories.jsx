import React, { useContext } from 'react';
import HelmetAsync from '../../../../components/HelmetAsync/HelmetAsync';
import { RiAddBoxFill, RiDeleteBin2Fill } from 'react-icons/ri';
import SearchProducts from '../../../../components/SearchProducts/SearchProducts';
import AddSubCategory from '../../../../components/AddSubCategory/AddSubCategory';
import SubCategoryLists from '../../../../components/SubCategoryLists/SubCategoryLists';
import { SubCategoryContext } from '../../../../providers/SubCategoryProvider';
import useSubCategories from '../../../../hooks/useSubCategories';
import Swal from 'sweetalert2';

const ManageSubCategories = () => {

    const { addSubCategory, editSubCategory, deleteSubCategory, selectedSubCategories, setSelectedSubCategories } = useContext(SubCategoryContext);

    const { isSubCategoriesLoading, subCategories, refetchSubCategories, isSubCategoriesError, subCategoriesError } = useSubCategories();

    const handleDeleteSubCategories = async () => {
        try {
            await deleteSubCategory()
                .then(({ data }) => {
                    console.log(data);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Deleted Successfully !!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setSelectedSubCategories([]);
                    refetchSubCategories();
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
            <HelmetAsync title={"Sub Categories"} />
            <div>
                <div className="mx-auto sm:w-6/12 divider divider-success"><h3 className="px-4 pt-1 pb-2 text-2xl font-bold text-white bg-success">Manage Sub Categories</h3></div>
            </div>
            <br /><br />
            <div className="items-center justify-around gap-5 text-center md:flex">
                <div>
                    <button onClick={() => document.getElementById('add_subCategory_modal').showModal()} className="btn btn-outline btn-info"><RiAddBoxFill className="text-2xl" />Sub Category</button>
                </div>
                {/* <div className="mt-5 md:mt-0">
                    <SearchProducts />
                </div> */}
                <div className="mt-5 md:mt-0">
                    <button disabled={selectedSubCategories?.length === 0} onClick={handleDeleteSubCategories} className="btn btn-outline btn-error"><RiDeleteBin2Fill className="text-2xl" />Sub Category</button>
                </div>
            </div>
            <br />
            <AddSubCategory />
            <br />
            <div>
                <SubCategoryLists />
            </div>
        </div>
    );
};

export default ManageSubCategories;