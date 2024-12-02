import React, { useEffect, useState } from 'react';
import HelmetAsync from '../../../../../components/HelmetAsync/HelmetAsync';
import { useLoaderData } from 'react-router-dom';
import CampaignDetails from '../../../../../components/CampaignDetails/CampaignDetails';

const ViewCampaign = () => {

    const campaign = useLoaderData();
    const [campaignData, setCampaignData] = useState();

    useEffect(() => {
        if (campaign) {
            console.log(campaign, campaign.data);
            setCampaignData(campaign.data);
        }
    }, [campaign])

    return (
        <div>
            <HelmetAsync title={"Details"} />
            <div>
                <div className="w-6/12 mx-auto divider divider-success"><h3 className="text-2xl font-bold text-success">Campaign Details</h3></div>
            </div>
            <br />
            {
                (campaignData) &&
                <CampaignDetails campaignData={campaignData} />
            }
        </div>
    );
};

export default ViewCampaign;