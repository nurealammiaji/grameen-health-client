import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import { RiMenu2Line, RiCloseLargeLine, RiPieChart2Fill, RiMapPinFill, RiTimerFlashFill, RiHome8Fill, RiPhoneFill, RiShoppingCart2Line, RiHeartLine, RiUserReceived2Line, RiUser3Line } from "react-icons/ri";
import { TbCategoryFilled } from "react-icons/tb";
import { BsSearch } from "react-icons/bs";
import icon from "../../assets/icon.png";
import useUser from "../../hooks/useUser";
import SearchDropdown from "../SearchDropdown/SearchDropdown";
import Swal from "sweetalert2";
import ThemeChanger from "../ThemeChanger/ThemeChanger";

const Navbar = () => {

    const { user, logout, authenticated } = useContext(AuthContext);
    const [menuToggle, setMenuToggle] = useState(true);
    const [categoryToggle, setCategoryToggle] = useState(true);
    const [isUserLoading, userData, refetchUser] = useUser();

    const handleLogout = () => {
        logout();
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Logged Out !!",
            showConfirmButton: false,
            timer: 1500
        });
    }

    const pageLinks = <ul className="px-1 menu menu-horizontal">
        <li className="tooltip tooltip-bottom" data-tip="Home"><Link to={"/"} className="text-white"><RiHome8Fill className="text-2xl lg:text-3xl" /><span className="hidden font-semibold lg:block">Home</span></Link></li>
        <li className="tooltip tooltip-bottom" data-tip="Campaigns"><Link to={"/campaign"} className="text-white"><RiTimerFlashFill className="text-2xl lg:text-3xl" /><span className="hidden font-semibold lg:block">Campaigns</span></Link></li>
        <li className="tooltip tooltip-bottom" data-tip="Order Tracking"><Link to={"/tracking"} className="text-white"><RiMapPinFill className="text-2xl lg:text-3xl" /><span className="hidden font-semibold lg:block">Order Tracking</span></Link></li>
        <li className="tooltip tooltip-bottom" data-tip="Contact"><Link to={"/contact"} className="text-white"><RiPhoneFill className="text-2xl lg:text-3xl" /><span className="hidden font-semibold lg:block">Contact</span></Link></li>
        {
            (user && userData?.role === "admin") &&
            <li className="tooltip tooltip-bottom" data-tip="Dashboard"><Link to={"/dashboard/admin"} className="text-white" ><RiPieChart2Fill className="text-2xl lg:text-3xl" /><span className="hidden font-semibold lg:block">Dashboard</span></Link></li>
        }
        {
            (user && userData?.role === "merchant") &&
            <li className="tooltip tooltip-bottom" data-tip="Dashboard"><Link to={"/dashboard/merchant"} className="text-white"><RiPieChart2Fill className="text-2xl lg:text-3xl" /><span className="hidden font-semibold lg:block">Dashboard</span></Link></li>
        }
        {
            (user && userData?.role === "customer") &&
            <li className="tooltip tooltip-bottom" data-tip="Dashboard"><Link to={"/dashboard/customer"} className="text-white"><RiPieChart2Fill className="text-2xl lg:text-3xl" /><span className="hidden font-semibold lg:block">Dashboard</span></Link></li>
        }
    </ul>;

    const categoryLinks = <>
        <li><NavLink to={"/terms"}>Cat Terms</NavLink></li>
        <li>
            <a>Cat Parent</a>
            <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
            </ul>
        </li>
        <li><a>Cat Item 3</a></li>
    </>;

    return (
        <nav>
            {/* First Navbar */}
            <nav className="fixed z-50 flex items-center justify-between w-full px-2 py-3 md:py-5 bg-base-200 lg:p-3">
                {/* Mobile Category */}
                <div className="flex items-center">
                    <details className="dropdown" >
                        <summary tabIndex={0} role="button" className="mr-2 btn btn-sm md:hidden btn-success" onClick={() => setMenuToggle(!menuToggle)} >
                            {
                                (menuToggle) ?
                                    <RiMenu2Line className="text-2xl" /> :
                                    <RiCloseLargeLine className="text-2xl" />
                            }
                        </summary>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {categoryLinks}
                        </ul>
                    </details>
                    <Link to={"/"} className="items-center font-bold text-success md:flex lg:text-2xl"><img src={icon} className="w-10 h-10 text-2xl font-bold md:w-8 md:h-8 text-success" alt="Grameen Health Icon" /><span className="hidden ml-2 text-2xl font-bold text-success md:block">Grameen Health</span></Link>
                </div>
                {/* Search Desktop */}
                <div className="hidden sm:block">
                    <SearchDropdown />
                </div>
                <div className="flex items-center">
                    {/* Mobile Search */}
                    <div className="sm:hidden">
                        <button className="tooltip tooltip-bottom" data-tip="Search">
                            <label htmlFor="search-drawer" className="drawer-button md:hidden"><BsSearch className="text-2xl text-success" /></label>
                        </button>
                    </div>
                    {/* Theme Changer */}
                    <div className="hidden tooltip tooltip-bottom md:block" data-tip="Change Theme">
                        <ThemeChanger />
                    </div>
                    {/* Wishlist */}
                    <div className="ml-3 sm:ml-5 md:ml-10 indicator tooltip tooltip-bottom" data-tip="Wishlist">
                        <span className="text-white indicator-item indicator-end indicator-top badge bg-lime-500">0</span>
                        <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                            <Link to={"/dashboard/customer/wishlist"} tabIndex={0} role="button" className="text-success"><RiHeartLine className="text-3xl lg:text-4xl" /></Link>
                            <div
                                tabIndex={0}
                                className="dropdown-content card card-compact bg-base-100 z-[1] w-64 p-2 shadow">
                                <div className="card-body">
                                    <h3 className="card-title">Wish List</h3>
                                    <p>you can use any element as a dropdown.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Cart */}
                    <div className="mx-3 sm:mx-5 md:mr-10 indicator tooltip tooltip-bottom" data-tip="Cart">
                        <span className="text-white indicator-item indicator-end indicator-top badge bg-lime-500">0</span>
                        <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                            <Link to={"/dashboard/customer/cart"} tabIndex={0} role="button" className="text-success"><RiShoppingCart2Line className="text-3xl lg:text-4xl" /></Link>
                            <div
                                tabIndex={0}
                                className="dropdown-content card card-compact bg-base-100 z-[1] w-64 p-2 shadow">
                                <div className="card-body">
                                    <h3 className="card-title">Shopping Cart</h3>
                                    <p>you can use any element as a dropdown.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        (user && userData) ?
                            <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                                {
                                    (userData?.role === "admin") &&
                                    <Link to={"/dashboard/admin/profile"} tabIndex={0} role="button" className="flex items-center text-success"><RiUser3Line className="text-3xl lg:text-4xl xl:hidden" /><span className="hidden ml-2 font-semibold xl:block">{userData?.phone}</span></Link>
                                }
                                {
                                    (userData?.role === "merchant") &&
                                    <Link to={"/dashboard/merchant/profile"} tabIndex={0} role="button" className="flex items-center text-success"><RiUser3Line className="text-3xl lg:text-4xl xl:hidden" /><span className="hidden ml-2 font-semibold xl:block">{userData?.phone}</span></Link>
                                }
                                {
                                    (userData?.role === "customer") &&
                                    <Link to={"/dashboard/customer/profile"} tabIndex={0} role="button" className="flex items-center text-success"><RiUser3Line className="text-3xl lg:text-4xl xl:hidden" /><span className="hidden ml-2 font-semibold xl:block">{userData?.phone}</span></Link>
                                }
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    <li className="p-4 text-center xl:hidden">{user?.phone}</li>
                                    <li>
                                        {
                                            (userData?.role === "admin") &&
                                            <Link to={"/dashboard/admin/profile"}>Profile</Link>
                                        }
                                        {
                                            (userData?.role === "merchant") &&
                                            <Link to={"/dashboard/merchant/profile"}>Profile</Link>
                                        }
                                        {
                                            (userData?.role === "customer") &&
                                            <Link to={"/dashboard/customer/profile"}>Profile</Link>
                                        }
                                    </li>
                                    <li><button onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </div> :
                            <div className="dropdown dropdown-hover dropdown-bottom dropdown-end tooltip tooltip-bottom" data-tip="Login">
                                <Link to={"/login"} tabIndex={0} role="button" className="flex items-center text-success"><RiUserReceived2Line className="text-3xl lg:text-4xl xl:hidden" /><span className="hidden ml-2 font-semibold xl:block">Login / Register</span></Link>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    <li><Link to={"/login"}>Login</Link></li>
                                    <li><Link to={"/register"}>Register</Link></li>
                                </ul>
                            </div>
                    }
                </div>
            </nav>
            <div className="hidden mb-1 lg:mb-0 md:block">
                <br /><br /><br />
            </div>
            <div className="mb-4 md:hidden">
                <br /><br />
            </div>
            {/* Second Navbar */}
            <nav className="fixed flex items-center justify-around w-full bg-success z-[10]">
                <details className="hidden dropdown md:flex tooltip tooltip-bottom" data-tip="Categories">
                    <summary tabIndex={0} role="button" className="flex items-center text-white sm:btn-sm lg:btn-md btn btn-outline" onClick={() => setCategoryToggle(!categoryToggle)} >
                        {
                            (categoryToggle) ?
                                <TbCategoryFilled className="text-2xl" /> :
                                <RiCloseLargeLine className="text-2xl" />
                        }
                        <span className="font-bold lg:text-lg">Categories</span>
                    </summary>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {categoryLinks}
                    </ul>
                </details>
                <div className="">
                    {pageLinks}
                </div>
            </nav>
            <div className="mt-[64px] md:mt-[62px]"></div>
        </nav>
    )
}

export default Navbar;