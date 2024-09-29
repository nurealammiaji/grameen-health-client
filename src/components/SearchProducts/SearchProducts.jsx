import React, { useState, useEffect, useRef } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useTranslation } from 'react-i18next';

const SearchProducts = ({ props }) => {

    const axiosPublic = useAxiosPublic();
    const { t } = useTranslation();


    return (
        <div className="relative">
            <label className={`input input-bordered input-success sm:input-sm lg:input-md items-center gap-2 flex join-item ${props}`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 font-bold text-success opacity-70">
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd" />
                </svg>
                <input
                    type="text"
                    placeholder={`${t('search')}...`}
                    className="grow"
                />
            </label>
        </div>
    );
}

export default SearchProducts;
