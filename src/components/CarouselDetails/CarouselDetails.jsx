import React from 'react';
import { useTranslation } from 'react-i18next';
import EditShop from '../EditShop/EditShop';
import EditCarousel from '../EditCarousel/EditCarousel';

const CarouselDetails = ({ carouselData }) => {

    const { name, description, image, destination, status, createdAt, updatedAt } = carouselData;
    const { t } = useTranslation();
    const server = import.meta.env.VITE_BACKEND_URL;

    return (
        <div>
            <div className="w-10/12 mx-auto overflow-scroll card glass md:overflow-hidden">
                <div className="relative">
                    <figure className="w-full border h-60">
                        <img src={server + image} alt="Carousel Image" />
                    </figure>
                    <span className={`${status === "active" && "badge-success" || status === "inactive" && "badge-error" || status === "pending" && "badge-warning"} absolute top-5 right-5 z-10 badge sm:badge-lg capitalize`}>{status}</span>
                </div>
                <div className="card-body">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl card-title">{name}</h2>
                        <div className="card-actions">
                            <button onClick={() => document.getElementById('edit_shop_modal').showModal()} className="btn btn-primary btn-xs sm:btn-sm">Edit</button>
                        </div>
                    </div>
                    <p className="mt-5 text-lg">{description}</p>
                    <div className="mt-8">
                        <h4 className="mb-2 font-semibold">Destination</h4>
                        <hr className="w-3/12 mb-2 border-primary" />
                        <p>URL: {destination}</p>
                    </div>
                    <div className="mt-5">
                        <p>Created: <span className="badge">{createdAt}</span></p>
                        <p className="mt-1">Updated: <span className="badge">{updatedAt}</span></p>
                    </div>
                </div>
            </div>
            <EditCarousel carouselData={carouselData} />
        </div>
    );
};

export default CarouselDetails;
