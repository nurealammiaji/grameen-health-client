import React, { useEffect, useState } from 'react';
import { RiShoppingCart2Line, RiHeartLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const FlashSaleCard = () => {

    const images = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_hxSusnkz0kb7EyB1ScC_AMt_LgoRt1aRwQ&s",
        "https://www.oxygencylinderbd.com/wp-content/uploads/2019/11/Blood-Sugar-Machine.jpg",
        "https://www.bdshop.com/pub/media/catalog/product/cache/eaf695a7c2edd83636a0242f7ce59484/g/e/gearup_bgm-20_portable_blood_glucose_meter.jpg",
        "https://cdn.bdstall.com/product-image/giant_105692.jpg"
    ];

    const [productImage, setProductImage] = useState(images[0]);

    return (
        <div className="w-full border-2 border-transparent shadow-xl card bg-base-100 hover:border-success hover:bg-green-100">
            <figure className="h-48">
                <img className="w-full h-full"
                    src={productImage}
                    alt="Shoes" />
            </figure>
            <div className="flex justify-between gap-3 p-3">
                {
                images && images.map((image, index) => <button key={index} onClick={() => setProductImage(image)} className={`${productImage === image ? 'border-error' : ''} border-2 rounded-2xl w-1/4 h-12`}>
                <img className="w-full h-full"
                    src={image}
                    alt="Product" />
            </button>)
                }
            </div>
            <div className="card-body">
                <Link className="card-title">Products!</Link>
                <p className="mt-5">Price:</p>
                <div className="justify-center mt-5 card-actions">
                    <div className="join">
                        {/* <Link to={`/products/`}>
                            <button className="btn hover:btn-ghost btn-info join-item tooltip" data-tip="View Details"><RiEyeLine className="text-xl" /></button>
                        </Link> */}
                        <button className="text-xl bg-red-200 border border-r-0 hover:text-2xl btn text-error hover:text-white hover:btn-error join-item tooltip border-error" data-tip="Add to Wishlist"><RiHeartLine /></button>
                        <button className="text-xl bg-green-200 border border-l-0 hover:text-2xl border-success btn hover:btn-success text-success hover:text-white join-item tooltip" data-tip="Add to Cart"><RiShoppingCart2Line /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashSaleCard;