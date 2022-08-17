import Head from "next/head";
import Footer from "../components/share/footer";
import Navbar from "../components/share/navbar";
import Content from "../components/content";
import { ListItem } from "../components/list-item";
import Script from "next/script";

import {
  SiMysql,
  SiNextdotjs as SiNextDotJs,
  SiNodedotjs as SiNodeDotJs,
  SiTwitter,
  SiReact,
  SiRedis,
  SiStyledcomponents as SiStyledComponents,
  SiTailwindcss,
  SiTypescript,
  SiFirebase,
  SiGithub,
  SiDiscord,
  SiPython,
  SiCsharp,
  SiDocker,
  SiRust,
  SiMongodb,
  // linked in
  SiLinkedin,
} from "react-icons/si";

import { MdContactPage } from "react-icons/md";

import React from "react";
import { Tooltip, Typography } from "@mui/material";
import Link from "next/link";
import Typed from "../components/share/typed";

function Home() {
  return (
    <>
      <Head>
        <title>Home | flatypus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Content>
        <div className="inline-flex gap-3">
          <Tooltip title="Github">
            <a
              href="https://github.com/flatypus"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiGithub style={{ color: "white" }} className="h-6 w-6" />
            </a>
          </Tooltip>
          <Tooltip title="YouTube">
            <a
              href="https://youtube.com/flatypus"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiTwitter style={{ color: "white" }} className="h-6 w-6" />
            </a>
          </Tooltip>
          <Tooltip title="LinkedIn">
            <a
              href="https://www.linkedin.com/in/alexng353/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiLinkedin style={{ color: "white" }} className="h-6 w-6" />
            </a>
          </Tooltip>
          <Tooltip title="Contact">
            <Link href="/contact">
              <a>
                <MdContactPage
                  style={{ color: "white", position: "relative", top: "-2" }}
                  className="h-7 w-7"
                />
              </a>
            </Link>
          </Tooltip>
        </div>
        <br />
        <p>Hey There, I&apos;m</p>
        <h1 className="text-4xl tracking-wide">
          <Typed text={"Hinson Chan! <a></a>"}></Typed>
        </h1>
        <p className="pt-3">
          I&apos;m a 15 year old Full Stack web developer from Vancouver,
          Canada. I&apos;m currently working as a{" "}
          <span className="text-green-400 hover:underline">
            <a href="https://www.edubeyond.org">
              Software Engineer at EduBeyond
            </a>
          </span>
          , an international education charity that provides education
          opportunities to children in developing countries. In my spare time, I
          run a small
          <a href="https://www.youtube.com/flatypus">
            {" "}
            engineering YouTube channel
          </a>{" "}
          where I share my projects. I'm currently (trying) to learn Next.js,
          Rust, and Firebase.
        </p>

        <br />

        <h1 className="text-3xl">Technologies</h1>
        <br />

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <ListItem icon={SiReact} text="React.js" />
          <ListItem icon={SiNodeDotJs} text="Node.js" />
          <ListItem icon={SiPython} text="Python" />
          <ListItem icon={SiTypescript} text="TypeScript" />
          <ListItem icon={SiMongodb} text="MongoDB" />
          <ListItem icon={SiNextDotJs} text="Next.js" />
          <ListItem icon={SiTailwindcss} text="TailwindCSS" />
          <ListItem icon={SiRedis} text="Redis" />
          <ListItem icon={SiDocker} text="Docker" />
        </ul>
        <br />
        <h1 className="text-3xl">Learning</h1>
        <br />
        <ul className="grid grid-cols-3 gap-4 sm:grid-cols-4">
          <ListItem icon={SiRust} text="Rust" />
          <ListItem icon={SiFirebase} text="Firebase" />
        </ul>
      </Content>
      <Footer />
    </>
  );
}

export default Home;
