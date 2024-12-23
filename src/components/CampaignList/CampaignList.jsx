import React from 'react';
import { Link } from 'react-router-dom';

const CampaignList = ({ campaign, index, isSelected, onCheckboxChange, onStatusChange }) => {

    const { _id, name, image, description, campaignType, startDate, endDate, discountPercent, status } = campaign;
    const server = import.meta.env.VITE_BACKEND_URL;

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        onStatusChange(_id, newStatus);
    };

    return (
        <tr>
            <th>
                <label>
                    <input value={_id} type="checkbox" className="checkbox checkbox-error tooltip tooltip-right" data-tip="Select" checked={isSelected} onChange={() => onCheckboxChange(_id)} />
                </label>
            </th>
            <td>
                <div className="avatar">
                    <div className="w-12 h-12 mask mask-squircle">
                        <img
                            src={server + image}
                            alt="Campaign Image" />
                    </div>
                </div>
            </td>
            <td>
                <div>
                    <div className="font-bold">{name}</div>
                    <p className="mt-1 text-sm"><span className="text-white badge badge-primary badge-outline">{campaignType}</span></p>
                </div>
            </td>
            <td>
                <select name="status" className="font-semibold select-bordered select select-xs" defaultValue={status} onChange={handleStatusChange} >
                    <option className="font-semibold text-success" value="active">Active</option>
                    <option className="font-semibold text-error" value="inactive">Inactive</option>
                    <option className="font-semibold text-warning" value="pending">Pending</option>
                </select>
            </td>
            <td>
                <Link to={`/dashboard/admin/campaigns/${_id}`} className="btn btn-xs btn-info btn-outline">Details</Link>
            </td>
        </tr>
    );
};

export default CampaignList;