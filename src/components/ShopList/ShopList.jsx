import React from 'react';
import { Link } from 'react-router-dom';

const ShopList = ({ shop, index, isSelected, onCheckboxChange, onStatusChange }) => {

    const { _id, name, shopLogo, description, address, merchant, status } = shop;
    const server = import.meta.env.VITE_BACKEND_URL;

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        onStatusChange(_id, newStatus);
    };

    const handleEditShopId = (_id) => {
        localStorage.setItem('editShopId', _id);
        document.getElementById('edit_shop_modal').showModal();
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
                <select name="status" className="font-semibold select-bordered select select-xs select-info" defaultValue={status} onChange={handleStatusChange} >
                    <option className="text-success font-semibold" value="active">Active</option>
                    <option className="text-error font-semibold" value="inactive">Inactive</option>
                    <option className="text-warning font-semibold" value="pending">Pending</option>
                </select>
            </td>
            <td>
                {/* <button onClick={() => handleEditShopId(_id)} className="btn btn-xs btn-info btn-outline">Details</button> */}
                <Link to={`/dashboard/admin/shops/${_id}`} className="btn btn-xs btn-info btn-outline">Details</Link>

            </td>
        </tr>
    );
};

export default ShopList;