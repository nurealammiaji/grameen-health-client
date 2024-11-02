import React, { useEffect, useState } from 'react';
import HelmetAsync from '../../../../../components/HelmetAsync/HelmetAsync';
import { useLoaderData } from 'react-router-dom';
import SubCategoryDetails from '../../../../../components/SubCategoryDetails/SubCategoryDetails';

const ViewSubCategory = () => {

    const subCategory = useLoaderData();
    const [subCategoryData, setSubCategoryData] = useState();

    useEffect(() => {
        if (subCategory) {
            console.log(subCategory, subCategory.data);
            setSubCategoryData(subCategory.data);
        }
    }, [subCategory])

    return (
        <div>
            <HelmetAsync title={"Details"} />
            <div>
                <div className="w-6/12 mx-auto divider divider-success"><h3 className="text-2xl font-bold text-success">Sub Category Details</h3></div>
            </div>
            <br />
            {
                (subCategoryData) &&
                <SubCategoryDetails subCategoryData={subCategoryData} />
            }
        </div>
    );
};

export default ViewSubCategory;