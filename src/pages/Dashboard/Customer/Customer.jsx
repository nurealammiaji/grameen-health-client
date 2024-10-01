import React from 'react'
import HelmetAsync from '../../../components/HelmetAsync/HelmetAsync'
import useUser from '../../../hooks/useUser';
import { RiFileList3Fill, RiHeartFill, RiShoppingCart2Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Customer = () => {

    const { isUserLoading, isUserError, userData, refetchUser, userError } = useUser();
    const { t } = useTranslation();

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return (
        <div>
            <HelmetAsync title={"Customer"} />
            <br />
            <div className="text-center">
                <h2 className="lg:text-3xl">{t('welcome')}, <span className="text-success">{userData?.name}</span> !</h2>
            </div>
            <br /><br /><br />
            <div className="text-center">
                <div className="shadow stats stats-vertical lg:stats-horizontal">
                    <Link to={"/dashboard/customer/cart"} className="stat w-52 h-52">
                        <div className="flex justify-center mt-5 stat-title"><RiShoppingCart2Fill className="mr-3 text-2xl" /><span className="text-xl">{t('cart')}</span></div>
                        <div className="stat-value">0</div>
                        <div className="stat-desc">{t('product')}</div>
                    </Link>
                    <Link to={"/dashboard/customer/wishlist"} className="stat w-52 h-52">
                        <div className="flex justify-center mt-5 stat-title"><RiHeartFill className="mr-3 text-2xl" /><span className="text-xl">{t('wishlist')}</span></div>
                        <div className="stat-value">0</div>
                        <div className="stat-desc">{t('product')}</div>
                    </Link>
                    <Link to={"/dashboard/customer/orders"} className="stat w-52 h-52">
                        <div className="flex justify-center mt-5 stat-title"><RiFileList3Fill className="mr-3 text-2xl" /><span className="text-xl">{t('orders')}</span></div>
                        <div className="stat-value">0</div>
                        <div className="stat-desc">{userData?.createdAt?.slice(0, 10)} - {year}-{(month < 10) ? `0${month}` : month}-{(day < 10) ? `0${day}` : day}</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Customer