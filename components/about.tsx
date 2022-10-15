import { useRef, useState, useEffect } from "react";
import { generateColor } from "../lib/gradient";

class Person {
  name: any;
  canvas: any;
  context: any;
  constructor(name, canvas) {
    this.name = name;
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
  }

  Draw() {
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    // this.drawCircle(this.context, centerX, centerY, 70, "blue", "green", 2);
    // // console.log(centerX, centerY, radius, this.context);
    // set fillStyle color green.
    this.context.fillStyle = "green";
    // this.context.fillRect(50, 50, 350, 200);
    this.context.arc(centerX, centerY, 70, 0, 2 * Math.PI);
    this.context.fill();
    this.context.stroke();
  }
}

export default function Canvas() {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef: any = useRef();
  const canvasRef: any = useRef();
  const previousTimeRef = useRef(null);
  const mousepos = useRef([]);
  const peoplelist = useRef([]);
  // ss for square size, bs for border size, trail for length of trail, colarray for start and end color

  const trail = 20;
  const colarray = generateColor("0f1e3f", "603BFF", trail);

  // function to encapsulate all draw funcs
  const drawAll = (mousepos) => {
    const ctx = canvasRef.current.getContext("2d");
    const [x, y] = mousepos;
    const [sx, sy] = [
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight,
    ];
    // console.log(x, y);
    peoplelist.current.forEach((person) => person.Draw());
  };

  const animate = (time) => {
    if (previousTimeRef.current != undefined) {
      // Pass on a function to the setter of the state
      // to make sure we always have the latest state\
      // do the animation
      drawAll(mousepos.current);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  // either page loaded or someone resized the window, let's redraw the grid
  const reset = () => {
    canvasRef.current.width = canvasRef.current.clientWidth;
    canvasRef.current.height = canvasRef.current.clientHeight;
    const ctx = canvasRef.current.getContext("2d");
    const [sx, sy] = [
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight,
    ];

    console.log("grid rerendered");
  };

  useEffect(() => {
    peoplelist.current = [
      new Person("John", canvasRef.current),
      new Person("Mary", canvasRef.current),
      new Person("Peter", canvasRef.current),
    ];
    peoplelist.current[0].Draw();
    peoplelist.current[1].Draw();
    peoplelist.current[2].Draw();
  }, []);

  useEffect(() => {
    // function to handle when mouse moves
    const handleWindowMouseMove = (event) => {
      const canvas = canvasRef.current;
      var rect = canvas.getBoundingClientRect();
      mousepos.current = [
        (canvas.width * (event.clientX - rect.left)) / rect.width,
        (canvas.height * (event.clientY - rect.top)) / rect.height,
      ];
    };
    try {
      // initial grid load
      reset();
    } catch {}
    // add listeners to watch when mouse moves and when window resizes for
    // improved performance vs onMouseMove
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
