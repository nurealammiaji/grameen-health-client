import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import { RiMenu2Line, RiCloseLargeLine, RiPieChart2Fill, RiMapPinFill, RiTimerFlashFill, RiHome8Fill, RiPhoneFill, RiShoppingCart2Line, RiHeartLine, RiUserReceived2Line, RiUser3Line } from "react-icons/ri";
import { BiSolidCategory } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import icon from "../../assets/icon.png";
import useUser from "../../hooks/useUser";
import Swal from "sweetalert2";
import ThemeChanger from "../ThemeChanger/ThemeChanger";
import SearchDropdownAll from "../SearchDropdownAll/SearchDropdownAll";
import { useTranslation } from 'react-i18next';
import LanguageChanger from "../LanguageChanger/LanguageChanger";

const Navbar = () => {

    const { user, logout, authenticated } = useContext(AuthContext);
    const [menuToggle, setMenuToggle] = useState(true);
    const [categoryToggle, setCategoryToggle] = useState(true);
    const { isUserLoading, isUserError, userData, refetchUser, userError } = useUser();
    const { t } = useTranslation();

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
        <li className="tooltip tooltip-bottom" data-tip={t('home')}><NavLink to={"/"} className="text-white"><RiHome8Fill className="text-2xl lg:text-3xl" /><span className="hidden font-semibold lg:block">{t('home')}</span></NavLink></li>
        <li className="tooltip tooltip-bottom" data-tip={t('campaigns')}><NavLink to={"/campaigns"} className="text-white"><RiTimerFlashFill className="text-2xl lg:text-3xl" /><span className="hidden font-semibold lg:block">{t('campaigns')}</span></NavLink></li>
        <li className="tooltip tooltip-bottom" data-tip={t('orderTracking')}><NavLink to={"/tracking"} className="text-white"><RiMapPinFill className="text-2xl lg:text-3xl" /><span className="hidden font-semibold lg:block">{t('orderTracking')}</span></NavLink></li>
        <li className="tooltip tooltip-bottom" data-tip={t('contact')}><NavLink to={"/contact"} className="text-white"><RiPhoneFill className="text-2xl lg:text-3xl" /><span className="hidden font-semibold lg:block">{t('contact')}</span></NavLink></li>
        {
            (user && userData?.role === "admin") &&
            <li className="tooltip tooltip-bottom" data-tip={t('dashboard')}><NavLink to={"/dashboard/admin"} className="text-white" ><RiPieChart2Fill className="text-2xl lg:text-3xl" /><span className="hidden font-semibold lg:block">{t('dashboard')}</span></NavLink></li>
        }
        {
            (user && userData?.role === "merchant") &&
            <li className="tooltip tooltip-bottom" data-tip={t('dashboard')}><NavLink to={"/dashboard/merchant"} className="text-white"><RiPieChart2Fill className="text-2xl lg:text-3xl" /><span className="hidden font-semibold lg:block">{t('dashboard')}</span></NavLink></li>
        }
        {
            (user && userData?.role === "customer") &&
            <li className="tooltip tooltip-bottom" data-tip={t('dashboard')}><NavLink to={"/dashboard/customer"} className="text-white"><RiPieChart2Fill className="text-2xl lg:text-3xl" /><span className="hidden font-semibold lg:block">{t('dashboard')}</span></NavLink></li>
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
            <nav className="fixed top-0 z-50 flex items-center justify-between w-full px-2 py-3 md:py-5 bg-base-200 lg:p-3">
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
                            {/* Language Changer */}
                            <div className="flex items-center gap-10 p-2 mx-auto mb-3 sm:hidden">
                                <div className="mx-auto">
                                    <LanguageChanger />
                                </div>
                                {/* Theme Changer */}
                                <div className="tooltip tooltip-bottom" data-tip={t('changeTheme')}>
                                    <ThemeChanger />
                                </div>
                            </div>
                            {categoryLinks}
                        </ul>
                    </details>
                    <Link to={"/"} className="items-center font-bold text-success md:flex lg:text-2xl"><img src={icon} className="w-10 h-10 text-2xl font-bold md:w-8 md:h-8 text-success" alt="Grameen Health Icon" /><span className="hidden ml-2 text-2xl font-bold text-success md:block lg:hidden">GH</span><span className="hidden ml-2 text-2xl font-bold text-success lg:block">{t('grameenHealth')}</span></Link>
                </div>
                {/* Search Desktop */}
                <div className="hidden sm:block">
                    <SearchDropdownAll props={'mx-auto'} />
                </div>
                <div className="flex items-center">
                    {/* Language Changer */}
                    <div className="hidden mr-5 sm:block lg:mr-10">
                        <LanguageChanger />
                    </div>
                    {/* Mobile Search */}
                    <div className="ml-5 sm:hidden">
                        <button className="tooltip tooltip-bottom" data-tip="Search">
                            <label htmlFor="search-drawer" className="drawer-button md:hidden"><BsSearch className="text-2xl text-success" /></label>
                        </button>
                    </div>
                    {/* Theme Changer */}
                    <div className="hidden tooltip tooltip-bottom sm:block" data-tip={t('changeTheme')}>
                        <ThemeChanger />
                    </div>
                    {/* Wishlist */}
                    <div className="ml-3 sm:ml-5 md:ml-10 indicator tooltip tooltip-bottom" data-tip={t('wishlist')}>
                        <span className="text-white indicator-item indicator-end indicator-top badge bg-lime-500">0</span>
                        <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                            <Link to={"/dashboard/customer/wishlist"} tabIndex={0} role="button" className="text-success"><RiHeartLine className="text-3xl lg:text-4xl" /></Link>
                            <div
                                tabIndex={0}
                                className="dropdown-content card card-compact bg-base-100 z-[1] w-64 p-2 shadow">
                                <div className="card-body">
                                    <h3 className="card-title">{t('wishlist')}</h3>
                                    <p>you can use any element as a dropdown.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Cart */}
                    <div className="mx-3 sm:mx-5 md:mr-10 indicator tooltip tooltip-bottom" data-tip={t('cart')}>
                        <span className="text-white indicator-item indicator-end indicator-top badge bg-lime-500">0</span>
                        <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                            <Link to={"/dashboard/customer/cart"} tabIndex={0} role="button" className="text-success"><RiShoppingCart2Line className="text-3xl lg:text-4xl" /></Link>
                            <div
                                tabIndex={0}
                                className="dropdown-content card card-compact bg-base-100 z-[1] w-64 p-2 shadow">
                                <div className="card-body">
                                    <h3 className="card-title">{t('cart')}</h3>
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
                                            <Link to={"/dashboard/admin/profile"}>{t('profile')}</Link>
                                        }
                                        {
                                            (userData?.role === "merchant") &&
                                            <Link to={"/dashboard/merchant/profile"}>{t('profile')}</Link>
                                        }
                                        {
                                            (userData?.role === "customer") &&
                                            <Link to={"/dashboard/customer/profile"}>{t('profile')}</Link>
                                        }
                                    </li>
                                    <li><button onClick={handleLogout}>{t('logout')}</button></li>
                                </ul>
                            </div> :
                            <div className="dropdown dropdown-hover dropdown-bottom dropdown-end tooltip tooltip-bottom" data-tip={t('login')}>
                                <Link to={"/login"} tabIndex={0} role="button" className="flex items-center text-success"><RiUserReceived2Line className="text-3xl lg:text-4xl xl:hidden" /><span className="hidden ml-2 font-semibold xl:block">{t('login')} / {t('register')}</span></Link>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    <li><Link to={"/login"}>{t('login')}</Link></li>
                                    <li><Link to={"/register"}>{t('register')}</Link></li>
                                </ul>
                            </div>
                    }
                </div>
            </nav>
            {/* Second Navbar */}
            <nav className="fixed flex items-center justify-around w-full bg-success z-[10] md:top-[75px] top-[64px] lg:top-[72px]">
                <details className="hidden dropdown md:flex tooltip tooltip-bottom" data-tip={t('categories')}>
                    <summary tabIndex={0} role="button" className="flex items-center text-white sm:btn-sm lg:btn-md btn btn-outline" onClick={() => setCategoryToggle(!categoryToggle)} >
                        {
                            (categoryToggle) ?
                                <BiSolidCategory className="lg:text-2xl" /> :
                                <RiCloseLargeLine className="lg:text-2xl" />
                        }
                        <span className="font-bold lg:text-lg">{t('categories')}</span>
                    </summary>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {categoryLinks}
                    </ul>
                </details>
                <div className="">
                    {pageLinks}
                </div>
            </nav>
            <div className="mb-[119px] md:mb-[130px] lg:mb-[133px]"></div>
        </nav>
    )
}

export default Navbar;