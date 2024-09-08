import React, { useContext } from 'react'
import HelmetAsync from '../../components/HelmetAsync/HelmetAsync'
import { Link, NavLink, Outlet } from 'react-router-dom'
import icon from '../../assets/icon.png'
import { RiBox3Fill, RiFileList3Fill, RiHome8Fill, RiHomeGearFill, RiLogoutCircleRFill, RiMapPinFill, RiPhoneFill, RiPieChart2Fill, RiShoppingCart2Fill, RiTimerFlashFill, RiUser3Fill } from 'react-icons/ri'
import { TbCoinTakaFilled } from "react-icons/tb";
import useUser from '../../hooks/useUser'
import { AuthContext } from '../../providers/AuthProvider'

const Dashboard = () => {

    const [isUserLoading, userData, refetchUser] = useUser();
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
    }

    return (
        <div>
            <HelmetAsync title={"Dashboard"} />
            <div>
                <div className="relative drawer lg:drawer-open">
                    <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="flex flex-col drawer-content">
                        {/* Navbar */}
                        <div className="w-full navbar bg-base-300">
                            <div className="flex-none lg:hidden">
                                <label htmlFor="dashboard-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="inline-block w-6 h-6 stroke-current">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </label>
                            </div>
                            <div className="flex-1 px-2 mx-2">
                                {
                                    (userData && userData?.role === "admin") &&
                                    <Link to={"/dashboard/admin"} className="items-center font-bold md:flex lg:text-2xl"><img src={icon} className="w-10 h-10 text-2xl font-bold md:w-8 md:h-8 text-success" alt="Grameen Health Icon" /><span className="hidden ml-2 text-2xl font-bold text-success lg:block">Grameen Health</span></Link>
                                }
                                {
                                    (userData && userData?.role === "merchant") &&
                                    <Link to={"/dashboard/merchant"} className="items-center font-bold md:flex lg:text-2xl"><img src={icon} className="w-10 h-10 text-2xl font-bold md:w-8 md:h-8 text-success" alt="Grameen Health Icon" /><span className="hidden ml-2 text-2xl font-bold text-success lg:block">Grameen Health</span></Link>
                                }
                                {
                                    (userData && userData?.role === "customer") &&
                                    <Link to={"/dashboard/customer"} className="items-center font-bold md:flex lg:text-2xl"><img src={icon} className="w-10 h-10 text-2xl font-bold md:w-8 md:h-8 text-success" alt="Grameen Health Icon" /><span className="hidden ml-2 text-2xl font-bold text-success lg:block">Grameen Health</span></Link>
                                }
                            </div>
                            <div className="flex-none">
                                <ul className="menu menu-horizontal">
                                    {/* Navbar menu content here */}
                                    {
                                        (userData) &&
                                        <>
                                            <li className="tooltip tooltip-bottom" data-tip={"User Profile"}>
                                                {
                                                    (userData?.role === "admin") &&
                                                    <Link to={"/dashboard/admin/profile"} className="flex items-center mr-3 btn btn-success btn-outline"><RiUser3Fill className="text-xl" /><span className="hidden ml-1 font-semibold lg:block text-xl">{userData?.name}</span></Link>
                                                }
                                                {
                                                    (userData?.role === "merchant") &&
                                                    <Link to={"/dashboard/merchant/profile"} className="flex items-center mr-3 btn btn-success btn-outline"><RiUser3Fill className="text-xl" /><span className="hidden ml-1 font-semibold lg:block text-xl">{userData?.name}</span></Link>
                                                }
                                                {
                                                    (userData?.role === "customer") &&
                                                    <Link to={"/dashboard/customer/profile"} className="flex items-center mr-3 btn btn-success btn-outline"><RiUser3Fill className="text-xl" /><span className="hidden ml-1 font-semibold lg:block text-xl">{userData?.name}</span></Link>
                                                }
                                            </li>
                                            <li className="tooltip tooltip-bottom" data-tip={"Logout"}><button onClick={handleLogout} className="btn btn-error btn-outline btn-circle"><RiLogoutCircleRFill className="text-4xl" /></button></li>
                                        </>
                                    }
                                </ul>
                            </div>
                        </div>
                        {/* <div className="mt-4">
                            <br /><br />
                        </div> */}
                        {/* Page content here */}
                        <div className="p-5">
                            <Outlet />
                        </div>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="min-h-full p-4 menu bg-success w-60 md:w-80">
                            {/* Sidebar content here */}
                            {
                                (userData && userData?.role === "admin") &&
                                <Link to={"/dashboard/admin"} className="flex items-center px-6 py-4 mx-auto mb-10 font-bold text-center bg-white rounded-full lg:text-2xl text-success">
                                    <RiPieChart2Fill className="text-3xl" />
                                    <span className="ml-4 font-bold lg:text-2xl">Dashboard</span>
                                </Link>
                            }
                            {
                                (userData && userData?.role === "merchant") &&
                                <Link to={"/dashboard/merchant"} className="flex items-center px-6 py-4 mx-auto mb-10 font-bold text-center bg-white rounded-full lg:text-2xl text-success">
                                    <RiPieChart2Fill className="text-3xl" />
                                    <span className="ml-4 font-bold lg:text-2xl">Dashboard</span>
                                </Link>
                            }
                            {
                                (userData && userData?.role === "customer") &&
                                <Link to={"/dashboard/customer"} className="flex items-center px-6 py-4 mx-auto mb-10 font-bold text-center bg-white rounded-full lg:text-2xl text-success">
                                    <RiPieChart2Fill className="text-3xl" />
                                    <span className="ml-4 font-bold lg:text-2xl">Dashboard</span>
                                </Link>
                            }
                            {
                                (userData && userData?.role === "customer") &&
                                <>
                                    <li><NavLink to={"/dashboard/customer/cart"} className="text-white"><RiShoppingCart2Fill className="text-2xl font-bold lg:text-3xl" /><span className="font-semibold">Cart</span></NavLink></li>
                                    <li><NavLink to={"/dashboard/customer/profile"} className="text-white"><RiUser3Fill className="text-2xl font-bold lg:text-3xl" /><span className="font-semibold">Profile</span></NavLink></li>
                                    <li><NavLink to={"/dashboard/customer/orders"} className="text-white"><RiFileList3Fill className="text-2xl lg:text-3xl" /><span className="font-semibold">Orders</span></NavLink></li>
                                    <li><NavLink to={"/dashboard/customer/payments"} className="text-white"><TbCoinTakaFilled className="text-2xl lg:text-3xl" /><span className="font-semibold">Payments</span></NavLink></li>
                                </>
                            }
                            <div className="">
                                <div className="divider"></div>
                            </div>
                            <li><Link to={"/"} className="text-white"><RiHome8Fill className="text-2xl lg:text-3xl" /><span className="font-semibold">Home</span></Link></li>
                            <li><Link to={"/campaign"} className="text-white"><RiTimerFlashFill className="text-2xl font-bold lg:text-3xl" /><span className="font-semibold">Campaigns</span></Link></li>
                            <li><Link to={"/tracking"} className="text-white"><RiMapPinFill className="text-2xl lg:text-3xl" /><span className="font-semibold">Tracking</span></Link></li>
                            <li><Link to={"/products"} className="text-white"><RiPhoneFill className="text-2xl lg:text-3xl" /><span className="font-semibold">Contact</span></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard