"use client";

import Modal from "@/components/Modal";
import { useState } from "react";
import ProgressBar from "../ProgressBar";

interface props {
  onUpload: () => any;
  onDelete: () => void;
  uploadImages: () => any;
  games: any;
  savedGames: any;
}
const UploadToVercel: React.FC<props> = ({
  onUpload,
  onDelete,
  games,
  savedGames,
  uploadImages,
}) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  // const imageUpload = async() => {
  //     setLoading(true);

  //     const numBatches = Math.ceil(games.length / 10);
  //     let successed = 0;
  //     for(let batchIndex = 0; batchIndex < numBatches; batchIndex ++){
  //         const startNum = batchIndex * 10;
  //         const result = await onUpload(games.slice(startNum,startNum + 10));
  //         if (!result?.success) {
  //             alert("failed");
  //             alert(result);
  //             console.log(result);
  //         }

  //         if(result?.success) {
  //             successed += 10;
  //         }
  //         setStep((batchIndex + 1) * 100 / numBatches)
  //     }
  //     setCount(successed);
  //     setShow(true);
  //     setLoading(false);
  // }

  const closeModal = () => {
    setShow(false);
  };

  const testUpload = async () => {
    // const { result } = await fetch(
    //     `/vercel-blob/uploadImages`,
    //     { method: "GET" }
    //   ).then((res) => res.json());

    // const result = await uploadImages();
    const result = await onUpload();
    console.log(
      "+++++++++++++++++++++++++++++++++++++++++++++ this is upload result ++++++++++++++++++++++++++++++++++++++++++++++++++++",
    );
    console.log(result);
  };

  const testRemove = async () => {
    // const res = await fetch(
    //     `/vercel-blob/removeImages`,
    //     { method: "GET" }
    // );
    // const result = await res.json();
    // const result = await uploadImages();
    const result = await onDelete();
    console.log(
      "+++++++++++++++++++++++++++++++ upload bank large images result ++++++++++++++++++++++++++++++++",
    );
    console.log(result);
  };
  return (
    <div>
      {loading && <ProgressBar state={step} label="Uploading..." />}

      {!loading && (
        <>
          <button
            onClick={(e: any) => {
              e.preventDefault();
              // imageUpload();
              testUpload();
            }}
            className={`bg-sky-700 text-white dark:bg-white dark:text-black px-10 py-3 flex items-center justify-center rounded text-base font-medium md:px-20 md:my-6`}
          >
            Upload
          </button>
          <button
            onClick={(e: any) => {
              e.preventDefault();
              testRemove();
            }}
            className="bg-sky-700 text-white dark:bg-white dark:text-black px-10 py-3 flex items-center justify-center rounded text-base font-medium md:px-20 md:my-6"
          >
            Delete
          </button>
        </>
      )}
      {show && (
        <Modal show={show} setShow={setShow} submit={closeModal}>
          <div className="p-4">
            Updated &nbsp;<p className="text-bold">{count}</p>casinos
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UploadToVercel;
