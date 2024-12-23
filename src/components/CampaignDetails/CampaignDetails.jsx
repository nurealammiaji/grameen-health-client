import React from 'react';
import { useTranslation } from 'react-i18next';
import EditCampaign from '../EditCampaign/EditCampaign';

const CampaignDetails = ({ campaignData }) => {

    const { _id, name, image, description, status, campaignType, startDate, endDate, discountPercent, createdAt, updatedAt } = campaignData;
    const { t } = useTranslation();
    const server = import.meta.env.VITE_BACKEND_URL;

    return (
        <div>
            <div className="w-10/12 mx-auto overflow-scroll card glass md:overflow-hidden">
                <div className="relative">
                    <figure className="w-full border h-60">
                        <img className="w-full" src={server + image} alt="Campaign Image" />
                    </figure>
                    <span className={`${status === "active" && "badge-success" || status === "inactive" && "badge-error" || status === "pending" && "badge-warning"}  text-white shadow absolute top-5 right-5 z-10 badge sm:badge-lg capitalize`}>{status}</span>
                </div>
                <div className="card-body">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl card-title">{name}</h2>
                        <div className="card-actions">
                            <button onClick={() => document.getElementById('edit_campaign_modal').showModal()} className="btn btn-primary btn-xs sm:btn-sm">Edit</button>
                        </div>
                    </div>
                    <p className="mt-5 text-lg">{description}</p>
                    <div className="mt-5">
                        <p><span className="font-medium">Campaign Type:</span> <span className="shadow badge badge-info">{campaignType}</span></p>
                        <p className="mt-3"><span className="font-medium">Discount Percent:</span> <span className="shadow badge badge-warning">{discountPercent}%</span></p>
                        <p className="mt-3"><span className="font-medium">Start Date:</span> <span className="shadow badge badge-secondary">{startDate}</span></p>
                        <p className="mt-3"><span className="font-medium">End Date:</span> <span className="shadow badge badge-secondary">{endDate}</span></p>
                    </div>
                    <div className="mt-5">
                        <p>Created: <span className="badge">{createdAt}</span></p>
                        <p className="mt-1">Updated: <span className="badge">{updatedAt}</span></p>
                    </div>
                </div>
            </div>
            <EditCampaign campaignData={campaignData} />
        </div>
    );
};

export default CampaignDetails;
