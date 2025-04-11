"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const redirectUrl = "https://internet-watchdog-alert.lovable.app/";
    window.location.href = redirectUrl;
  }, []);

  return <div>Please wait</div>;
}
