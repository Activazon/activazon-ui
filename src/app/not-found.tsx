"use client";
import { HugeiconsIcon } from "@hugeicons/react";
import { Loading03Icon as LoadingIcon } from "@hugeicons/core-free-icons";
import { redirect } from "next/navigation";
import { useEffect } from "react";
export default function NotFound() {
  useEffect(() => {
    setTimeout(() => {
      redirect("/blog");
    }, 3000);
  }, []);
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      {/*  */}
      <img
        src="/logo.svg"
        alt="Activazon Logo"
        className="w-full max-w-[250px] md:max-w-[300px] drop-shadow-xl"
      />

      <p className="mt-3">Look's like nothing is here...</p>

      <div className="flex flex-col items-center justify-center mt-3 opacity-50">
        <HugeiconsIcon icon={LoadingIcon} className="w-10 h-10 animate-spin" />
        <p className="">Taking you back to Activazon's content</p>
      </div>
    </div>
  );
}
