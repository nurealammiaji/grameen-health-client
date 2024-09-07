import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import { RiUser3Fill, RiMenu2Line, RiCloseLargeLine, RiPieChart2Fill, RiMapPinFill, RiBox3Fill, RiStore3Fill, RiShieldUserFill, RiUserReceived2Fill, RiShoppingCart2Fill, RiTimerFlashFill, RiHome2Fill, RiHome3Fill, RiHome4Fill, RiHome5Line, RiHome5Fill, RiHome6Fill, RiHome8Fill } from "react-icons/ri";
import icon from "../../assets/icon.png";

const Navbar = () => {

    const { user, logout } = useContext(AuthContext);
    const [menuToggle, setMenuToggle] = useState(true);
    const [categoryToggle, setCategoryToggle] = useState(true);

    const handleLogout = () => {
        logout();
    }

    const pageLinks = <ul className="px-1 menu menu-horizontal">
        <li><Link to={"/"} className="text-white"><RiHome8Fill className="text-2xl lg:text-3xl" /><span className="hidden font-semibold md:block">Home</span></Link></li>
        <li><Link to={"/campaign"} className="text-white"><RiTimerFlashFill className="text-2xl lg:text-3xl" /><span className="hidden font-semibold md:block">Campaigns</span></Link></li>
        <li><Link to={"/products"} className="text-white"><RiBox3Fill className="text-2xl lg:text-3xl" /><span className="hidden font-semibold md:block">Products</span></Link></li>
        <li><Link to={"/tracking"} className="text-white"><RiMapPinFill className="text-2xl lg:text-3xl" /><span className="hidden font-semibold md:block">Order Tracking</span></Link></li>
        <li>
            <details>
                <summary className="font-semibold text-white"><RiPieChart2Fill className="text-2xl lg:text-3xl" /><span className="hidden font-semibold md:block">Dashboard</span></summary>
                <ul className="p-2">
                    <li><Link to={"/admin/dashboard"}><RiShieldUserFill className="text-xl lg:text-2xl" /><span className="hidden font-semibold md:block">Admin</span></Link></li>
                    <li><Link to={"/merchant/dashboard"}><RiStore3Fill className="text-xl lg:text-2xl" /><span className="hidden font-semibold md:block">Merchant</span></Link></li>
                    <li><Link to={"/customer/dashboard"}><RiUser3Fill className="text-xl lg:text-2xl" /><span className="hidden font-semibold md:block">Customer</span></Link></li>
                </ul>
            </details>
        </li>
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
            <nav className="fixed z-50 flex items-center justify-between w-full px-2 py-5 bg-base-200 lg:p-3">
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
                <div className="hidden join md:flex">
                    <div>
                        <div>
                            <input className="input input-bordered input-success md:input-sm lg:input-md join-item" placeholder="Search" />
                        </div>
                    </div>
                    <button className="text-white btn join-item btn-success md:btn-sm lg:btn-md">Search</button>
                </div>
                <div className="flex items-center">
                    {/* Theme Changer */}
                    <div>
                        <label className="swap swap-rotate btn btn-circle btn-sm text-success">
                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" className="theme-controller" value="forest" />
                            {/* sun icon */}
                            <svg
                                className="w-10 h-10 fill-current swap-off"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                            </svg>
                            {/* moon icon */}
                            <svg
                                className="w-10 h-10 fill-current swap-on"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                            </svg>
                        </label>
                    </div>
                    <div className="mx-5 indicator">
                        <span className="text-white indicator-item indicator-end indicator-top badge bg-lime-500">0</span>
                        <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                            <Link to={"/cart"} tabIndex={0} role="button" className="text-success"><RiShoppingCart2Fill className="text-3xl lg:text-4xl" /></Link>
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
                        (user) ?
                            <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                                <Link to={"/profile"} tabIndex={0} role="button" className="flex items-center text-success"><RiUser3Fill className="text-3xl lg:text-4xl xl:hidden" /><span className="hidden ml-2 font-semibold xl:block">{user?.email}</span></Link>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    <li className="p-4 text-center xl:hidden">{user?.email}</li>
                                    <li><Link to={"/profile"}>Profile</Link></li>
                                    <li><button onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </div> :
                            <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                                <Link to={"/login"} tabIndex={0} role="button" className="flex items-center text-success"><RiUserReceived2Fill className="text-3xl lg:text-4xl xl:hidden" /><span className="hidden ml-2 font-semibold xl:block">Login / Register</span></Link>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    <li><Link to={"/login"}>Login</Link></li>
                                    <li><Link to={"/register"}>Register</Link></li>
                                </ul>
                            </div>
                    }
                </div>
            </nav>
            <div>
                <br /><br /><br />
            </div>
            {/* Second Navbar */}
            <nav className="fixed flex items-center justify-around w-full p-1 bg-success z-[10]">
                <details className="hidden dropdown md:flex" >
                    <summary tabIndex={0} role="button" className="text-white sm:btn-sm lg:btn-md btn btn-outline" onClick={() => setCategoryToggle(!categoryToggle)} >
                        {
                            (categoryToggle) ?
                                <RiMenu2Line className="text-2xl" /> :
                                <RiCloseLargeLine className="text-2xl" />
                        }
                        <span className="font-bold lg:ml-2 lg:text-lg">Categories</span>
                    </summary>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {categoryLinks}
                    </ul>
                </details>
                <div className="">
                    {pageLinks}
                </div>
            </nav>
            <div className="mt-[64px] md:mt-[70px]"></div>
        </nav>
    )
}

export default Navbar;