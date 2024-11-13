import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './FlashSale.css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import FlashSaleCard from '../FlashSaleCard/FlashSaleCard';
import { Link } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';

const FlashSale = () => {

    const { isProductsLoading, products, refetchProducts, isProductsError, productsError } = useProducts();

    return (
        <div className="p-5">
            <div className="p-5 rounded-2xl">
                <div className="flex items-center justify-between gap-5">
                    <h3 className="text-3xl font-bold text-success">Flash Sale</h3>
                    <div>
                        <Link to={`/flash-sale`} className="btn btn-sm btn-primary">View All</Link>
                    </div>
                </div>
                <hr className="mt-5 border border-success" />
                <div className="mt-10">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        centeredSlides={false}
                        // autoplay={{
                        //     delay: 2500,
                        //     disableOnInteraction: false,
                        // }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        breakpoints={{
                            576: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                        }}
                        modules={[Pagination, Autoplay, Navigation]}
                        className="mySwiper"
                    >
                        {
                            products && products.map((product, index) => <SwiperSlide className="mb-14" key={index} >
                                <FlashSaleCard product={product} />
                            </SwiperSlide>)
                        }
                        {/* <SwiperSlide>
                            <FlashSaleCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <FlashSaleCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <FlashSaleCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <FlashSaleCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <FlashSaleCard />
                        </SwiperSlide> */}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default FlashSale;