import React from 'react'
import HelmetAsync from '../../../../components/HelmetAsync/HelmetAsync'

const CustomerPayments = () => {
    return (
        <div>
            <HelmetAsync title={"Payments"} />
            <div>
                <div className="mx-auto sm:w-6/12 divider divider-success"><h3 className="p-2 text-2xl font-bold text-white bg-success">My Payments</h3></div>
            </div>
            <br /><br />
        </div>
    )
}

export default CustomerPayments