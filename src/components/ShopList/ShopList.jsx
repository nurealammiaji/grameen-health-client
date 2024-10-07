import React from 'react';

const ShopList = ({ shop, index }) => {

    const {_id, name, shopLogo, description, address, merchant, status} = shop;
    const server = import.meta.env.VITE_BACKEND_URL;

    return (
        <tr>
            <th>
                <label>
                    <input value={_id} type="checkbox" className="checkbox" />
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
                                alt="Avatar Tailwind CSS Component" />
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
            <td>{status}</td>
            <td>
                <button className="btn btn-xs">details</button>
            </td>
        </tr>
    );
};

export default ShopList;