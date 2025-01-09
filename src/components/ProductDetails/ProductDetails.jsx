import React from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './ProductDetails.css';
import EditProduct from '../EditProduct/EditProduct';

const ProductDetails = ({ productData }) => {

    const { name, description, price, specialPrice, category, subCategory, model, variants, images, brand, originCountry, manufacturer, shop, advanceMoney, quantity, status, createdAt, updatedAt } = productData;
    const { t } = useTranslation();
    const server = import.meta.env.VITE_BACKEND_URL;

    return (
        <div>
            <div className="w-10/12 mx-auto overflow-scroll card glass md:overflow-hidden">
                <div className="relative">
                    <figure className="w-full h-60">
                        <Swiper
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            navigation={true}
                            modules={[Autoplay, Navigation]}
                            className="mySwiper" >
                            {
                                (images) &&
                                images.map((image, index) => <SwiperSlide key={index}><img src={server + image} alt="" /></SwiperSlide>)
                            }
                        </Swiper>
                    </figure>
                    <span className={`${status === "active" && "badge-success" || status === "inactive" && "badge-error" || status === "pending" && "badge-warning"} text-white shadow absolute top-5 right-5 z-10 badge sm:badge-lg capitalize`}>{status}</span>
                </div>
                <div className="card-body">
                    <div className="flex justify-between">
                        <h2 className="text-3xl card-title">{name}</h2>
                        <div className="card-actions">
                            <button onClick={() => document.getElementById('edit_product_modal').showModal()} className="btn btn-primary btn-xs sm:btn-sm">Edit</button>
                        </div>
                    </div>
                    <p className="mt-5 text-lg">{description}</p>
                    <div className="mt-8">
                        <h4 className="mb-2 font-semibold">Product Details</h4>
                        <hr className="w-3/12 mb-2 text-error border-primary" />
                        <p>Price: <span className="badge">{price}</span></p>
                        <p className="mt-1">Special Price: <span className="badge">{specialPrice}</span></p>
                        <p className="mt-1">Category: <span className="badge">{category}</span></p>
                        <p className="mt-1">Sub Category: <span className="badge">{subCategory}</span></p>
                        <p className="mt-1">Model: <span className="badge">{model}</span></p>
                        <p className="mt-1">Brand: <span className="badge">{brand}</span></p>
                        <p className="mt-1">Origin Country: <span className="badge">{originCountry}</span></p>
                        <p className="mt-1">Manufacturer: <span className="badge">{manufacturer}</span></p>
                        <p className="mt-1">Shop: <span className="badge">{shop?.name}</span></p>
                        <p className="mt-1">Advance Money: <span className="badge">{advanceMoney}</span></p>
                        <p className="mt-1">Quantity: <span className="badge">{quantity}</span></p>
                        <p className="mt-1">Quantity: <span className="badge">{quantity}</span></p>
                    </div>
                    <div className="mt-5">
                        <h4 className="mb-2 font-semibold">Variants</h4>
                        <hr className="w-3/12 mb-2 border-primary" />
                        <p>{variants?.length}</p>
                    </div>
                </div>
            </div>
            <EditProduct productData={productData} />
        </div>
    );
};

export default ProductDetails;
