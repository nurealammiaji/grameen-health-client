import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import { RiLoginCircleFill, RiLogoutCircleRFill, RiUser3Fill, RiMenu2Line, RiCloseLargeLine } from "react-icons/ri";

const Navbar = () => {

    const { user, logout } = useContext(AuthContext);
    const [menuToggle, setMenuToggle] = useState(true);
    const [categoryToggle, setCategoryToggle] = useState(true);

    const handleLogout = () => {
        logout();
    }

    return (
        <nav>
            <div className="navbar bg-base-200 fixed z-50">
                <div className="">
                    <details className="dropdown" >
                        <summary tabIndex={0} role="button" className="btn btn-sm lg:hidden" onClick={() => setMenuToggle(!menuToggle)} >
                            {
                                (menuToggle) ?
                                    <RiMenu2Line className="text-2xl" /> :
                                    <RiCloseLargeLine className="text-2xl" />
                            }
                        </summary>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><NavLink to={"/terms"}>Terms</NavLink></li>
                            <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a>Item 3</a></li>
                        </ul>
                    </details>
                    <Link to={"/"} className="min-w-full lg:min-w-max font-bold text-success lg:text-lg">Grameen Health</Link>
                </div>
                <div className="ml-20 navbar">
                    {/* Category Links */}
                    <div>
                        <details className="dropdown" >
                            <summary tabIndex={0} role="button" className="btn btn-sm lg:flex hidden text-lg" onClick={() => setCategoryToggle(!categoryToggle)} >
                                {
                                    (categoryToggle) ?
                                        <RiMenu2Line className="text-2xl" /> :
                                        <RiCloseLargeLine className="text-2xl" />
                                }
                                Category
                            </summary>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li><NavLink to={"/terms"}>Terms</NavLink></li>
                                <li>
                                    <a>Parent</a>
                                    <ul className="p-2">
                                        <li><a>Submenu 1</a></li>
                                        <li><a>Submenu 2</a></li>
                                    </ul>
                                </li>
                                <li><a>Item 3</a></li>
                            </ul>
                        </details>
                    </div>
                    {/* Search Desktop */}
                    <div className="ml-10 hidden lg:block">
                        <label className="input input-sm input-bordered flex items-center gap-2">
                            <input type="text" className="grow" placeholder="Search" />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd" />
                            </svg>
                        </label>
                    </div>
                </div>
                <div className="hidden lg:flex navbar-start">
                    <ul className="px-1 menu menu-horizontal">
                        <li><NavLink to={"/terms"}>Terms</NavLink></li>
                        <li>
                            <details>
                                <summary>Parent</summary>
                                <ul className="w-32 p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </details>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        (user) ?
                            <div className="flex items-center">
                                <button className="mr-2 btn btn-sm"><RiUser3Fill className="font-bold text-success" /><span className="hidden md:block">{user.email}</span></button>
                                <button onClick={handleLogout} className="btn btn-sm"><RiLogoutCircleRFill className="font-bold text-error" /><span className="hidden md:block">Logout</span></button>
                            </div> :
                            <Link to={"/login"} className="btn btn-sm"><RiLoginCircleFill className="font-bold text-success" /><span className="hidden md:block">Login</span></Link>
                    }
                </div>
            </div>
            <br /><br /><br />
        </nav>
    )
}

export default Navbar;