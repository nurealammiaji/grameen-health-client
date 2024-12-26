import React from 'react';
import { useTranslation } from 'react-i18next';
import EditProfile from '../EditProfile/EditProfile';
import cover from '../../assets/profile-cover.png';

const ProfileDetails = ({ profileData }) => {

    const { _id, name, status, email, phone, gender, password, dob, image, address, role, createdAt, updatedAt } = profileData;

    console.log(profileData);

    const { t } = useTranslation();
    const server = import.meta.env.VITE_BACKEND_URL;

    return (
        <div>
            <div className="w-10/12 mx-auto overflow-scroll card glass md:overflow-hidden">
                <div className="relative h-80">
                    <figure className="w-full border h-60">
                        <img className="w-full h-full" src={cover} alt="Cover Image" />
                    </figure>
                    <figure className="absolute z-10 w-24 h-24 overflow-hidden rounded-full bottom-5 sm:bottom-0 left-5 sm:left-10 sm:w-32 sm:h-32 ring-4 ring-primary">
                        <img src={server + image} className="w-full h-full" alt={`Photo of ${name}`} />
                    </figure>
                    <div className="justify-end mt-5 mr-5 card-actions sm:mr-10">
                        <button onClick={() => document.getElementById('edit_profile_modal').showModal()} className="btn btn-primary btn-xs sm:btn-sm">Edit</button>
                    </div>
                    <span className={`${status === "active" && "badge-success" || status === "inactive" && "badge-error" || status === "pending" && "badge-warning"} text-white shadow absolute top-5 right-5 z-10 badge sm:badge-lg capitalize`}>{status}</span>
                </div>
                <div className="mt-5 card-body">
                    <div className="flex gap-5">
                        <h2 className="text-3xl card-title">{name}</h2>
                        <div><span className="badge badge-outline badge-success">{role}</span></div>
                    </div>
                    <p className="mt-5 text-lg">{address}</p>
                    <div className="mt-8">
                        <h4 className="mb-2 text-lg font-bold text-info">Personal Details</h4>
                        <hr className="w-3/12 mb-2 border-primary" />
                        <p className="mt-5"><span className="font-medium">Phone:</span> +88{phone}</p>
                        <p className="mt-3"><span className="font-medium">Email:</span> {email}</p>
                        <p className="mt-3"><span className="font-medium">Gender:</span> {gender}</p>
                        <p className="mt-3"><span className="font-medium">Date of Birth:</span> {dob}</p>
                    </div>
                    <div className="mt-5">
                        <p>Created: <span className="badge">{createdAt}</span></p>
                        <p className="mt-1">Updated: <span className="badge">{updatedAt}</span></p>
                    </div>
                </div>
            </div>
            <EditProfile profileData={profileData} />
        </div>
    );
};

export default ProfileDetails;