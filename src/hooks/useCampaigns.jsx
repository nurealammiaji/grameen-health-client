import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useCampaigns = () => {
    const axiosPublic = useAxiosPublic();

    const {
        data: campaigns,
        refetch: refetchCampaigns,
        isLoading: isCampaignsLoading,
        isError: isCampaignsError,
        error: campaignsError,
    } = useQuery({
        queryKey: ['campaigns', 'read'],
        queryFn: async () => {
            const res = await axiosPublic.get('/campaigns/read');
            return res.data; // Make sure to check if res.data is structured as expected
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 15 * 60 * 1000, // 15 minutes
        // Optional: Uncomment to enable automatic refetching
        // refetchOnWindowFocus: true,
        // refetchOnReconnect: true,
        onError: (error) => {
            console.error("Error fetching campaigns:", error);
        },
    });

    return { isCampaignsLoading, campaigns, refetchCampaigns, isCampaignsError, campaignsError };
};

export default useCampaigns;