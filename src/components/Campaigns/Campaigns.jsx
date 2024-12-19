import React from 'react';
import Campaign from '../Campaign/Campaign';
import useCampaigns from '../../hooks/useCampaigns';

const Campaigns = () => {

    const { isCampaignsLoading, campaigns, refetchCampaigns, isCampaignsError, campaignsError } = useCampaigns();

    return (
        <div>
            {
                (campaigns) && campaigns.map((campaign, index) => <Campaign key={index} campaign={campaign} />)
            }
        </div>
    );
};

export default Campaigns;