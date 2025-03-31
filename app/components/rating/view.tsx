"use client";

import { useSession } from "next-auth/react";
import { lazy, useState } from "react";
import RatingComponent from "../RatingComponent";
const factoryRatingModal = () => import("../RatingModal");
const RatingModal = lazy(factoryRatingModal);

const RatingView = ({ type, parent, myRating, addRating }) => {
  const [rating, setRating] = useState(myRating);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();

  const userEmail = session?.user?.email;

  async function saveRating(rating) {
    if (!userEmail) return;
    setRating(rating);
    if (userEmail) await addRating(rating, type, parent);
  }

  return (
    <>
      {!loading && (
        <>
          <div className="flex flex-col items-center space-y-3 py-6">
            <RatingComponent rating={rating} />
            {rating == 0 && userEmail && (
              <button
                className="my-10 flex items-center justify-center rounded-lg bg-sky-700 px-10 py-3 text-white dark:bg-white dark:text-black"
                onClick={(e) => setShowRatingModal(true)}
              >
                Setting you star rating...
              </button>
            )}
            {!userEmail && <>Sign In to rate...</>}
          </div>
          <RatingModal
            show={showRatingModal}
            type={type}
            parentId={parent}
            setShow={setShowRatingModal}
            saveRating={saveRating}
          />
        </>
      )}
    </>
  );
};

export { RatingView };
