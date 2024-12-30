import React from 'react';
import HelmetAsync from '../../../../components/HelmetAsync/HelmetAsync';
import useUser from '../../../../hooks/useUser';
import ProfileDetails from '../../../../components/ProfileDetails/ProfileDetails';

const MerchantProfile = () => {

    const { isUserLoading, isUserError, userData, refetchUser, userError } = useUser();

    return (
        <div>
            <HelmetAsync title={"Profile"} />
            <div>
                <div className="mx-auto sm:w-6/12 divider divider-success"><h3 className="px-4 pt-1 pb-2 text-2xl font-bold text-white bg-success">Profile</h3></div>
            </div>
            <br /><br />
            {
                userData &&
                <ProfileDetails profileData={userData} />
            }
        </div>
    );
};

export default MerchantProfile;