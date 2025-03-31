"use client";
import { useCallback } from "react";
import { useInterval } from "../../../hooks/use-interval";

export default function OnIntervalFn({ intervalMs, fn }) {
  const refresh = useCallback(() => {
    fn();
  }, [fn]);
  useInterval(() => {
    refresh();
  }, intervalMs);
  return null;
}
