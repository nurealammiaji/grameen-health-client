import React, { useEffect, useState } from 'react';
import { RiShoppingCart2Line, RiHeartLine, RiEye2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";

const FlashSaleCard = ({ product }) => {

    const { _id, name, description, images, price, specialPrice, category, subCategory, variants, shop, quantity, advanceMoney, originCountry, manufacturer, model, brand, status, campaign, rating, reviews } = product;

    const server = import.meta.env.VITE_BACKEND_URL;

    // const images = [
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_hxSusnkz0kb7EyB1ScC_AMt_LgoRt1aRwQ&s",
    //     "https://www.oxygencylinderbd.com/wp-content/uploads/2019/11/Blood-Sugar-Machine.jpg",
    //     "https://www.bdshop.com/pub/media/catalog/product/cache/eaf695a7c2edd83636a0242f7ce59484/g/e/gearup_bgm-20_portable_blood_glucose_meter.jpg",
    //     "https://cdn.bdstall.com/product-image/giant_105692.jpg"
    // ];

    const [productImage, setProductImage] = useState(server + images[0]);

    function calculateDiscountPercentage(originalPrice, discountPrice) {
        const discount = originalPrice - discountPrice;
        const percentageOff = (discount / originalPrice) * 100;
        return percentageOff.toFixed(2);
    }

    const discountPercentage = calculateDiscountPercentage(price, specialPrice);

    return (
        <div className="w-full overflow-hidden transition-colors duration-300 delay-150 border-2 border-transparent shadow-xl card bg-base-100 hover:border-success hover:bg-green-100 group">
            <figure className="relative h-60">
                <img className="w-full h-full"
                    src={productImage}
                    alt="Product" />
            </figure>
            <div className="flex items-center gap-3 p-3">
                {
                    images && images.map((image, index) => <button key={index} onClick={() => setProductImage(server + image)} className={`${productImage === server + image ? 'border-error' : ''} border-2 rounded-2xl w-1/4 h-12`}>
                        <img className="w-full h-full"
                            src={server + image}
                            alt="Product" />
                    </button>)
                }
            </div>
            {/* <p className="absolute text-white rotate-45 bg-success">{price%specialPrice} %</p> */}
            <div className={`${discountPercentage > 0 ? 'block' : 'hidden'} absolute px-14 py-1 text-sm font-semibold text-white transform -rotate-45 rounded-md top-5 -left-14 bg-success/90`}>
                {discountPercentage}% OFF
            </div>
            <div className="px-5 pb-5 mt-4">
                <Link to={`/products/${_id}`} className="text-2xl font-semibold text-center">{name}</Link>
                <div className="flex items-center justify-center mt-4">
                    {/* <span className="mr-3">Rating:</span> */}
                    <ReactStars
                        classNames={""}
                        count={5}
                        value={rating ? rating : 4}
                        size={24}
                        edit={false}
                        activeColor="#ffd700"
                    />
                </div>
                <p className="mt-3">Price: <span className="text-2xl">৳</span> <span className="text-success">{specialPrice}</span> <span className="text-red-300 line-through">{price}</span>
                </p>
                <div className="justify-center mt-5 card-actions">
                    <div className="join">
                        {/* <Link to={`/products/${_id}`}>
                            <button className="text-xl transition-colors duration-300 delay-150 bg-blue-200 border border-r-0 hover:text-2xl btn text-info hover:text-white hover:btn-info btn-sm join-item tooltip border-info tooltip-bottom" data-tip="View Details"><RiEye2Line /></button>
                        </Link> */}
                        <button className="text-xl transition-colors duration-300 delay-150 bg-red-200 border border-r-0 hover:text-2xl btn text-error hover:text-white hover:btn-error btn-sm join-item tooltip border-error" data-tip="Add to Wishlist"><RiHeartLine /></button>
                        <button className="text-xl transition-colors duration-300 delay-150 bg-green-200 border border-l-0 hover:text-2xl border-success btn btn-sm hover:btn-success text-success hover:text-white join-item tooltip" data-tip="Add to Cart"><RiShoppingCart2Line /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashSaleCard;