import { useRef, useState, useEffect } from "react";
import { generateColor } from "../lib/gradient";

export default function Canvas() {
  const canvasRef = useRef(null);
  const [mousepos, setMousePos] = useState([]);
  const [stack, setStack] = useState([]);
  const ss = 24;
  const bs = 3;
  const trail = 80;
  const colarray = generateColor("0f1e3f", "603BFF", trail);
  const makepoints = (radius) => {
    const points = [];
    for (let x = 0; x <= radius; x++) {
      for (let y = 0; y <= radius; y++) {
        if (x ** 2 + y ** 2 <= radius ** 2) {
          points.push([x, y]);
          points.push([-x, y]);
          points.push([x, -y]);
          points.push([-x, -y]);
        }
      }
    }
    return points;
  };
  const rpoints = makepoints(2);

  const jitter = (pos) => {
    const [x, y] = pos;
    const r = (Math.random() * ss) / 10;
    const theta = Math.random() * Math.PI * 2;
    return [x + r * Math.cos(theta), y + r * Math.sin(theta)];
  };

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
    for (let n in rpoints) {
      let [dx, dy] = rpoints[n];
      ctx.fillStyle = "#0c0c17";
      ctx.fillRect(ss * (i + dx), ss * (j + dy), ss, ss);
      ctx.fillStyle = fs.indexOf("#") !== -1 ? fs : "#" + fs;
      ctx.fillRect(
        ss * (i + dx) + bs,
        ss * (j + dy) + bs,
        ss - bs * 2,
        ss - bs * 2
      );
    }
  };

  const uniqueCount = (stack) => {
    let counts = [];
    for (let elem in stack) {
      let [i, j] = stack[elem];
      let count = counts.find((e) => e[0] == i && e[1] == j);
      if (count == undefined) {
        counts.push([i, j]);
      }
    }
    return counts.length;
  };

  //start effect
  useEffect(() => {
    canvasRef.current.width = canvasRef.current.clientWidth;
    canvasRef.current.height = canvasRef.current.clientHeight;
    const handleWindowMouseMove = (event) => {
      const canvas = canvasRef.current;
      var rect = canvas.getBoundingClientRect();
      setMousePos([
        (canvas.width * (event.clientX - rect.left)) / rect.width,
        (canvas.height * (event.clientY - rect.top)) / rect.height,
      ]);
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    try {
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
    } catch {}
  }, [canvasRef]);

  useEffect(() => {
    try {
      const ctx = canvasRef.current.getContext("2d");
      ctx.lineWidth = 2;
      const [x, y] = mousepos;
      const [sx, sy] = [
        canvasRef.current.clientWidth,
        canvasRef.current.clientHeight,
      ];

      //   if (canvasSize[0] != canvasRef.current.width && canvasSize[1]!=canvasRef.current.height){
      //     setCanvasSize([canvasRef.current.width, canvasRef.current.height]);
      //   }

      //delete last item
      let tmp = stack;
      if (stack.length > trail) {
        let [i, j] = tmp.shift();
        drawDot(ctx, i, j, bs, "#181a21");
        setStack(tmp);
      }
      let res = findBox(x, y, sx, sy);
      if (res != false) {
        let [i, j] = res;
        if (stack[stack.length - 1] != [i, j]) {
          // drawDot(ctx, i, j, bs+1, "#0f1e3f");
          let tmp = stack;
          setStack([...tmp, [i, j]]);
        }
      }
      for (let elem in stack) {
        const [i, j] = stack[elem];
        drawDot(ctx, i, j, bs, colarray[parseInt(elem)]);
      }

      // if (uniqueCount(stack) > 3) {
      //   setMousePos(jitter(mousepos));
      // }
    } catch (err) {
      console.log(err);
    }
  }, [mousepos]);

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      className="w-screen min-h-screen"
    ></canvas>
  );
}

const Counter = () => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef: any = useRef();
  const canvasRef: any = useRef();
  const previousTimeRef = useRef(null);

  const animate = (time) => {
    if (previousTimeRef.current != undefined) {
      // Pass on a function to the setter of the state
      // to make sure we always have the latest state\
      // do the animation
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
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
};
