import { useEffect, useRef, useState } from "react";

export const useComponentVisible = (initialIsVisible, refArray) => {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref: any = useRef(null);

  const handleClickOutside = (event) => {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      !refArray.some((el) => el.current && el.current.contains(event.target))
    ) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref, refArray]);

  return { ref, isComponentVisible, setIsComponentVisible };
};
