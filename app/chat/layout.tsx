import React from "react";

export default function ChatLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mt-160 container mx-auto">
        <div className="px-1 py-6 lg:py-12">
          <div className="container mx-auto">
            <div className="flex items-center gap-1 text-sm  font-medium md:gap-4">
              <span>Home / Chat</span>
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
