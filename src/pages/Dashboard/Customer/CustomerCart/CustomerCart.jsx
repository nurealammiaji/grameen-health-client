import React from 'react'
import HelmetAsync from '../../../../components/HelmetAsync/HelmetAsync'

const CustomerCart = () => {
    return (
        <div>
            <HelmetAsync title={"Cart"} />
            <div>
                <div className="mx-auto sm:w-6/12 divider divider-success"><h3 className="p-2 text-2xl font-bold text-white bg-success">My Cart</h3></div>
            </div>
            <br /><br />
        </div>
    )
}

export default CustomerCart