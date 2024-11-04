import React from 'react';
import { useTranslation } from 'react-i18next';
import EditCategory from '../EditCategory/EditCategory';

const CategoryDetails = ({ categoryData }) => {

    const { _id, name, image, description, status, createdAt, updatedAt } = categoryData;
    const { t } = useTranslation();
    const server = import.meta.env.VITE_BACKEND_URL;

    return (
        <div>
            <div className="w-10/12 mx-auto overflow-scroll card glass md:overflow-hidden">
                <div className="relative">
                    <figure className="w-full border h-60">
                        <img src={server + image} alt="Category Image" />
                    </figure>
                    <span className={`${status === "active" && "badge-success" || status === "inactive" && "badge-error" || status === "pending" && "badge-warning"} absolute top-5 right-5 z-10 badge sm:badge-lg capitalize`}>{status}</span>
                </div>
                <div className="card-body">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl card-title">{name}</h2>
                        <div className="card-actions">
                            <button onClick={() => document.getElementById('edit_category_modal').showModal()} className="btn btn-primary btn-xs sm:btn-sm">Edit</button>
                        </div>
                    </div>
                    <p className="mt-5 text-lg">{description}</p>
                    <div className="mt-5">
                        <p>Created: <span className="badge">{createdAt}</span></p>
                        <p className="mt-1">Updated: <span className="badge">{updatedAt}</span></p>
                    </div>
                </div>
            </div>
            <EditCategory categoryData={categoryData} />
        </div>
    );
};

export default CategoryDetails;
