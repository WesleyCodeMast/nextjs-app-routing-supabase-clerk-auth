"use client";

import { MouseEventHandler, useCallback, useRef } from "react";

export function PlayCasinoLink({
  href,
  casinoId,
  children,
  className,
}: {
  href?: string;
  casinoId: string;
  children: React.ReactNode;
  className?: string;
}) {
  const anchor = useRef<HTMLAnchorElement | null>(null);
  const onClick = useCallback<MouseEventHandler<HTMLAnchorElement>>((e) => {
    const needsInterstitial = !Boolean(document.getElementById("afc-ads"));
    if (needsInterstitial && anchor.current) {
      const before = anchor.current.href;
      const u = new URL(before);
      u.searchParams.set("r", "1");
      anchor.current.href = u.toString();
    }
  }, []);
  return (
    <a
      ref={(a) => (anchor.current = a)}
      rel="nofollow"
      target="_blank"
      href={href ? href : `/play-casino/${encodeURIComponent(casinoId)}`}
      className={className}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
