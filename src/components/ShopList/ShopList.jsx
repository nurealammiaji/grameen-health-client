import React, { useState } from 'react';

const ShopList = ({ shop, index, isSelected, onCheckboxChange, onStatusChange }) => {

    const { _id, name, shopLogo, description, address, merchant, status } = shop;
    const server = import.meta.env.VITE_BACKEND_URL;

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        // Call the parent function to handle status change
        onStatusChange(_id, newStatus);
    };

    return (
        <tr>
            <th>
                <label>
                    <input value={_id} type="checkbox" className="checkbox" checked={isSelected} onChange={() => onCheckboxChange(shop._id)} />
                </label>
            </th>
            <td>
                {index + 1}
            </td>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="w-12 h-12 mask mask-squircle">
                            <img
                                src={server + shopLogo}
                                alt="Shop Logo" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{name}</div>
                        <p className="text-sm opacity-50">{address}</p>
                    </div>
                </div>
            </td>
            <td>
                <span>{merchant.name}</span>
                <br />
                <span className="badge badge-ghost badge-sm">{merchant.phone}</span>
            </td>
            <td>
                <select name="status" className="font-semibold select-bordered select select-xs" defaultValue={status} onChange={handleStatusChange} >
                    <option className="text-success" value="active">Active</option>
                    <option className="text-error" value="inactive">Inactive</option>
                    <option className="text-warning" value="pending">Pending</option>
                </select>
            </td>
            <td>
                <button className="btn btn-xs">details</button>
            </td>
        </tr>
    );
};

export default ShopList;