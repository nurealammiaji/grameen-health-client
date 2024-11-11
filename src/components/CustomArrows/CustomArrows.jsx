import * as React from "react";

const CustomLeftArrow = ({ onClick }) => (
    <i onClick={() => onClick()} className="custom-left-arrow" />
);
const CustomRightArrow = ({ onClick }) => {
    return <i className="custom-right-arrow" onClick={() => onClick()} />;
};

const CustomButtonGroup = ({ next, previous, goToSlide, carouselState }) => {
    const { totalItems, currentSlide } = carouselState;
    return (
        <div className="custom-button-group">
            <div>Current slide is {currentSlide}</div>
            <button onClick={() => previous()}>Previous slide</button>
            <button onClick={() => next()}>Next slide</button>
            <button
                onClick={() => goToSlide(Math.floor(Math.random() * totalItems + 1))}
            >
                Go to a random slide
            </button>
        </div>
    );
};
const CustomButtonGroupAsArrows = ({ next, previous }) => {
    return (
        <div className="flex items-center justify-center">
            <h4>These buttons can be positioned anywhere you want on the screen</h4>
            <button className="btn btn-primary btn-sm" onClick={previous}>Prev</button>
            <button className="btn btn-primary btn-sm" onClick={next}>Next</button>
        </div>
    );
};

export {
    CustomLeftArrow,
    CustomRightArrow,
    CustomButtonGroup,
    CustomButtonGroupAsArrows,
};