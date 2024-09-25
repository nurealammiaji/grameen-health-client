import React, { useContext } from 'react'
import HelmetAsync from '../../components/HelmetAsync/HelmetAsync'
import { Link, NavLink, Outlet } from 'react-router-dom'
import icon from '../../assets/icon.png'
import { RiBox3Fill, RiCarouselView, RiFileList3Fill, RiFunctionFill, RiHeartFill, RiHome8Fill, RiLogoutCircleRFill, RiMapPinFill, RiPhoneFill, RiPieChart2Fill, RiShieldUserFill, RiShoppingCart2Fill, RiStore3Fill, RiTimerFlashFill, RiUser2Fill, RiUser3Fill } from 'react-icons/ri'
import { TbCoinTakaFilled } from "react-icons/tb";
import useUser from '../../hooks/useUser'
import { AuthContext } from '../../providers/AuthProvider'
import Swal from 'sweetalert2'
import { FaUsers } from 'react-icons/fa'
import ThemeChangerTwo from '../../components/ThemeChangerTwo/ThemeChangerTwo'

const Dashboard = () => {

    const [isUserLoading, userData, refetchUser] = useUser();
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Logged Out !!",
            showConfirmButton: false,
            timer: 1500
        });
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
                                            <li className="tooltip tooltip-bottom" data-tip={"Profile"}>
                                                {
                                                    (userData?.role === "admin") &&
                                                    <Link to={"/dashboard/admin/profile"} className="flex items-center mr-3 border-2 btn btn-success btn-outline">< RiShieldUserFill className="text-2xl" /><span className="hidden ml-1 text-xl font-semibold lg:block">{userData?.name}</span></Link>
                                                }
                                                {
                                                    (userData?.role === "merchant") &&
                                                    <Link to={"/dashboard/merchant/profile"} className="flex items-center mr-3 border-2 btn btn-success btn-outline"><RiUser2Fill className="text-xl" /><span className="hidden ml-1 text-xl font-semibold lg:block">{userData?.name}</span></Link>
                                                }
                                                {
                                                    (userData?.role === "customer") &&
                                                    <Link to={"/dashboard/customer/profile"} className="flex items-center mr-3 border-2 btn btn-success btn-outline"><RiUser3Fill className="text-2xl" /><span className="hidden ml-1 text-xl font-semibold lg:block">{userData?.name}</span></Link>
                                                }
                                            </li>
                                            <li className="tooltip tooltip-bottom" data-tip={"Logout"}><button onClick={handleLogout} className="border-2 btn btn-error btn-outline btn-circle"><RiLogoutCircleRFill className="text-4xl" /></button></li>
                                        </>
                                    }
                                </ul>
                            </div>
                        </div>
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
                            {/* Theme Changer */}
                            {/* <div className="mx-auto my-8">
                                <ThemeChangerTwo />
                            </div> */}
                            {
                                (userData && userData?.role === "admin") &&
                                <>
                                    <li><NavLink to={"/dashboard/admin/profile"} className="text-white">< RiShieldUserFill className="text-2xl font-bold lg:text-3xl" /><span className="font-semibold">Profile</span></NavLink></li>
                                    <li><NavLink to={"/dashboard/admin/users"} className="text-white"><FaUsers className="text-2xl font-bold lg:text-3xl" /><span className="font-semibold">Manage Users</span></NavLink></li>
                                    <li><NavLink to={"/dashboard/admin/stores"} className="text-white"><RiStore3Fill className="text-2xl lg:text-3xl" /><span className="font-semibold">Manage Stores</span></NavLink></li>
                                    <li><NavLink to={"/dashboard/admin/orders"} className="text-white"><RiFileList3Fill className="text-2xl lg:text-3xl" /><span className="font-semibold">Manage Orders</span></NavLink></li>
                                    <li><NavLink to={"/dashboard/admin/sliders"} className="text-white"><RiCarouselView className="text-2xl lg:text-3xl" /><span className="font-semibold">Manage Sliders</span></NavLink></li>
                                    <li><NavLink to={"/dashboard/admin/products"} className="text-white"><RiBox3Fill className="text-2xl lg:text-3xl" /><span className="font-semibold">Manage Products</span></NavLink></li>
                                    <li><NavLink to={"/dashboard/admin/payments"} className="text-white"><TbCoinTakaFilled className="text-2xl lg:text-3xl" /><span className="font-semibold">Manage Payments</span></NavLink></li>
                                    <li><NavLink to={"/dashboard/admin/categories"} className="text-white"><RiFunctionFill className="text-2xl lg:text-3xl" /><span className="font-semibold">Manage Categories</span></NavLink></li>
                                </>
                            }
                            {
                                (userData && userData?.role === "merchant") &&
                                <>
                                    <li><NavLink to={"/dashboard/merchant/profile"} className="text-white"><RiUser2Fill className="text-2xl font-bold lg:text-3xl" /><span className="font-semibold">Profile</span></NavLink></li>
                                    <li><NavLink to={"/dashboard/merchant/store"} className="text-white"><RiStore3Fill className="text-2xl lg:text-3xl" /><span className="font-semibold">My Store</span></NavLink></li>
                                    <li><NavLink to={"/dashboard/merchant/payments"} className="text-white"><TbCoinTakaFilled className="text-2xl lg:text-3xl" /><span className="font-semibold">My Payments</span></NavLink></li>
                                    <li><NavLink to={"/dashboard/merchant/orders"} className="text-white"><RiFileList3Fill className="text-2xl lg:text-3xl" /><span className="font-semibold">Manage Orders</span></NavLink></li>
                                    <li><NavLink to={"/dashboard/merchant/products"} className="text-white"><RiBox3Fill className="text-2xl font-bold lg:text-3xl" /><span className="font-semibold">Manage Products</span></NavLink></li>
                                </>
                            }
                            {
                                (userData && userData?.role === "customer") &&
                                <>
                                    <li><NavLink to={"/dashboard/customer/profile"} className="text-white"><RiUser3Fill className="text-2xl font-bold lg:text-3xl" /><span className="font-semibold">Profile</span></NavLink></li>
                                    <li><NavLink to={"/dashboard/customer/cart"} className="text-white"><RiShoppingCart2Fill className="text-2xl font-bold lg:text-3xl" /><span className="font-semibold">My Cart</span></NavLink></li>
                                    <li><NavLink to={"/dashboard/customer/orders"} className="text-white"><RiFileList3Fill className="text-2xl lg:text-3xl" /><span className="font-semibold">My Orders</span></NavLink></li>
                                    <li><NavLink to={"/dashboard/customer/wishlist"} className="text-white"><RiHeartFill className="text-2xl font-bold lg:text-3xl" /><span className="font-semibold">My Wishlist</span></NavLink></li>
                                    <li><NavLink to={"/dashboard/customer/payments"} className="text-white"><TbCoinTakaFilled className="text-2xl lg:text-3xl" /><span className="font-semibold">My Payments</span></NavLink></li>
                                </>
                            }
                            <div className="">
                                <div className="divider"></div>
                            </div>
                            <li><Link to={"/"} className="text-white"><RiHome8Fill className="text-2xl lg:text-3xl" /><span className="font-semibold">Home</span></Link></li>
                            <li><Link to={"/campaign"} className="text-white"><RiTimerFlashFill className="text-2xl font-bold lg:text-3xl" /><span className="font-semibold">Campaigns</span></Link></li>
                            <li><Link to={"/tracking"} className="text-white"><RiMapPinFill className="text-2xl lg:text-3xl" /><span className="font-semibold">Tracking</span></Link></li>
                            <li><Link to={"/contact"} className="text-white"><RiPhoneFill className="text-2xl lg:text-3xl" /><span className="font-semibold">Contact</span></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard