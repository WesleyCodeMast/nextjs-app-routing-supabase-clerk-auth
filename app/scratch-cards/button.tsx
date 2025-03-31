"use client";
import { useFormStatus } from "react-dom";

export function ScratcherButton(props) {
  const { pending } = useFormStatus();
  let { children, ...rest } = props;
  return (
    <button {...rest} disabled={pending || Boolean(rest.disabled)}>
      {children}
    </button>
  );
}
