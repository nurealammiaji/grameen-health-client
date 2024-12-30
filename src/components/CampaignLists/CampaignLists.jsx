import React, { useContext, useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import CampaignList from './../CampaignList/CampaignList';
import useCampaigns from './../../hooks/useCampaigns';
import { CampaignContext } from '../../providers/CampaignProvider';

const CampaignLists = () => {

    const { addCampaign, editCampaign, deleteCampaign, selectedCampaigns, setSelectedCampaigns } = useContext(CampaignContext);
    const { isCampaignsLoading, campaigns, refetchCampaigns, isCampaignsError, campaignsError } = useCampaigns();
    const [allSelected, setAllSelected] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        if (campaigns) {
            setAllSelected(selectedCampaigns.length === campaigns.length && campaigns.length > 0);
        }
    }, [selectedCampaigns, campaigns]);

    // Function to handle checkbox changes
    const handleCheckboxChange = (campaignId) => {
        setSelectedCampaigns((prevSelected) => {
            if (prevSelected.includes(campaignId)) {
                // If already selected, remove it
                return prevSelected.filter(id => id !== campaignId);
            } else {
                // If not selected, add it
                return [...prevSelected, campaignId];
            }
        });
    };

    // Function to handle "Select All" checkbox
    const handleSelectAllChange = () => {
        if (allSelected) {
            setSelectedCampaigns([]); // Deselect all
        } else {
            setSelectedCampaigns(campaigns.map(campaign => campaign._id)); // Select all
        }
    };

    const onStatusChange = (campaignId, newStatus) => {
        console.log(`Category ID: ${campaignId}, New Status: ${newStatus}`);
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
                                    <input type="checkbox" className="border checkbox checkbox-error tooltip-right tooltip" data-tip="Select All" checked={allSelected} onChange={handleSelectAllChange} />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Carousels */}
                        {
                            (campaigns) &&
                            campaigns.map((campaign, index) => <CampaignList key={campaign._id} campaign={campaign} index={index} isSelected={selectedCampaigns.includes(campaign._id)} onCheckboxChange={handleCheckboxChange} onStatusChange={onStatusChange} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CampaignLists;