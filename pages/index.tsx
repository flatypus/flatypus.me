import Head from "next/head";
import {} from "react-icons/si";
import Box from "../components/share/box";
import React from "react";
import Typed from "../components/share/typed";
import HorBar from "../components/share/horbar";
import styles from "../components/share/styles/main.module.css";

function Home() {
  return (
    <>
      <Head>
        <title>Home | flatypus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* bg-[url('/images/abstractbgblur.png')] */}
      <div
        className="
      bg-[#4ba6ca]
       bg-cover backdrop-blur-lg h-screen pt-20"
      >
        <HorBar />
        <div className={styles.mainbody}>
          <div className="grid grid-cols-4">
            <div className="col-span-1" />
            <div className="col-span-2 text-2xl">
              <div>
                <Typed
                  text={
                    "Hinson Chan! <a class='text-black' href='https://www.edubeyond.org'>EduBeyond</a> Nice"
                  }
                ></Typed>
              </div>
              <Box>
                <div
                  style={{
                    backgroundImage: "url(/images/gradientboxsmol1.png)",
                    backgroundSize: "cover",
                  }}
                  className="p-4 rounded-md bg-cover "
                >
                  I&apos;m a 15 year old full stack web developer based in
                  Vancouver, Canada. Currently, I'm working as a Software
                  Engineer at{" "}
                  <span className="text-[#903bff] hover:underline">
                    <a href="https://www.edubeyond.org">EduBeyond</a>
                  </span>
                  , an international education charity that provides education
                  opportunities to children in developing countries.
                </div>
              </Box>
              <div className="p-2"></div>
              <Box>
                <div
                  style={{
                    backgroundImage: "url(/images/gradientboxsmol2.png)",
                    backgroundSize: "cover",
                  }}
                  className="p-4 rounded-md bg-cover "
                >
                  In my spare time, I run a small{" "}
                  <a href="https://www.youtube.com/flatypus">
                    engineering YouTube channel
                  </a>{" "}
                  where I share my projects. I'm currently (trying) to learn
                  Next.js, Rust, and Firebase.
                </div>
              </Box>
              <div className="p-20"></div>
            </div>
            <div className="col-span-1"></div>
          </div>
          <div className="bg-[#ffffff00] p-4 ">
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
              {/* Technologies I use: */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
