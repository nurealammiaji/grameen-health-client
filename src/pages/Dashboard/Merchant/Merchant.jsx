import React from 'react'
import HelmetAsync from '../../../components/HelmetAsync/HelmetAsync'
import useUser from '../../../hooks/useUser';
import { Link } from 'react-router-dom';
import { RiBox3Fill, RiFileList3Fill } from 'react-icons/ri';
import { TbCoinTakaFilled } from 'react-icons/tb';

const Merchant = () => {

    const [isUserLoading, userData, refetchUser] = useUser();

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return (
        <div>
            <HelmetAsync title={"Merchant"} />
            <br />
            <div className="text-center">
                <h2 className="lg:text-3xl">Welcome, <span className="text-success">{userData?.name}</span> !</h2>
            </div>
            <br /><br /><br />
            <div className="text-center">
                <div className="shadow stats stats-vertical lg:stats-horizontal">
                    <Link to={"/dashboard/merchant/products"} className="stat w-52 h-52">
                        <div className="flex justify-center mt-5 stat-title"><RiBox3Fill className="mr-3 text-2xl" /><span className="text-xl">Products</span></div>
                        <div className="stat-value">0</div>
                        <div className="stat-desc">Products</div>
                    </Link>
                    <Link to={"/dashboard/merchant/orders"} className="stat w-52 h-52">
                        <div className="flex justify-center mt-5 stat-title"><RiFileList3Fill className="mr-3 text-2xl" /><span className="text-xl">Orders</span></div>
                        <div className="stat-value">0</div>
                        <div className="stat-desc">{userData?.createdAt?.slice(0, 10)} - {year}-{(month < 10) ? `0${month}` : month}-{(day < 10) ? `0${day}` : day}</div>
                    </Link>
                    <Link to={"/dashboard/merchant/payments"} className="stat w-52 h-52">
                        <div className="flex justify-center mt-5 stat-title"><TbCoinTakaFilled className="mr-3 text-3xl" /><span className="text-xl">Payments</span></div>
                        <div className="stat-value">0</div>
                        <div className="stat-desc">{userData?.createdAt?.slice(0, 10)} - {year}-{(month < 10) ? `0${month}` : month}-{(day < 10) ? `0${day}` : day}</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Merchant