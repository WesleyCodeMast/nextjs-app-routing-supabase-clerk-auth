"use client";
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
const SlotSlider = ({ imgs, game_id }) => {
  const settings = {
    showArrows: true,
    showStatus: false,
    showIndicators: false,
    infiniteLoop: true,
    autoPlay: true,
    interval: 5000,
    transitionTime: 500,
    stopOnHover: true,
    swipeable: true,
    dynamicHeight: false,
    emulateTouch: true,
    showThumbs: false,
    centerMode: true,
  };
  return (
    <div className="my-4 items-center rounded border border-gray-300 p-6 ">
      <Carousel {...settings}>
        {imgs?.map((image, index) => (
          // eslint-disable-next-line react/jsx-no-comment-textnodes
          <div className="max-h-96 p-6" key={index}>
            <Image
              unoptimized
              className="h-full max-h-[inherit] w-full object-contain"
              src={`/image/slots/${encodeURIComponent(image.game_image_url)}`}
              alt={
                image?.game_image_alt_text
                  ? image?.game_image_alt_text
                  : "image"
              }
              width={image.w}
              height={image.h}
            />
          </div>
        ))}

        {/* <Link
        href={`https://democasino.betsoftgaming.com/cwguestlogin.do?bankId=675&gameId=637`}
        rel="nofollow"
        target="_blank"
      >
        <div className="flex items-center justify-center w-full">
          <div className="absolute top-[300px] cursor-pointer  md:w-1/3 md:top-[300px] sm:w-1/2 sm:top-[200px] py-2  md:col-span-1  sm:col-span-1 xs-col-span-3 bg-[#0369a1] rounded-lg flex md:justify-evenly justify-center items-center px-8 font-bold">
            <span className=" text-white ">Play for free</span>
            <FaArrowCircleRight className="mx-2 text-white" />
          </div>
        </div>
      </Link> */}
      </Carousel>
    </div>
  );
};
export default SlotSlider;
