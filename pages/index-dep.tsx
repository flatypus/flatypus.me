import Head from "next/head";
import {} from "react-icons/si";
import Box from "../components/box";
import React from "react";
import Typed from "../components/typed";
import HorBar from "../components/horbar";
import styles from "../components/styles/main.module.css";
import SlideLeft from "../components/slideleft";
import SlideRight from "../components/slideright";
import Delay from "../components/delay";
import Appear from "../components/appear";
import NavBar from "../components/navbar";

function Home() {
  //  hex codes:
  // 242426
  // 8892B0
  // 966AC7
  // 82DCF5
  // F9ECCC
  return (
    <>
      <Head>
        <title>Home | flatypus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* bg-[#1d1d1d] */}
      <div
        className="
        min-h-screen bg-[url('/images/reverse.png')] bg-no-repeat bg-center bg-cover center bg-fixed backdrop-blur-lg"
      >
        <NavBar />
        <div className={styles.mainbody}>
          {/* <div className="md:bg-green-500 sm:bg-red-500 lg:bg-blue-500">
            Breakpoint tester
          </div> */}
          <div className="grid px-20 md:px-40 lg:px-0 lg:grid-cols-4">
            <div className="col-span-1" />
            <div className="col-span-2 text-2xl">
              <div className="text-5xl font-mono font-medium">
                <Appear>
                  <Typed text={"Hello, I'm Hinson."}></Typed>
                </Appear>
                <div className="mt-10" />
              </div>
              <Delay wait={100}>
                <SlideLeft>
                  <Box>
                    I&apos;m a 15 year old{" "}
                    <a
                      href="https://media.gettyimages.com/photos/male-chimpanzee-in-business-clothes-picture-id169937774?s=612x612"
                      className="text-[#95ff80] hover:underline"
                    >
                      full-stack web developer
                    </a>{" "}
                    based in Vancouver, Canada. Currently, I&apos;m working as a
                    Software Engineer at{" "}
                    <a
                      className="text-[#a669f5] hover:underline"
                      href="https://www.edubeyond.org"
                    >
                      EduBeyond
                    </a>
                    , an international charity that provides education
                    opportunities to children in developing countries.
                  </Box>
                </SlideLeft>
              </Delay>
              <div className="p-6"></div>
              <Delay wait={700}>
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
                    where I share my projects. I&apos;m currently (trying) to
                    learn Next.js, Rust, and Firebase.
                  </Box>
                </SlideRight>
              </Delay>
              <div className="p-20"></div>
            </div>
            <div className="col-span-1"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
