import React from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './ShopDetails.css';
import EditShop from '../../components/EditShop/EditShop';

const ShopDetails = ({ shopData }) => {

    const { name, address, description, shopLogo, shopBanners, merchant, status, createdAt, updatedAt } = shopData;
    const { t } = useTranslation();
    const server = import.meta.env.VITE_BACKEND_URL;

    return (
        <div>
            <div className="w-10/12 mx-auto overflow-scroll card glass md:overflow-hidden">
                <div className="relative h-80">
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
                                (shopBanners) &&
                                shopBanners?.map((banner, index) => <SwiperSlide key={index}><img src={server + banner} alt="" /></SwiperSlide>)
                            }
                        </Swiper>
                    </figure>
                    <figure className="absolute z-10 w-24 h-24 overflow-hidden rounded-full bottom-5 sm:bottom-0 left-5 sm:left-10 sm:w-32 sm:h-32 ring-4 ring-primary">
                        <img src={server + shopLogo} className="w-full h-full" alt={`Logo of ${name} Shop`} />
                    </figure>
                    <div className="justify-end mt-5 mr-5 card-actions sm:mr-10">
                        <button onClick={() => document.getElementById('edit_shop_modal').showModal()} className="btn btn-primary btn-xs sm:btn-sm">Edit</button>
                    </div>
                    <span className={`${status === "active" && "badge-success" || status === "inactive" && "badge-error" || status === "pending" && "badge-warning"} text-white shadow absolute top-5 right-5 z-10 badge sm:badge-lg capitalize`}>{status}</span>
                </div>
                <div className="card-body">
                    <h2 className="mt-5 text-3xl card-title">{name}</h2>
                    <p className="mt-5 text-lg">{description}</p>
                    <div className="mt-8">
                        <h4 className="mb-2 font-semibold">Shop Address</h4>
                        <hr className="w-3/12 mb-2 border-primary" />
                        <p>{address}</p>
                    </div>
                    <div className="mt-5">
                        <h4 className="mb-2 font-semibold">Shop Owner</h4>
                        <hr className="w-3/12 mb-2 text-error border-primary" />
                        <p>Name: <span className="badge">{merchant.name}</span></p>
                        <p className="mt-1">Phone: <span className="badge">{merchant.phone}</span></p>
                    </div>
                </div>
            </div>
            <EditShop shopData={shopData} />
        </div>
    );
};

export default ShopDetails;
