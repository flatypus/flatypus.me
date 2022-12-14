import Head from "next/head";
import { } from "react-icons/si";
import Box from "../components/box";
import React, { useEffect, useState } from "react";
import Typed from "../components/typed";
import HorBar from "../components/horbar";
import styles from "../components/styles/main.module.css";
import SlideLeft from "../components/slideleft";
import SlideRight from "../components/slideright";
import Delay from "../components/delay";
import Canvas from "../components/canvas2";
import Appear from "../components/appear";

function Home() {
  const [isMobile, setIsMobile] = useState(true);
  //  hex codes:
  // 242426
  // 8892B0
  // 966AC7
  // 82DCF5
  // F9ECCC
  useEffect(() => {
    // regex to detect if user is on phone or tablet
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor);
    setIsMobile(check);
  }, []);

  useEffect(() => {
    const faders = document.querySelectorAll(".fade-in");
    const sliders = document.querySelectorAll(".slide-in");

    const appearOptions = {
      threshold: 0,
      rootMargin: "0px 0px -250px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (
      entries,
      appearOnScroll
    ) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add("appear");
          appearOnScroll.unobserve(entry.target);
        }
      });
    },
      appearOptions);

    faders.forEach(fader => {
      appearOnScroll.observe(fader);
    });

    sliders.forEach(slider => {
      appearOnScroll.observe(slider);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Home | flatypus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* bg-[#1d1d1d] */}
      <div
        className="
        min-h-screen"
      >
        <div>
          {!isMobile ? (
            <div>
              <div className="grid grid-cols-1">
                <div className="row-start-1 col-start-1 fixed">
                  <Canvas />
                </div>
                <div className="row-start-1 col-start-1 fixed">
                  <div className="w-screen min-h-screen bg-[#00000065] bg-no-repeat bg-center bg-cover center bg-fixed"></div>
                </div>
              </div>
              {/* <div className="w-full min-h-screen absolute top-0 left-0 z-10 bg-[url('/images/reverse.png')] bg-no-repeat bg-center bg-cover center bg-fixed backdrop-blur-lg opacity-60"></div> */}
            </div>
          ) : (
            <div className="grid grid-cols-1">
              <div className="row-start-1 col-start-1 fixed">
                <div className="w-screen min-h-screen bg-[url('/images/reverse.png')] bg-no-repeat bg-center bg-cover center bg-fixed backdrop-blur-lg"></div>
              </div>
            </div>
          )}
        </div>
        <div className="w-full min-h-screen absolute top-0 left-0 z-20">
          {/* <div className="md:bg-green-500 sm:bg-red-500 lg:bg-blue-500">
            Breakpoint tester
          </div> */}
          <div className="grid px-20 md:px-40 lg:px-0 lg:grid-cols-4">
            <div className="relative col-span-1"></div>
            <div className="col-span-2 text-2xl pt-20">
              <div className="text-5xl font-mono font-medium">
                <Typed text={"Hello, I'm Hinson."}></Typed>
                <div className="mt-10" />
              </div>
              <Appear delay={100} enterTo={"translate-x-0 opacity-100 fade-in from-left"}>
                <Box>
                  I&apos;m a 15 year old{" "}
                  <a
                    href="https://media.gettyimages.com/photos/male-chimpanzee-in-business-clothes-picture-id169937774?s=612x612"
                    className="text-[#95ff80] hover:underline"
                  >
                    full-stack web developer
                  </a>{" "}
                  based in Vancouver, <br></br>Canada. Currently, I&apos;m working as a
                  Software Engineer at{" "}
                  <a
                    className="text-[#a669f5] hover:underline"
                    href="https://www.edubeyond.org"
                  >
                    EduBeyond
                  </a>
                  , <br></br>an international charity that provides education
                  opportunities to children in developing countries.
                </Box>
              </Appear>
              <div className="p-6"></div>
              <Appear delay={100} enterTo={"translate-x-0 opacity-100 fade-in from-right"}>
                <Box>
                  In my spare time, I run a small{" "}
                  <a
                    className="text-[#ff6262] hover:underline"
                    href="https://www.youtube.com/flatypus"
                  >
                    engineering YouTube channel
                  </a>{" "}
                  where I share my projects. I&apos;m currently (trying) to
                  learn Next.js, Rust, and Firebase.
                </Box>
              </Appear>
              <div className="p-20"></div>
              <div className="w-full border-b-2 border-l-2 rounded-lg p-2">
                <div>Hello</div>
                <div>Hello</div>
                <div>Hello</div>
              </div>
            </div>
            <div className="col-span-1"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
