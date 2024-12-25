import React from 'react'
import HelmetAsync from '../../../components/HelmetAsync/HelmetAsync'
import useUser from '../../../hooks/useUser';
import { Link } from 'react-router-dom';
import { RiBox3Fill, RiFileList3Fill } from 'react-icons/ri';
import { TbCoinTakaFilled } from 'react-icons/tb';
import SearchDropdownAll from '../../../components/SearchDropdownAll/SearchDropdownAll';
import { useTranslation } from 'react-i18next';
import usePayments from '../../../hooks/usePayments';
import useOrders from './../../../hooks/useOrders';
import useProducts from '../../../hooks/useProducts';

const Admin = () => {

    const { isUserLoading, isUserError, userData, refetchUser, userError } = useUser();
    const { isOrdersLoading, orders, refetchOrders, isOrdersError, ordersError } = useOrders();
    const { isPaymentsLoading, payments, refetchPayments, isPaymentsError, paymentsError } = usePayments();
    const { isProductsLoading, products, refetchProducts, isProductsError, productsError } = useProducts();

    const { t } = useTranslation();

    const date = new Date();
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();

    return (
        <div>
            <HelmetAsync title={"Admin"} />
            <br />
            <div className="text-center">
                <h2 className="lg:text-3xl">{t('welcome')}, <span className="text-success">{userData?.name}</span> !</h2>
            </div>
            <br /><br />
            <div className="mx-auto md:w-6/12">
                <SearchDropdownAll />
            </div>
            <br /><br /><br />
            <div className="text-center">
                <div className="shadow stats stats-vertical lg:stats-horizontal">
                    <Link to={"/dashboard/admin/products"} className="stat w-52 h-52 hover:bg-gray-100">
                        <div className="flex justify-center mt-5 stat-title"><RiBox3Fill className="mr-3 text-2xl" /><span className="text-xl">{t('products')}</span></div>
                        <div className="stat-value">{products ? products.length : 0}</div>
                        <div className="stat-desc">{t('product')}</div>
                    </Link>
                    <Link to={"/dashboard/admin/orders"} className="stat w-52 h-52 hover:bg-gray-100">
                        <div className="flex justify-center mt-5 stat-title"><RiFileList3Fill className="mr-3 text-2xl" /><span className="text-xl">{t('orders')}</span></div>
                        <div className="stat-value">{orders ? orders.length : 0}</div>
                        <div className="stat-desc">{userData?.createdAt?.slice(0, 10)} - {year}-{(month < 10) ? `0${month}` : month}-{(day < 10) ? `0${day}` : day}</div>
                    </Link>
                    <Link to={"/dashboard/admin/payments"} className="stat w-52 h-52 hover:bg-gray-100">
                        <div className="flex justify-center mt-5 stat-title"><TbCoinTakaFilled className="mr-3 text-3xl" /><span className="text-xl">{t('payments')}</span></div>
                        <div className="stat-value">{payments ? payments.length : 0}</div>
                        <div className="stat-desc">{userData?.createdAt?.slice(0, 10)} - {year}-{(month < 10) ? `0${month}` : month}-{(day < 10) ? `0${day}` : day}</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Admin;