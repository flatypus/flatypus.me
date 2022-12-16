import Router from "next/router";
import { useEffect } from "react";
export default function Christmas() {
  useEffect(() => {
    Router.push("https://christmas.flatypus.me");
  }, []);
}
