import React, { useEffect, useState } from 'react';
import { RiSunLine, RiMoonLine } from 'react-icons/ri';
import 'theme-change';

const ThemeChanger = () => {
    const [darkTheme, setDarkTheme] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setDarkTheme(savedTheme === 'forest');
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }, []);

    const handleThemeChange = (event) => {
        const theme = event.target.checked ? 'forest' : 'cupcake';
        setDarkTheme(event.target.checked);
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    return (
        <label className="swap swap-rotate text-success">
            <input
                type="checkbox"
                className="theme-controller"
                checked={darkTheme}
                onChange={handleThemeChange}
            />
            {/* Sun icon for Cupcake theme (light mode) */}
            <RiSunLine className="text-3xl lg:text-4xl swap-off" />
            {/* Moon icon for Forest theme (dark mode) */}
            <RiMoonLine className="text-3xl lg:text-4xl swap-on" />
        </label>
    );
}

export default ThemeChanger;
