import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import FlashSaleCard from '../FlashSaleCard/FlashSaleCard';

const FlashSale = () => {
    return (
        <div className="relative border">
            <div className="flex items-center justify-between px-5">
                <div>
                    <h3 className="text-3xl font-semibold text-success">Flash Sale</h3>
                </div>
                <div>
                    <button className="btn btn-sm">See All</button>
                </div>
            </div>
            <Carousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={false}
                className="px-5 py-8"
                containerClass="container"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite={false}
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024
                        },
                        items: 3,
                        partialVisibilityGutter: 40
                    },
                    mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 1,
                        partialVisibilityGutter: 30
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 2,
                        partialVisibilityGutter: 30
                    }
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
            >
                <FlashSaleCard />
                <FlashSaleCard />
                <FlashSaleCard />
                <FlashSaleCard />
                <FlashSaleCard />
                <FlashSaleCard />
            </Carousel>
        </div>
    );
};

export default FlashSale;