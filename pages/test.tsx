import { useRef, useState, useEffect } from "react";
import { generateColor } from "../lib/gradient";

export default function Canvas() {
  const canvasRef = useRef(null);
  const [mousepos, setMousePos] = useState([]);
  const [stack, setStack] = useState([]);
  const [canvasSize, setCanvasSize] = useState([]);
  const ss = 24;
  const bs = 4;
  const trail = 80;
  const colarray = generateColor("0f1e3f", "6C7FF5", trail);
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
  }, [canvasRef, canvasSize]);

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
    } catch (err) {
      console.log(err);
    }
  }, [mousepos]);

  // const mp = (canvas, evt) => {
  //   var rect = canvas.getBoundingClientRect();
  //   return [
  //     (canvas.width * (evt.clientX - rect.left)) / rect.width,
  //     (canvas.height * (evt.clientY - rect.top)) / rect.height,
  //   ];
  // };

  // const update = (e: any) => {
  //   const mouse = mp(canvasRef.current, e);
  //   setMousePos(mouse);
  // };

  return (
    <canvas
      ref={canvasRef}
      // onMouseMove={(e) => {
      //   update(e);
      // }}
      className="w-screen min-h-screen"
    ></canvas>
  );
}
