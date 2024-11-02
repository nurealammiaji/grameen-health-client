import React, { useContext, useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { SubCategoryContext } from '../../providers/SubCategoryProvider';
import SubCategoryList from '../SubCategoryList/SubCategoryList';
import useSubCategories from '../../hooks/useSubCategories';

const SubCategoryLists = () => {

    const { addSubCategory, editSubCategory, deleteSubCategory, selectedSubCategories, setSelectedSubCategories } = useContext(SubCategoryContext);
    const { isSubCategoriesLoading, subCategories, refetchSubCategories, isSubCategoriesError, subCategoriesError } = useSubCategories();
    const [allSelected, setAllSelected] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        if (subCategories) {
            setAllSelected(selectedSubCategories.length === subCategories.length && subCategories.length > 0);
        }
    }, [selectedSubCategories, subCategories]);

    // Function to handle checkbox changes
    const handleCheckboxChange = (subCategoryId) => {
        setSelectedSubCategories((prevSelected) => {
            if (prevSelected.includes(subCategoryId)) {
                // If already selected, remove it
                return prevSelected.filter(id => id !== subCategoryId);
            } else {
                // If not selected, add it
                return [...prevSelected, subCategoryId];
            }
        });
    };

    // Function to handle "Select All" checkbox
    const handleSelectAllChange = () => {
        if (allSelected) {
            setSelectedSubCategories([]); // Deselect all
        } else {
            setSelectedSubCategories(subCategories.map(subCategory => subCategory._id)); // Select all
        }
    };

    const onStatusChange = (subCategoryId, newStatus) => {
        console.log(`Sub Category ID: ${subCategoryId}, New Status: ${newStatus}`);
        // axiosPrivate.put(`/shops/${shopId}`, { status: newStatus })
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
                            <th>Sub Category Name</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Carousels */}
                        {
                            (subCategories) &&
                            subCategories.map((subCategory, index) => <SubCategoryList key={subCategory._id} subCategory={subCategory} index={index} isSelected={selectedSubCategories.includes(subCategory._id)} onCheckboxChange={handleCheckboxChange} onStatusChange={onStatusChange} />)
                        }
                        {console.log(subCategories)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubCategoryLists;