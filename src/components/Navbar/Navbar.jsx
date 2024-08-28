import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineClose, AiOutlineLogin, AiOutlineLogout, AiOutlineMenu, AiOutlineMenuFold, AiOutlineUser } from "react-icons/ai";
import { RiLogoutCircleFill, RiUser3Fill } from "react-icons/ri";

const Navbar = () => {

    const { user, logout } = useContext(AuthContext);
    const [menuToggle, setMenuToggle] = useState(true);

    const handleLogout = () => {
        logout();
    }

    return (
        <nav>
            <div className="navbar bg-base-200">
                <div className="navbar-start">
                    <details className="dropdown" >
                        <summary tabIndex={0} role="button" className="btn btn-sm lg:hidden" onClick={() => setMenuToggle(!menuToggle)} >
                            {
                                (menuToggle) ?
                                    <AiOutlineMenu className="text-2xl" /> :
                                    <AiOutlineClose className="text-2xl" />
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
                    <Link to={"/"} className="min-w-full font-bold text-success">Grameen Health</Link>
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
                            <div className="flex items-center">
                                <button className="mr-2 btn btn-sm btn-neutral"><RiUser3Fill className="font-bold text-success" /><span className="hidden md:block">{user.email}</span></button>
                                <button onClick={handleLogout} className="btn btn-sm btn-neutral"><RiLogoutCircleFill className="font-bold text-error" /><span className="hidden md:block">Logout</span></button>
                            </div> :
                            <Link to={"/login"} className="btn btn-sm btn-neutral"><AiOutlineLogin className="font-bold text-success" /><span className="hidden md:block">Login</span></Link>
                    }
                </div>
            </div>
            <br /><br />
        </nav>
    )
}

export default Navbar;