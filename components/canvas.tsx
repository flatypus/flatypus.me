import { useRef, useState, useEffect } from "react";
import { generateColor } from "../lib/gradient";

export default function Canvas() {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef: any = useRef();
  const canvasRef: any = useRef();
  const previousTimeRef = useRef(null);
  const mousepos = useRef([]);
  const stack = useRef([]);
  const ss = 16;
  const bs = 2;
  const trail = 20;
  const colarray = generateColor("0f1e3f", "603BFF", trail).slice(1, trail);
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
  const rpoints = makepoints(2.5);

  const findBox = (x, y, sx, sy) => {
    for (let j = 0; j < sy / ss; j++) {
      for (let i = 0; i < sx / ss; i++) {
        if (
          x >= ss * i &&
          x <= ss * i + ss &&
          y >= ss * j &&
          y <= ss * j + ss
        ) {
          return [i, j];
        }
      }
    }
    return false;
  };

  const drawDot = (ctx, i, j, bs, fs) => {
    try {
      for (let n in rpoints) {
        let [dx, dy] = rpoints[n];
        [dx, dy] = [dx + 0, dy + 0];
        ctx.fillStyle = fs.indexOf("#") !== -1 ? fs : "#" + fs;
        ctx.fillRect(
          ss * (i + dx) + bs,
          ss * (j + dy) + bs,
          ss - bs * 2,
          ss - bs * 2
        );
      }
    } catch {
      // console.log(ctx,i,j,bs,fs)
    }
  };

  const bresenham = (x1, y1, x2, y2) => {
    let points = [];
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    let sx = x1 < x2 ? 1 : -1;
    let sy = y1 < y2 ? 1 : -1;
    let err = dx - dy;
    while (true) {
      points.push([x1, y1]);
      if (x1 === x2 && y1 === y2) break;
      let e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x1 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y1 += sy;
      }
    }
    return points;
  };

  const drawthething = (mousepos) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineWidth = 2;
    const [x, y] = mousepos;
    const [sx, sy] = [
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight,
    ];

    // delete last item
    if (stack.current.length > trail) {
      let [i, j] = stack.current.shift();
      let [i2, j2] = stack.current[0];
      let points = bresenham(i, j, i2, j2);

      for (let n in points) {
        let [i, j] = points[n];
        drawDot(ctx, i, j, bs, "#181a21");
      }
    }
    // check if mouse is on a square
    let res = findBox(x, y, sx, sy);
    if (res != false) {
      let [i, j] = res;
      if (stack.current[stack.current.length - 1] != [i, j]) {
        // add to stack
        stack.current = [...stack.current, [i, j]];
      }
    }
    for (let elem = 0; elem < stack.current.length - 1; elem++) {
      const [i, j] = stack.current[elem];
      const [i2, j2] = stack.current[elem + 1];
      const points = bresenham(i, j, i2, j2);
      for (let n in points) {
        let [x, y] = points[n];
        drawDot(ctx, x, y, bs, colarray[elem]);
      }
    }
  };

  const animate = (time) => {
    if (previousTimeRef.current != undefined) {
      // Pass on a function to the setter of the state
      // to make sure we always have the latest state\
      // do the animation
      drawthething(mousepos.current);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  const reset = () => {
    canvasRef.current.width = canvasRef.current.clientWidth;
    canvasRef.current.height = canvasRef.current.clientHeight;
    const ctx = canvasRef.current.getContext("2d");
    const [sx, sy] = [
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight,
    ];
    ctx.lineWidth = 2;
    for (let j = 0; j < sy / ss; j++) {
      for (let i = 0; i < sx / ss; i++) {
        ctx.fillStyle = "#0c0c17";
        ctx.fillRect(ss * i, ss * j, ss, ss);
        ctx.fillStyle = "#181a21";
        ctx.fillRect(ss * i + bs, ss * j + bs, ss - bs * 2, ss - bs * 2);
      }
    }
    console.log("done initial render");
  };

  useEffect(() => {
    const handleWindowMouseMove = (event) => {
      const canvas = canvasRef.current;
      var rect = canvas.getBoundingClientRect();
      mousepos.current = [
        (canvas.width * (event.clientX - rect.left)) / rect.width,
        (canvas.height * (event.clientY - rect.top)) / rect.height,
      ];
    };
    try {
      reset();
    } catch {}
    window.addEventListener("mousemove", handleWindowMouseMove);
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
