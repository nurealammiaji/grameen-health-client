import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import { RiLoginCircleFill, RiUser3Fill, RiShoppingBag3Fill, RiMenu2Line, RiCloseLargeLine, RiPieChart2Fill, RiMapPinFill, RiTimerFill } from "react-icons/ri";

const Navbar = () => {

    const { user, logout } = useContext(AuthContext);
    const [menuToggle, setMenuToggle] = useState(true);
    const [categoryToggle, setCategoryToggle] = useState(true);

    const handleLogout = () => {
        logout();
    }

    const pageLinks = <ul className="px-1 menu menu-horizontal">
        <li><Link to={"/"} className="text-white">< RiTimerFill className="text-2xl lg:text-3xl" /><span className="hidden font-semibold lg:block">Campaigns</span></Link></li>
        <li><Link to={"/"} className="text-white"><RiMapPinFill className="text-2xl lg:text-3xl" /><span className="hidden font-semibold lg:block">Order Tracking</span></Link></li>
        <li>
            <details>
                <summary className="font-semibold text-white"><RiPieChart2Fill className="text-2xl lg:text-3xl" /><span className="hidden ml-1 font-semibold lg:block">Dashboard</span></summary>
                <ul className="p-2">
                <li><Link to={"/"}><RiPieChart2Fill className="text-2xl lg:text-3xl" /><span className="hidden font-semibold lg:block">Dashboard</span></Link></li>
                <li><Link to={"/"}><RiPieChart2Fill className="text-2xl lg:text-3xl" /><span className="hidden font-semibold lg:block">Dashboard</span></Link></li>
                </ul>
            </details>
        </li>
        <li><Link to={"/"} className="text-white"><RiPieChart2Fill className="text-2xl lg:text-3xl" /><span className="hidden font-semibold lg:block">Dashboard</span></Link></li>
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
            <nav className="fixed z-50 flex items-center justify-between w-full px-2 py-5 bg-green-100 border-2 border-t-0 border-l-0 border-r-0 lg:p-3">
                {/* Mobile Category */}
                <div className="flex items-center">
                    <details className="dropdown" >
                        <summary tabIndex={0} role="button" className="btn btn-sm lg:hidden" onClick={() => setMenuToggle(!menuToggle)} >
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
                    <Link to={"/"} className="ml-2 font-bold text-success lg:text-2xl">Grameen Health</Link>
                </div>
                {/* Search Desktop */}
                <div className="hidden join lg:flex">
                    <select className="select select-bordered select-success join-item">
                        <option value={null}>All</option>
                        <option>Equipments</option>
                        <option>Medicines</option>
                        <option>Health</option>
                    </select>
                    <div>
                        <div>
                            <input className="input input-bordered input-success join-item" placeholder="Search" />
                        </div>
                    </div>
                    <button className="text-white btn join-item btn-success">Search</button>
                </div>
                <div className="flex items-center">
                    <div className="indicator">
                        <span className="indicator-item indicator-bottom badge">0</span>
                        <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                            <Link to={"/cart"} tabIndex={0} role="button" className="text-success"><RiShoppingBag3Fill className="text-2xl lg:text-4xl" /></Link>
                            <div
                                tabIndex={0}
                                className="dropdown-content card card-compact bg-white z-[1] w-64 p-2 shadow">
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
                                <Link to={"/customer"} tabIndex={0} role="button" className="btn btn-sm btn-ghost lg:btn-md text-success"><RiUser3Fill className="text-2xl lg:text-4xl" /></Link>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    <li><a>Profile</a></li>
                                    <li><a>Logout</a></li>
                                </ul>
                            </div> :
                            <div className="ml-5 dropdown dropdown-hover dropdown-bottom dropdown-end">
                                <Link to={"/login"} tabIndex={0} role="button" className="flex items-center text-success"><RiLoginCircleFill className="text-2xl lg:text-4xl" /><span className="hidden ml-2 font-semibold xl:block">Login / Register</span></Link>
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
            <nav className="flex items-center justify-around w-full p-1 bg-success">
                <details className="hidden dropdown lg:flex" >
                    <summary tabIndex={0} role="button" className="text-white btn-success btn" onClick={() => setCategoryToggle(!categoryToggle)} >
                        {
                            (categoryToggle) ?
                                <RiMenu2Line className="text-2xl" /> :
                                <RiCloseLargeLine className="text-2xl" />
                        }
                        <span className="ml-2 text-lg font-bold">Shop by Category</span>
                    </summary>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {categoryLinks}
                    </ul>
                </details>
                <div className="">
                    {pageLinks}
                </div>
            </nav>
        </nav>
    )
}

export default Navbar;