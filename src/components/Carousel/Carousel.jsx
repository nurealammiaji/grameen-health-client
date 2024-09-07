import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

const Carousel = () => {

  const slides = [
    {
      image: "https://www.supplychainbrain.com/ext/resources/2022/10/19/MEDICAL-DEVICE-HOME-DELIVERY-iStock-1250431727.jpg",
      link: "/terms"
    },
    {
      image: "https://hospitalsmagazine.com/wp-content/uploads/2021/05/Single-use-medical-devices.jpg",
      link: "/terms"
    },
    {
      image: "https://d2jx2rerrg6sh3.cloudfront.net/images/Article_Images/ImageForArticle_22588_16539156642301393.jpg",
      link: "/sugar-machine"
    },
    {
      image: "https://www.massdevice.com/wp-content/uploads/2021/05/goddard-sponsored-hero-image-june2021.jpg",
      link: "/terms"
    },
    {
      image: "https://www.massdevice.com/wp-content/uploads/2021/05/goddard-sponsored-hero-image-june2021.jpg",
      link: "/terms"
    },
  ]
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {
          (slides) &&
          slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Link to={slide.link} className="swiper-slide">
                <img src={slide.image} alt="" />
              </Link>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  );
}

export default Carousel;