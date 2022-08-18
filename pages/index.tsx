import Head from "next/head";
import {} from "react-icons/si";
import Box from "../components/share/box";
import React from "react";
import Typed from "../components/share/typed";
import HorBar from "../components/share/horbar";
import styles from "../components/share/styles/main.module.css";
import SlideLeft from "../components/share/slideleft";
import SlideRight from "../components/share/slideright";
import Delay from "../components/share/delay";

function Home() {
  return (
    <>
      <Head>
        <title>Home | flatypus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* bg-[#1d1d1d] */}
      <div
        className="
        min-h-screen bg-[url('/images/reverse.png')] bg-no-repeat bg-center bg-cover center bg-fixed backdrop-blur-lg pt-20"
      >
        <div className={styles.mainbody}>
          <div className="grid grid-cols-4">
            <div className="col-span-1" />
            <div className="col-span-2 text-2xl">
              <div className="text-6xl font-mono font-medium">
                <Typed text={"Hello, I'm Hinson."}></Typed>
                <div className="mt-10" />
              </div>
              <Delay wait={100}>
                <SlideLeft>
                  <Box>
                    I&apos;m a 15 year old full stack web developer based in
                    Vancouver, Canada. Currently, I'm working as a Software
                    Engineer at{" "}
                    <span className="text-[#a669f5] hover:underline">
                      <a href="https://www.edubeyond.org">EduBeyond</a>
                    </span>
                    , an international charity that provides education
                    opportunities to children in developing countries.
                  </Box>
                </SlideLeft>
              </Delay>
              <div className="p-6"></div>
              <Delay wait={2000}>
                <SlideRight>
                  <Box>
                    In my spare time, I run a small{" "}
                    <a
                      className="text-[#ff6262] hover:underline"
                      href="https://www.youtube.com/flatypus"
                    >
                      {" "}
                      engineering YouTube channel{" "}
                    </a>{" "}
                    where I share my projects. I'm currently (trying) to learn
                    Next.js, Rust, and Firebase.
                  </Box>
                </SlideRight>
              </Delay>
              <div className="p-20"></div>
            </div>
            <div className="col-span-1"></div>
          </div>
          {/* <div className="bg-[#ffffff00] p-4 ">
            <div
              style={{
                backgroundRepeat: "repeat",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
                textTransform: "uppercase",
                WebkitFontSmoothing: "antialiased",
                WebkitTextStrokeWidth: "0.5px",
                WebkitTextStrokeColor: "white",
              }}
              className="p-12 text-4xl"
            >
              Technologies I use:
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Home;
