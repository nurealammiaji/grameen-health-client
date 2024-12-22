import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './Campaign.css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import CampaignCard from '../CampaignCard/CampaignCard';
import { Link } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';

const Campaign = ({ campaign }) => {

    const { _id, name, description, campaignType, startDate, endDate, discountPercent, status } = campaign;

    const { isProductsLoading, products, refetchProducts, isProductsError, productsError } = useProducts();

    const [timeRemaining, setTimeRemaining] = useState({
        day: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const calculateRemainingDays = (targetDate) => {
        const now = new Date();

        // Calculate the difference in milliseconds
        const timeDifference = targetDate - now;

        // Convert milliseconds to days
        const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        return remainingDays;
    };

    // Calculate remaining days for a flash sale
    const campaignEndDate = new Date(endDate); // Set your target date
    const daysRemaining = calculateRemainingDays(campaignEndDate);

    const campaignStartDate = new Date(startDate);
    const currentDate = new Date();

    useEffect(() => {
        // Update the countdown every second
        const intervalId = setInterval(() => {
            const now = new Date();
            const timeDifference = campaignEndDate - now;

            if (timeDifference <= 0) {
                clearInterval(intervalId);  // Stop the countdown if the sale has ended
                setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            // Calculate remaining time
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            setTimeRemaining({ days, hours, minutes, seconds });
        }, 1000);

        // Initial update on mount
        return () => clearInterval(intervalId);
    }, [campaignEndDate]);

    return (
        <div className={`${campaignEndDate <= currentDate && 'hidden'} ${campaignStartDate <= currentDate ? 'block p-5' : 'hidden'}`}>
            <div className="p-5 rounded-2xl">
                <div className="items-center gap-5 text-center sm:justify-between sm:flex">
                    <h3 className="text-3xl sm:text-start font-bold text-success sm:w-[25rem]">{campaignType}</h3>
                    <div className="flex items-center justify-center sm:justify-start sm:w-[25rem]">
                        <div className="grid grid-flow-col gap-2 mt-5 auto-cols-max sm:my-0">
                            <div className="flex flex-col p-2 text-white bg-success rounded-box">
                                <span className="font-mono text-xl countdown">
                                    <span style={{ "--value": `${daysRemaining}` }}></span>
                                </span>
                            </div>
                            <div className="flex flex-col p-2 text-white bg-success rounded-box">
                                <span className="font-mono text-xl countdown">
                                    <span style={{ "--value": `${timeRemaining.hours}` }}></span>
                                </span>
                            </div>
                            <div className="flex flex-col p-2 text-white bg-success rounded-box">
                                <span className="font-mono text-xl countdown">
                                    <span style={{ "--value": `${timeRemaining.minutes}` }}></span>
                                </span>
                            </div>
                            <div className="flex flex-col p-2 text-white bg-success rounded-box">
                                <span className="font-mono text-xl countdown">
                                    <span style={{ "--value": `${timeRemaining.seconds}` }}></span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <Link to={`/campaigns/${_id}`} className="btn btn-sm btn-success btn-outline">View All</Link>
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
                            products && products.map((product, index) => <SwiperSlide className="mb-12" key={index} >
                                <CampaignCard product={product} />
                            </SwiperSlide>)
                        }
                    </Swiper>
                </div>
                <div className="text-center md:hidden">
                    <Link to={`/campaigns/${_id}`} className="btn btn-sm btn-primary">View All</Link>
                </div>
            </div>
        </div >
    );
};

export default Campaign;