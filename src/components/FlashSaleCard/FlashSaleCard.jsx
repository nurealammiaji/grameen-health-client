import React from 'react';

const FlashSaleCard = () => {
    return (
        <div className="w-full shadow-xl md:w-96 card bg-base-100">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Products!</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, odit?</p>
                <div className="justify-center gap-5 mt-5 card-actions">
                    <button className="btn btn-info btn-sm">See Details</button>
                    <button className="btn btn-primary btn-sm">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FlashSaleCard;