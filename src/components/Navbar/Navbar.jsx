import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";

const Navbar = () => {

    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    }

    return (
        <nav>
            <div className="navbar bg-base-200">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><a>Item 1</a></li>
                            <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a>Item 3</a></li>
                        </ul>
                    </div>
                    <Link to={"/"} className="text-xl font-bold text-success">Grameen Health</Link>
                </div>
                <div className="hidden navbar-center lg:flex">
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
                            <div>
                                <button className="btn btn-sm">{user.email}</button>
                                <span className="mx-2">||</span>
                                <button onClick={handleLogout} className="p-2 btn btn-sm btn-circle"><AiOutlineLogout className="font-bold text-error" /></button>
                            </div> :
                            <Link to={"/login"} className="p-2 btn btn-sm tooltip tooltip-bottom btn-circle" data-tip="Login" ><AiOutlineLogin className="font-bold text-success" /></Link>
                    }
                </div>
            </div>
            <br /><br />
        </nav>
    )
}

export default Navbar;