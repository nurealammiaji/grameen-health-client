import React from 'react';
import SubCategoryEditForm from '../SubCategoryEditForm/SubCategoryEditForm';

const EditSubCategory = ({ subCategoryData }) => {
    return (
        <div>
            <dialog id="edit_subCategory_modal" className="modal modal-middle">
                <div className="modal-box">
                    <div className="text-center">
                        <div className="w-10/12 mx-auto divider divider-success">
                            <h3 className="text-xl font-bold text-success">Edit Sub Category</h3>
                        </div>
                    </div>
                    <div className="py-4">
                        <SubCategoryEditForm subCategoryData={subCategoryData} />
                    </div>
                </div>
                <div className="fixed top-0 modal-action">
                    <form method="dialog">
                        <button className="btn btn-error btn-sm"><span className="text-white md:block">Close</span></button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default EditSubCategory;