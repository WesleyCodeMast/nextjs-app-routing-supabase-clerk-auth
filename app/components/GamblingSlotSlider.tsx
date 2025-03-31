// "use client";

/* eslint-disable @next/next/no-img-element */
import "react-multi-carousel/lib/styles.css";

import AFCCarousel from "@/components/AFCCarousel";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const GamblingSlotSlider = ({ slots }) => {
  return (
    <div className="items-center p-2 rounded my-4">
      <AFCCarousel responsive={responsive}>
        {slots?.map((item) => (
          <div
            key={item?.game_id}
            className="mx-2 border items-center border-gray-300 rounded my-4 flex flex-col p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 hover:shadow-lg"
          >
            <div
              className="relative mx-auto w-full max-w-sm pt-"
              key={item?.game_id}
            >
              <a
                href={`/slots/${item["game_clean_name"]}`}
                className="relative inline-block w-full transform transition-transform duration-300 ease-in-out"
              >
                <div className="rounded-lg">
                  <div className="relative flex h-30 justify-center overflow-hidden rounded-t-lg">
                    <div className="w-full transform transition-transform duration-500 ease-in-out hover:scale-110">
                      {item?.game_image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={`/image/sloticonssquare/${item?.game_image}`}
                          alt={item?.casino}
                        />
                      )}
                      {!item?.game_image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={`/2.png`} alt={item?.casino} />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="relative">
                      {item?.meta && item?.meta[0]?.title && (
                        <h2 className="text-base font-medium text-gray-800 md:text-lg">
                          {item?.meta[0]?.title}
                        </h2>
                      )}
                      <p className="mt-2 line-clamp-1 text-sm text-gray-800">
                        {item["game_name"]}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        ))}
      </AFCCarousel>
    </div>
  );
};
export default GamblingSlotSlider;
