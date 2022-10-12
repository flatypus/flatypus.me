import { useRef, useState, useEffect } from "react";
import { generateColor } from "../lib/gradient";

export default function Canvas() {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef: any = useRef();
  const canvasRef: any = useRef();
  const previousTimeRef = useRef(null);
  const scrollHeight = useRef([]);
  const stack = useRef([]);
  const particles = useRef([]);
  const trail = 20;
  const colarray = generateColor("0f1e3f", "603BFF", trail);

  const makepoints = (radius) => {
    const points = [];
    const push = (item) => {
      let [x, y] = item;
      if (!points.includes([x + 0, y + 0])) {
        points.push([x + 0, y + 0]);
      }
    };
    for (let x = 0; x <= radius; x++) {
      for (let y = 0; y <= radius; y++) {
        if (x ** 2 + y ** 2 <= radius ** 2) {
          push([x, y]);
          push([-x, y]);
          push([x, -y]);
          push([-x, -y]);
        }
      }
    }
    return points;
  };
  // defines size of the points
  const rpoints = makepoints(2.5);

  const randrange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // draw a big dot, or really many points in rpoints that form a circle of defined size
  const drawDot = (ctx, i, j) => {
    try {
      for (let n in rpoints) {
        let [dx, dy] = rpoints[n];
        [dx, dy] = [dx + 0, dy + 0];
        // ctx.fillStyle = fs.indexOf("#") !== -1 ? fs : "#" + fs;
        ctx.fillStyle = "#FFFFFF"
        ctx.fillRect(
          (i + dx),
          (j + dy),
          1,
          1
        );
      }
    } catch {
      // console.log(ctx,i,j,bs,fs)
    }
  };


  // function to encapsulate all draw funcs
  const drawAll = (scrollHeight) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, ctx.clientWidth, ctx.clientHeight);
    drawDot(ctx, 10, scrollHeight)
  };

  const animate = (time) => {
    if (previousTimeRef.current != undefined) {
      drawAll(scrollHeight.current);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  // either page loaded or someone resized the window, let's redraw the grid
  const reset = () => {
    canvasRef.current.width = canvasRef.current.clientWidth;
    canvasRef.current.height = canvasRef.current.clientHeight;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineWidth = 2;
  };

  useEffect(() => {
    const handleScroll = (e: any) => {
      scrollHeight.current = e.target.scrollingElement.scrollTop
    }
    try {
      // initial grid load
      reset();
    } catch { }
    // add listeners to watch when mouse moves and when window resizes for
    // improved performance vs onMouseMove
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", reset);
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      className="w-screen min-h-screen"
    ></canvas>
  );
}
