import React from 'react';
import { Link } from 'react-router-dom';

const CarouselList = ({ carousel, index, isSelected, onCheckboxChange, onStatusChange }) => {

    const { _id, name, image, description, destination, status } = carousel;
    const server = import.meta.env.VITE_BACKEND_URL;

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        onStatusChange(_id, newStatus);
    };

    return (
        <tr>
            <th>
                <label>
                    <input value={_id} type="checkbox" className="checkbox" checked={isSelected} onChange={() => onCheckboxChange(carousel._id)} />
                </label>
            </th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="w-12 h-12 mask mask-squircle">
                            <img
                                src={server + image}
                                alt="Carousel Image" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{name}</div>
                        <p className="text-sm opacity-50">{description}</p>
                    </div>
                </div>
            </td>
            <td>
                <span>{destination}</span>
                <br />
                {/* <span className="badge badge-ghost badge-sm">{merchant.phone}</span> */}
            </td>
            <td>
                <select name="status" className="font-semibold select-bordered select select-xs" defaultValue={status} onChange={handleStatusChange} >
                    <option className="font-semibold text-success" value="active">Active</option>
                    <option className="font-semibold text-error" value="inactive">Inactive</option>
                    <option className="font-semibold text-warning" value="pending">Pending</option>
                </select>
            </td>
            <td>
                <Link to={`/dashboard/admin/carousels/${_id}`} className="btn btn-xs btn-info btn-outline">Details</Link>
            </td>
        </tr>
    );
};

export default CarouselList;