import React, { useContext, useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import CategoryList from '../CategoryList/CategoryList';
import useCategories from '../../hooks/useCategories';
import { CategoryContext } from '../../providers/CategoryProvider';

const CategoryLists = () => {

    const { addCategory, editCategory, deleteCategory, selectedCategories, setSelectedCategories } = useContext(CategoryContext);
    const { isCategoriesLoading, categories, refetchCategories, isCategoriesError, categoriesError } = useCategories();
    const [allSelected, setAllSelected] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        if (categories) {
            setAllSelected(selectedCategories.length === categories.length && categories.length > 0);
        }
    }, [selectedCategories, categories]);

    // Function to handle checkbox changes
    const handleCheckboxChange = (categoryId) => {
        setSelectedCategories((prevSelected) => {
            if (prevSelected.includes(categoryId)) {
                // If already selected, remove it
                return prevSelected.filter(id => id !== categoryId);
            } else {
                // If not selected, add it
                return [...prevSelected, categoryId];
            }
        });
    };

    // Function to handle "Select All" checkbox
    const handleSelectAllChange = () => {
        if (allSelected) {
            setSelectedCategories([]); // Deselect all
        } else {
            setSelectedCategories(categories.map(category => category._id)); // Select all
        }
    };

    const onStatusChange = (categoryId, newStatus) => {
        console.log(`Category ID: ${categoryId}, New Status: ${newStatus}`);
        // axiosPrivate.put(`/categories/${categoryId}`, { status: newStatus })
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
                    <thead className="text-black border bg-slate-100">
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox checkbox-error tooltip tooltip-right" data-tip="Select All" checked={allSelected} onChange={handleSelectAllChange} />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Category Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Carousels */}
                        {
                            (categories) &&
                            categories.map((category, index) => <CategoryList key={category._id} category={category} index={index} isSelected={selectedCategories.includes(category._id)} onCheckboxChange={handleCheckboxChange} onStatusChange={onStatusChange} />)
                        }
                        {console.log(categories)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryLists;