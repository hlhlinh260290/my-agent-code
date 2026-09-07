"use client";
import { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    console.log("Dashboard loaded");
  }, []); // Cố tình bỏ quên dependency nếu có gọi API

  return <div>Dashboard</div>;
}
