import React, { useEffect } from 'react';
import { themeChange } from 'theme-change';

const ThemeChanger = () => {

    useEffect(() => {
        themeChange(false)
    }, [])

    return (
        <div>
            
        </div>
    );
};

export default ThemeChanger;