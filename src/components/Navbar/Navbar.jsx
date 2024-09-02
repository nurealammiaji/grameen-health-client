import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import { RiLoginCircleFill, RiUser3Fill, RiShoppingBag3Fill, RiMenu2Line, RiCloseLargeLine } from "react-icons/ri";

const Navbar = () => {

    const { user, logout } = useContext(AuthContext);
    const [menuToggle, setMenuToggle] = useState(true);
    const [categoryToggle, setCategoryToggle] = useState(true);

    const handleLogout = () => {
        logout();
    }

    const pageLinks = <ul className="menu menu-horizontal px-1">
        <li><Link to={"/terms"}>Terms</Link></li>
        <li>
            <details>
                <summary>Parent</summary>
                <ul className="p-2">
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                </ul>
            </details>
        </li>
        <li><a>Item 3</a></li>
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
            <nav className="bg-base-200 fixed z-50 flex w-full items-center justify-between py-5 px-2 lg:p-3 border-2 border-t-0 border-l-0 border-r-0">
                {/* Mobile Category */}
                <div className="items-center flex">
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
                    <Link to={"/"} className="font-bold text-success lg:text-2xl ml-2">Grameen Health</Link>
                </div>
                {/* Search Desktop */}
                <div className="join hidden lg:flex">
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
                    <button className="btn join-item btn-success text-white">Search</button>
                </div>
                <div>
                    <button className="btn btn-sm btn-ghost lg:btn-md text-success"><RiShoppingBag3Fill className="text-2xl lg:text-4xl" /></button>
                    {
                        (user) ?

                            <button className="btn btn-sm lg:btn-md btn-ghost text-success"><RiUser3Fill className="text-2xl lg:text-4xl" /></button> :
                            <Link to={"/login"} className="btn lg:btn-md btn-ghost text-success text-lg font-bold"><RiLoginCircleFill className="text-2xl lg:text-4xl hidden lg:block" /><RiUser3Fill className="text-2xl lg:hidden" /><span className="hidden lg:block">Login / Register</span></Link>
                    }
                </div>
            </nav>
            <div>
                <br /><br /><br />
            </div>
            {/* Second Navbar */}
            <nav className="bg-base-200 flex w-full items-center justify-around p-1">
                <details className="dropdown hidden lg:flex" >
                    <summary tabIndex={0} role="button" className="btn" onClick={() => setCategoryToggle(!categoryToggle)} >
                        {
                            (categoryToggle) ?
                                <RiMenu2Line className="text-2xl" /> :
                                <RiCloseLargeLine className="text-2xl" />
                        }
                        <span className="text-lg font-bold ml-2">Shop by Category</span>
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