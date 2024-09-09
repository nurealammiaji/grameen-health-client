import React from 'react'
import HelmetAsync from '../../../components/HelmetAsync/HelmetAsync'
import useUser from '../../../hooks/useUser';
import { RiFileList3Fill, RiShoppingCart2Fill } from 'react-icons/ri';
import { TbCoinTakaFilled } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const Customer = () => {

    const [isUserLoading, userData, refetchUser] = useUser();

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

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
                    <Link to={"/dashboard/customer/cart"} className="stat w-52 h-52">
                        <div className="stat-title mt-5 flex justify-center"><RiShoppingCart2Fill className="mr-3 text-2xl" /><span className="text-xl">Cart</span></div>
                        <div className="stat-value">0</div>
                        <div className="stat-desc">Products</div>
                    </Link>
                    <Link to={"/dashboard/customer/orders"} className="stat w-52 h-52">
                        <div className="stat-title mt-5 flex justify-center"><RiFileList3Fill className="mr-3 text-2xl" /><span className="text-xl">Orders</span></div>
                        <div className="stat-value">0</div>
                        <div className="stat-desc">{userData?.createdAt?.slice(0, 10)} - {year}-{(day < 10) ? `0${day}` : day}-{(month < 10) ? `0${month}` : month}</div>
                    </Link>
                    <Link to={"/dashboard/customer/payments"} className="stat w-52 h-52">
                        <div className="stat-title mt-5 flex justify-center"><TbCoinTakaFilled className="mr-3 text-3xl" /><span className="text-xl">Payments</span></div>
                        <div className="stat-value">0</div>
                        <div className="stat-desc">{userData?.createdAt?.slice(0, 10)} - {year}-{(day < 10) ? `0${day}` : day}-{(month < 10) ? `0${month}` : month}</div>                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Customer