import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ product, index, isSelected, onCheckboxChange, onStatusChange, onCampaignChange }) => {

    const { _id, name, description, price, specialPrice, category, subCategory, model, variants, images, brand, originCountry, manufacturer, shop, advanceMoney, quantity, status, campaign, createdAt, updatedAt } = product;

    const server = import.meta.env.VITE_BACKEND_URL;

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
                    <input value={_id} type="checkbox" className="checkbox" checked={isSelected} onChange={() => onCheckboxChange(product._id)} />
                </label>
            </th>
            <td>
                <div className="avatar">
                    <div className="w-12 h-12 mask mask-squircle">
                        <img
                            src={server + images[0]}
                            alt="Product Logo" />
                    </div>
                </div>
            </td>
            <td>
                <div className="font-bold">{name}</div>
                <p className="text-sm opacity-50">{brand}</p>
            </td>
            <td>
                <span>{shop.name}</span>
                <br />
                <p className="text-sm opacity-50">{manufacturer}</p>
            </td>
            <td>
                <select name="status" className="font-semibold select-bordered select select-xs" defaultValue={status} onChange={handleStatusChange} >
                    <option className="font-semibold text-success" value="active">Active</option>
                    <option className="font-semibold text-error" value="inactive">Inactive</option>
                    <option className="font-semibold text-warning" value="pending">Pending</option>
                </select>
            </td>
            <td>
                <select name="campaign" className="font-semibold select-bordered select select-xs" defaultValue={campaign} onChange={handleCampaignChange} >
                    <option className="font-medium" value={null}>None</option>
                    <option className="font-medium text-info" value="new">New</option>
                    <option className="font-medium text-warning" value="flash">Flash</option>
                    <option className="font-medium text-success" value="discount">Discount</option>
                    <option className="font-medium text-error" value="clearance">Clearance</option>
                </select>
            </td>
            <td>
                <Link to={`/dashboard/admin/products/${_id}`} className="btn btn-xs btn-info btn-outline">Details</Link>
            </td>
        </tr>
    );
};

export default ProductList;