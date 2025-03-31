"use client";

import Carousel from "react-multi-carousel";

const AFCCarousel = ({ children, responsive }) => {
  return (
    <Carousel
      ssr={true}
      swipeable={false}
      deviceType="desktop"
      infinite={true}
      autoPlay={true}
      containerClass="carousel-container"
      autoPlaySpeed={3000}
      responsive={responsive}
    >
      {children}
    </Carousel>
  );
};
export default AFCCarousel;
