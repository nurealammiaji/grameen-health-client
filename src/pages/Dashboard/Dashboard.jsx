import React, { useContext } from 'react'
import HelmetAsync from '../../components/HelmetAsync/HelmetAsync'
import { Link, Outlet } from 'react-router-dom'
import icon from '../../assets/icon.png'
import { RiBox3Fill, RiHome8Fill, RiLogoutCircleFill, RiLogoutCircleRFill, RiMapPinFill, RiPieChart2Fill, RiTimerFlashFill, RiUser3Fill } from 'react-icons/ri'
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
                            <div className="flex-1 px-2 mx-2"><Link to={"/dashboard"} className="items-center font-bold md:flex lg:text-2xl"><img src={icon} className="w-10 h-10 text-2xl font-bold md:w-8 md:h-8 text-success" alt="Grameen Health Icon" /><span className="hidden ml-2 text-2xl font-bold text-success lg:block">Grameen Health</span></Link></div>
                            <div className="flex-none">
                                <ul className="menu menu-horizontal">
                                    {/* Navbar menu content here */}
                                    {
                                        (userData) &&
                                        <div className="flex items-center mr-2"><RiUser3Fill className="text-2xl text-success" /><span className="hidden ml-1 font-semibold lg:block">{userData?.name}</span></div>
                                    }
                                    <li><button onClick={handleLogout}><RiLogoutCircleRFill className="text-2xl text-error" /><span className="hidden font-semibold lg:block">Logout</span></button></li>
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
                        <ul className="min-h-full p-4 menu bg-success w-80">
                            {/* Sidebar content here */}
                            <div className="flex items-center px-6 py-4 mx-auto mb-8 font-bold text-center bg-white rounded-full xl:mb-14 lg:text-2xl text-success">
                                <RiPieChart2Fill className="text-3xl" />
                                <span className="ml-4 font-bold lg:text-2xl">Dashboard</span>
                            </div>
                            {
                                (userData && userData?.role === "customer") &&
                                <>
                                    <li className="my-1"><Link to={"/dashboard/customer"} className="text-white"><RiHome8Fill className="text-2xl lg:text-3xl" /><span className="font-semibold">Home</span></Link></li>
                                    <li className="my-1"><Link to={"/campaign"} className="text-white"><RiTimerFlashFill className="text-2xl font-bold lg:text-3xl" /><span className="font-semibold">Profile</span></Link></li>
                                    <li className="my-1"><Link to={"/products"} className="text-white"><RiBox3Fill className="text-2xl lg:text-3xl" /><span className="font-semibold">Orders</span></Link></li>
                                    <li className="my-1"><Link to={"/tracking"} className="text-white"><RiMapPinFill className="text-2xl lg:text-3xl" /><span className="font-semibold">Payments</span></Link></li>
                                </>
                            }
                            <div className="xl:my-4">
                                <div className="divider"></div>
                            </div>
                            <li className="my-1"><Link to={"/"} className="text-white"><RiHome8Fill className="text-2xl lg:text-3xl" /><span className="font-semibold">Home Page</span></Link></li>
                            <li className="my-1"><Link to={"/campaign"} className="text-white"><RiTimerFlashFill className="text-2xl font-bold lg:text-3xl" /><span className="font-semibold">Campaigns</span></Link></li>
                            <li className="my-1"><Link to={"/products"} className="text-white"><RiBox3Fill className="text-2xl lg:text-3xl" /><span className="font-semibold">All Products</span></Link></li>
                            <li className="my-1"><Link to={"/tracking"} className="text-white"><RiMapPinFill className="text-2xl lg:text-3xl" /><span className="font-semibold">Order Tracking</span></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard