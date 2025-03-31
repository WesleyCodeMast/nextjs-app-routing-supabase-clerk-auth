"use client";
import { useFormStatus } from "react-dom";

export function ScratcherSymbol(props) {
  const { pending } = useFormStatus();
  let { isScratchMode, children, ...rest } = props;
  return (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img
      {...rest}
      src={
        isScratchMode || pending
          ? `data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`
          : props.src
      }
      className={
        isScratchMode || pending ? `${props.className} h-20` : props.className
      }
    >
      {children}
    </img>
  );
}
