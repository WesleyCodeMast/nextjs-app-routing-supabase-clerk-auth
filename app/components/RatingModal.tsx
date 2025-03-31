"use client";
import React, { useState } from "react";
import SelectRating from "./SelectRating";

interface Props {
  show: boolean;
  type: number;
  parentId: number;
  setShow: (boolean) => void;
  saveRating: (message: any) => void;
}

const RatingModal: React.FC<Props> = ({
  show,
  type,
  parentId,
  setShow,
  saveRating,
}) => {
  const [rating, setRating] = useState(0);

  const submit = (e) => {
    e.preventDefault();
    saveRating(rating);

    setShow(false);
  };

  return (
    <>
      {show ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h6 className="text-3xl font-semibold">
                    Your opinion matters to us!
                  </h6>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShow(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                {/*body*/}
                <div className="bg-gray-200 w-full flex flex-col items-center">
                  <SelectRating rating={rating} setRating={setRating} />
                  <div className="w-3/4 flex flex-col">
                    <button
                      className="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white"
                      onClick={(e) => submit(e)}
                    >
                      Rate now
                    </button>
                  </div>
                </div>
                {/*footer*/}
                <div className="h-20 flex items-center justify-center">
                  <button
                    className="text-gray-600"
                    onClick={(e) => setShow(false)}
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default RatingModal;
