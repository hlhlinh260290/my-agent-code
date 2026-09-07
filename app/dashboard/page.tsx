"use client";
import { useEffect } from "react";

export default function Dashboard() {
  // Lỗi ESLint: 'unusedData' is assigned a value but never used.
  // const unusedData = "Hello";

  useEffect(() => {
    console.log("Dashboard loaded");
  }, []); // Cố tình bỏ quên dependency nếu có gọi API

  return <div>Dashboard</div>;
}
