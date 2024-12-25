import React from 'react';
import { Link } from 'react-router-dom';

const PaymentList = ({ payment, index, isSelected, onCheckboxChange, onStatusChange, onCampaignChange }) => {

    const { _id, name, description, price, specialPrice, category, subCategory, model, variants, images, brand, originCountry, manufacturer, shop, advanceMoney, quantity, status, campaign, createdAt, updatedAt } = payment;

    const server = import.meta.env.VITE_BACKEND_URL;

    const campaignTypes = [
        { name: "Flash Sale" },
        { name: "New Arrivals" },
        { name: "Festival Sale" },
        { name: "Discount Sale" },
        { name: "Clearance Sale" },
    ];

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        onStatusChange(_id, newStatus);
    };

    const handleCampaignChange = (event) => {
        const newCampaign = event.target.value;
        onCampaignChange(_id, newCampaign);
    };

    return (
        <tr>
            <th>
                <label>
                    <input value={_id} type="checkbox" className="checkbox checkbox-error tooltip tooltip-right" data-tip="Select" checked={isSelected} onChange={() => onCheckboxChange(payment._id)} />
                </label>
            </th>
            <td>
                <div className="flex gap-4">
                    <div className="avatar">
                        <div className="w-12 h-12 mask mask-squircle">
                            <img
                                src={server + images[0]}
                                alt="Product Logo" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{name}</div>
                        <p className="mt-1 text-sm opacity-50">{brand}</p>
                    </div>
                </div>
            </td>
            <td>
                <span>{shop.name}</span>
                <br />
                <p className="mt-1 text-sm opacity-50">{manufacturer}</p>
            </td>
            <td>
                <select name="status" className="font-semibold select-bordered select select-xs" defaultValue={status} onChange={handleStatusChange}>
                    <option className="font-semibold text-success" value="active">Active</option>
                    <option className="font-semibold text-error" value="inactive">Inactive</option>
                    <option className="font-semibold text-warning" value="pending">Pending</option>
                </select>
            </td>
            <td>
                <select name="campaign" className="font-semibold select-bordered select select-xs" defaultValue={campaign} onChange={handleCampaignChange}>
                    <option className="font-medium text-slate-500" value={null}>None</option>
                    {campaignTypes && campaignTypes.map((type, index) => <option key={index} value={type.name} className="font-medium">{type.name}</option>)}
                </select>
            </td>
            <td>
                <Link to={`/dashboard/admin/products/${_id}`} className="btn btn-xs btn-info btn-outline">Details</Link>
            </td>
        </tr>
    );
};

export default PaymentList;