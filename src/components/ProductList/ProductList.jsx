import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ product, index, isSelected, onCheckboxChange, onStatusChange }) => {

    const { _id, name, description, price, specialPrice, category, subCategory, model, variants, images, brand, originCountry, manufacturer, shop, advanceMoney, quantity, status, createdAt, updatedAt } = product;

    const server = import.meta.env.VITE_BACKEND_URL;

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        onStatusChange(_id, newStatus);
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
                <p className="text-sm opacity-50">{2}</p>
            </td>
            <td>
                <span>{brand}</span>
                <br />
                <span className="badge badge-ghost badge-sm">{manufacturer}</span>
            </td>
            <td>
                <select name="status" className="font-semibold select-bordered select select-xs" defaultValue={status} onChange={handleStatusChange} >
                    <option className="font-semibold text-success" value="active">Active</option>
                    <option className="font-semibold text-error" value="inactive">Inactive</option>
                    <option className="font-semibold text-warning" value="pending">Pending</option>
                </select>
            </td>
            <td>
                <Link to={`/dashboard/admin/products/${_id}`} className="btn btn-xs btn-info btn-outline">Details</Link>
            </td>
        </tr>
    );
};

export default ProductList;