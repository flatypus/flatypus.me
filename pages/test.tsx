import { useRef, useState, useEffect } from "react";

export default function Canvas() {
  const canvasRef = useRef(null);
  const [mousepos, setMousePos] = useState([]);
  const [stack, setStack] = useState([]);
  const [canvasSize, setCanvasSize] = useState([]);
  const ss = 12;
  const bs = 2;

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

  const drawDot = (ctx, i, j) => {
    ctx.fillRect(ss * i + bs, ss * j + bs, ss - bs * 2, ss - bs * 2);
    ctx.fillRect(ss * (i + 1) + bs, ss * j + bs, ss - bs * 2, ss - bs * 2);
    ctx.fillRect(ss * i + bs, ss * (j + 1) + bs, ss - bs * 2, ss - bs * 2);
    ctx.fillRect(ss * (i - 1) + bs, ss * j + bs, ss - bs * 2, ss - bs * 2);
    ctx.fillRect(ss * i + bs, ss * (j - 1) + bs, ss - bs * 2, ss - bs * 2);
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
      let tmp = stack;
      if (stack.length > 20) {
        let [i, j] = tmp.shift();
        ctx.fillStyle = "#181a21";
        drawDot(ctx, i, j);
        setStack(tmp);
      }
      let res = findBox(x, y, sx, sy);
      if (res != false) {
        let [i, j] = res;
        if (stack[stack.length - 1] != [i, j]) {
          ctx.fillStyle = "#0f1e3f";
          drawDot(ctx, i, j);
          let tmp = stack;
          setStack([...tmp, [i, j]]);
        }
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
