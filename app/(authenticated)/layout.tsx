// app/(authenticated)/layout.tsx

import React from "react";
import SideBar from "../Components/SideBar";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-row sticky top-0">
        <SideBar />
        <div className="p-5 flex flex-col flex-1 bg-gray-50">{children}</div>
      </div>
    </div>
  );
}
