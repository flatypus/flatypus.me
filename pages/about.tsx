import Head from "next/head";
import React from "react";
import About from "../components/about"

function Home() {
  return (
    <>
      <Head>
        <title>Home | flatypus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <About />
    </>
  );
}

export default Home;
