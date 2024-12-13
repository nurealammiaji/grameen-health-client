import React, { useState } from 'react';
import { createContext } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const CampaignContext = createContext();

const CampaignProvider = ({ children }) => {

    const axiosPrivate = useAxiosPrivate();
    const axiosPublic = useAxiosPublic();

    const [selectedCampaigns, setSelectedCampaigns] = useState([]);

    const addCampaign = async (formData) => {
        return await axiosPrivate.post('/campaigns/create', formData)
    };

    const editCampaign = async (_id, formData) => {
        console.log(_id, formData);
        return await axiosPrivate.put(`/campaigns/update/${_id}`, formData)
    };

    const deleteCampaigns = async () => {
        return await axiosPrivate.delete('/campaigns/delete', {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                campaignIds: selectedCampaigns,
            },
        })
    };

    const campaignInfo = {
        addCampaign,
        editCampaign,
        deleteCampaigns,
        selectedCampaigns,
        setSelectedCampaigns,
    };

    return (
        <CampaignContext.Provider value={campaignInfo}>
            {children}
        </CampaignContext.Provider>
    );
};

export default CampaignProvider;