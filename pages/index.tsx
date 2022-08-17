import Head from "next/head";
import {} from "react-icons/si";
import React from "react";
import Typed from "../components/share/typed";

function Home() {
  return (
    <>
      <Head>
        <title>Home | flatypus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <p>Hey There, I&apos;m</p>
        <h1 className="text-4xl tracking-wide">
          <Typed text={"Hinson Chan! <a></a>"}></Typed>
        </h1>
        <div className="pt-3">
          I&apos;m a 15 year old Full Stack web developer from Vancouver,
          Canada. I&apos;m currently working as a
          <span className="text-green-400 hover:underline">
            <a href="https://www.edubeyond.org">
              Software Engineer at EduBeyond
            </a>
          </span>
          , an international education charity that provides education
          opportunities to children in developing countries. In my spare time, I
          run a small
          <a href="https://www.youtube.com/flatypus">
            engineering YouTube channel
          </a>
          where I share my projects. I'm currently (trying) to learn Next.js,
          Rust, and Firebase.
        </div>
      </div>
    </>
  );
}

export default Home;
