import React, { useEffect, useState } from 'react';
import HelmetAsync from '../../../../../components/HelmetAsync/HelmetAsync';
import { useLoaderData } from 'react-router-dom';
import CategoryDetails from '../../../../../components/CategoryDetails/CategoryDetails';

const ViewCategory = () => {

    const category = useLoaderData();
    const [categoryData, setCategoryData] = useState();

    useEffect(() => {
        if (category) {
            console.log(category, category.data);
            setCategoryData(category.data);
        }
    }, [category])

    return (
        <div>
            <HelmetAsync title={"Details"} />
            <div>
                <div className="w-6/12 mx-auto divider divider-success"><h3 className="text-2xl font-bold text-success">Category Details</h3></div>
            </div>
            <br />
            {
                (categoryData) &&
                <CategoryDetails categoryData={categoryData} />
            }
        </div>
    );
};

export default ViewCategory;