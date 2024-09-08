import React from 'react'
import HelmetAsync from '../../../components/HelmetAsync/HelmetAsync'
import useUser from '../../../hooks/useUser';

const Customer = () => {

    const [isUserLoading, userData, refetchUser] = useUser();

    return (
        <div>
            <HelmetAsync title={"Customer"} />
            <br />
            <div className="text-center">
                <h2 className="lg:text-3xl">Welcome, <span className="text-success">{userData?.name}</span> !</h2>
            </div>
            <br /><br /><br />
            <div className="text-center">
                <div className="stats stats-vertical lg:stats-horizontal shadow">
                    <div className="stat w-52 h-52">
                        <div className="stat-title mt-5">Downloads</div>
                        <div className="stat-value">31K</div>
                        <div className="stat-desc">Jan 1st - Feb 1st</div>
                    </div>

                    <div className="stat w-52 h-52">
                        <div className="stat-title mt-5">New Users</div>
                        <div className="stat-value">4,200</div>
                        <div className="stat-desc">↗︎ 400 (22%)</div>
                    </div>

                    <div className="stat w-52 h-52">
                        <div className="stat-title mt-5">New Registers</div>
                        <div className="stat-value">1,200</div>
                        <div className="stat-desc">↘︎ 90 (14%)</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Customer