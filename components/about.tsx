import { useRef, useState, useEffect } from "react";
import { generateColor } from "../lib/gradient";

class Person {
  name: any;
  canvas: any;
  image: any
  context: any;
  x: any
  y: any
  vx: any;
  vy: any;
  showFrame: any
  open: any
  clickFrame: any
  constructor(name, canvas, src) {
    this.name = name;
    this.canvas = canvas;
    this.image = new Image();
    this.image.src = src;
    [this.x, this.y] = [this.canvas.width / 2 + ((Math.random() - 0.5) * 400), this.canvas.height / 2 + ((Math.random() - 0.5) * 400)];
    [this.vx, this.vy] = [Math.random() * 2 - 1, Math.random() * 2 - 1];
    this.context = canvas.getContext("2d");
    this.showFrame = 0;
    this.open = false;
    this.clickFrame = false

  }

  ClickCheck(mousepos,) {
    // console.log(mousedown)
    const [mx, my] = mousepos;
    const dx = mx - this.x;
    const dy = my - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < 60
  }

  Squircle(ctx, x, y, width, height, radius) {
    const r = x + width;
    const b = y + height;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(r - radius, y);
    ctx.quadraticCurveTo(r, y, r, y + radius);
    ctx.lineTo(r, y + height - radius);
    ctx.quadraticCurveTo(r, b, r - radius, b);
    ctx.lineTo(x + radius, b);
    ctx.quadraticCurveTo(x, b, x, b - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
    // draw text relative to the squircle
    this.context.font = `${40 * (this.showFrame / 12)}px Arial`;
    this.context.fillStyle = "black";
    this.context.textAlign = "center";
    this.context.fillText(this.name, this.x + ((this.showFrame / 12) * 100), this.y + ((this.showFrame / 12) * 15));
  }


  Draw(positions, mousepos, screensize, mousedown) {
    const mouseOver = this.ClickCheck(mousepos)
    this.clickFrame = false
    if (mousedown && mouseOver) {
      const dx = mousepos[0] - this.x;
      const dy = mousepos[1] - this.y;
      this.vx += dx * 0.008
      this.vy += dy * 0.008
      this.open = true
      this.clickFrame = true
    }
    if (this.open) {
      if (this.showFrame <= 12) this.showFrame += 1
    } else {
      if (this.showFrame > 0) this.showFrame -= 1
    }
    // else if (this.showFrame > 0) this.showFrame -= 1
    // simulate elastic collisions between walls, and between people
    // since positions includes itself, only check for collisions with other people
    // (i.e. the people in positions that come after this one)
    for (let i = 0; i < positions.length; i++) {
      const other = positions[i];
      const dx = this.x - other[0]
      const dy = this.y - other[1]
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 200 + (this.showFrame / 12) * 100) {
        // push people away from each other
        this.vx += dx * 0.008;
        this.vy += dy * 0.008;
      }
    }
    // simulate elastic collisions between walls
    if (this.x - 40 < 0) this.x = 40;
    if (this.x + 40 > screensize[0]) this.x = screensize[0] - 40;
    if (this.y - 40 < 0) this.y = 40;
    if (this.y + 40 > screensize[1]) this.y = screensize[1] - 40;

    // move people closer to their center of mass
    const [cx, cy] = [screensize[0] / 2, screensize[1] / 2];
    const dx = cx - this.x;
    const dy = cy - this.y;
    this.vx += dx * 0.00002;
    this.vy += dy * 0.00002;

    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.8;
    this.vy *= 0.8;
    // draw the person

    this.context.fillStyle = "white";
    this.Squircle(this.context,
      this.x - (this.showFrame / 12) * 50,
      this.y - (this.showFrame / 12) * 50,
      (this.showFrame / 12) * 225,
      (this.showFrame / 12) * 300,
      (this.showFrame / 12) * 20)
    this.context.beginPath();
    this.context.arc(this.x, this.y, 42, 0, Math.PI * 2, true);
    this.context.fillStyle = mouseOver ? "#ff0000" : "#00ff00";
    this.context.fill();
    this.context.closePath();
    this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x - 40, this.y - 40, 80, 80);
    this.context.font = "32px Arial";
    this.context.fillStyle = "white";
    this.context.textAlign = "center";
    this.context.fillText(this.name, this.x, this.y + 75);
  }
}

export default function Canvas() {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef: any = useRef();
  const canvasRef: any = useRef();
  const previousTimeRef = useRef(null);
  const mouseDown = useRef(false);
  const mousepos = useRef([]);
  const peoplelist = useRef([]);
  // ss for square size, bs for border size, trail for length of trail, colarray for start and end color

  const drawLines = (positions) => {
    const context = canvasRef.current.getContext("2d");
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const [x1, y1] = positions[i];
        const [x2, y2] = positions[j];
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.strokeStyle = "#FFFFFF12";
        context.lineWidth = 1;
        context.stroke();

      }
    }
  }
  // function to encapsulate all draw funcs
  const drawAll = (mousepos) => {
    const [sx, sy] = [
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight,
    ];
    reset();
    const positions = peoplelist.current.map((person) => [person.x, person.y])
    drawLines(positions);
    for (let i = 0; i < peoplelist.current.length; i++) {
      let person = peoplelist.current[i];
      let positions = peoplelist.current.filter((_, index) => index != i).map((person) => [person.x, person.y, person.showFrame]);
      person.Draw(positions, mousepos, [sx, sy], mouseDown.current);
      if (person.clickFrame) {
        peoplelist.current.filter((_, index) => index != i).forEach((person) => person.open = false)
      }
    }
  };

  const animate = (time) => {
    if (previousTimeRef.current != undefined) {
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
    ctx.clearRect(0, 0, sx, sy);
  };

  useEffect(() => {
    const [sx, sy] = [
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight,
    ];
    peoplelist.current = [
      new Person("John", canvasRef.current, "https://www.edubeyond.dev/index/about/alec6.png"),
      new Person("Jane", canvasRef.current, "https://www.edubeyond.dev/index/about/alec3.png"),
      new Person("Joe", canvasRef.current, "https://www.edubeyond.dev/index/about/alec4.png"),
      new Person("Jill", canvasRef.current, "https://www.edubeyond.dev/index/about/alec5.png"),
      new Person("Jack", canvasRef.current, "https://www.edubeyond.dev/index/about/tienlan3.png"),
      new Person("Jen", canvasRef.current, "https://www.edubeyond.dev/index/about/tienlan5.png"),
      new Person("Jenny", canvasRef.current, "https://www.edubeyond.dev/index/about/tienlan4.png"),
      new Person("John", canvasRef.current, "https://www.edubeyond.dev/index/about/alec6.png"),
      new Person("Jane", canvasRef.current, "https://www.edubeyond.dev/index/about/alec3.png"),
    ];
    // reset();
    for (let i = 0; i < peoplelist.current.length; i++) {
      let person = peoplelist.current[i];
      // add all items except itself
      let positions = peoplelist.current.filter((_, index) => index != i).map((person) => [person.x, person.y, person.showFrame]);
      person.Draw(positions, [0, 0], [sx, sy], mouseDown.current)
    }
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
    } catch { }
    // add listeners to watch when mouse moves and when window resizes for
    // improved performance vs onMouseMove
    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("resize", reset);
    window.addEventListener("mousedown", () => { mouseDown.current = true })
    window.addEventListener("mouseup", () => { mouseDown.current = false })
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
