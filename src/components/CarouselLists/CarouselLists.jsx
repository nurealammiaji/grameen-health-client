import React, { useContext, useEffect, useState } from 'react';
import ShopEditForm from '../ShopEditForm/ShopEditForm';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useCarousels from '../../hooks/useCarousels';
import CarouselList from '../CarouselList/CarouselList';
import { CarouselContext } from '../../providers/CarouselProvider';

const CarouselLists = () => {

    const { addCarousel, editCarousel, deleteCarousels, selectedCarousels, setSelectedCarousels } = useContext(CarouselContext);
    const { isCarouselsLoading, carousels, refetchCarousels, isCarouselsError, carouselsError } = useCarousels();
    const [allSelected, setAllSelected] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        if (carousels) {
            setAllSelected(selectedCarousels.length === carousels.length && carousels.length > 0);
        }
    }, [selectedCarousels, carousels]);

    // Function to handle checkbox changes
    const handleCheckboxChange = (shopId) => {
        setSelectedCarousels((prevSelected) => {
            if (prevSelected.includes(shopId)) {
                // If already selected, remove it
                return prevSelected.filter(id => id !== shopId);
            } else {
                // If not selected, add it
                return [...prevSelected, shopId];
            }
        });
    };

    // Function to handle "Select All" checkbox
    const handleSelectAllChange = () => {
        if (allSelected) {
            setSelectedCarousels([]); // Deselect all
        } else {
            setSelectedCarousels(carousels.map(shop => shop._id)); // Select all
        }
    };

    const onStatusChange = (shopId, newStatus) => {
        console.log(`Shop ID: ${shopId}, New Status: ${newStatus}`);
        // axiosPrivate.put(`/shops/${shopId}`, { status: newStatus })
        //      .then(response => {
        //          // Handle success
        //      })
        //      .catch(error => {
        //          // Handle error
        //      });
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="text-black border bg-slate-100">
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox checkbox-error tooltip tooltip-right" data-tip="Select All" checked={allSelected} onChange={handleSelectAllChange} />
                                </label>
                            </th>
                            <th>Carousel Name</th>
                            <th>Destination URL</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Carousels */}
                        {
                            (carousels) &&
                            carousels.map((carousel, index) => <CarouselList key={carousel._id} carousel={carousel} index={index} isSelected={selectedCarousels.includes(carousel._id)} onCheckboxChange={handleCheckboxChange} onStatusChange={onStatusChange} />)
                        }
                        {console.log(carousels)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CarouselLists;