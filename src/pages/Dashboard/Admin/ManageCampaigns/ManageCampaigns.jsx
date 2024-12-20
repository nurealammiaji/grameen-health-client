import React, { useContext } from 'react';
import HelmetAsync from '../../../../components/HelmetAsync/HelmetAsync';
import { RiAddBoxFill, RiDeleteBin2Fill } from 'react-icons/ri';
import Swal from 'sweetalert2';
import AddCampaign from '../../../../components/AddCampaign/AddCampaign';
import CampaignLists from '../../../../components/CampaignLists/CampaignLists';
import useCampaigns from '../../../../hooks/useCampaigns';
import { CampaignContext } from '../../../../providers/CampaignProvider';

const ManageCampaigns = () => {

    const { isCampaignsLoading, campaigns, refetchCampaigns, isCampaignsError, campaignsError } = useCampaigns();

    const { addCampaign, editCampaign, deleteCampaigns, selectedCampaigns, setSelectedCampaigns } = useContext(CampaignContext);

    const handleDeleteCampaigns = async () => {
        try {
            await deleteCampaigns()
                .then(({ data }) => {
                    console.log(data);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Deleted Successfully !!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setSelectedCampaigns([]);
                    refetchCampaigns();
                })
                .catch((err) => {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: `${err.message}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
        } catch (err) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${err.message}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div>
            <HelmetAsync title={"Categories"} />
            <div>
                <div className="mx-auto sm:w-6/12 divider divider-success"><h3 className="px-4 pt-1 pb-2 text-2xl font-bold text-white bg-success">Manage Campaigns</h3></div>
            </div>
            <br /><br />
            <div className="items-center justify-around gap-5 text-center md:flex">
                <div>
                    <button onClick={() => document.getElementById('add_campaign_modal').showModal()} className="btn btn-outline btn-info"><RiAddBoxFill className="text-2xl" />Campaign</button>
                </div>
                {/* <div className="mt-5 md:mt-0">
                    <SearchProducts />
                </div> */}
                <div className="mt-5 md:mt-0">
                    <button disabled={selectedCampaigns?.length === 0} onClick={handleDeleteCampaigns} className="btn btn-outline btn-error"><RiDeleteBin2Fill className="text-2xl" />Campaign</button>
                </div>
            </div>
            <br />
            <AddCampaign />
            <br />
            <div>
                <CampaignLists />
            </div>
        </div>
    );
};

export default ManageCampaigns;