"use client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";

export default function MobileMenuButton({ mobileIcon }) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const _submit = (val) => {
    setOpen(val);
    if (val) router.push("?mobileMenu=true");
    else router.push(window.location.pathname);
  };

  return (
    <div
      onClick={() => _submit(!open)}
      className="absolute left-4 text-4xl lg:hidden"
    >
      {mobileIcon}
    </div>
  );
}
