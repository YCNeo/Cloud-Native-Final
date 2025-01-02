import React from "react";
import { useRouter } from "expo-router";
import Welcome from "./loginPage/welcome";
// app/index.tsx
export default function Home() {
  const router = useRouter();

  return <Welcome />;
}
