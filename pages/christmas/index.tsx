import { useEffect, useMemo, useRef, useState } from "react";
import ColorPicker from "./colorpicker/ColorPicker";
import Socket from "socket.io-client";

export default function Christmas() {
  const [canvasx, canvasy] = [960, 960];

  const canvas = useRef(null);
  const mockImage = useRef(null);
  const [inputColor, setInputColor] = useState("");
  const socket = useMemo(() => Socket("https://christmassocket.flatypus.me"), []);

  // socket.on("connect", () => {
  //   console.log("connected");
  // });
  // socket.on("disconnect", () => {
  //   console.log("disconnected");
  // });

  //   useEffect(() => {
  //     console.log(inputColor);
  //   }, [inputColor]);

  // create an r/place canvas
  useEffect(() => {
    const canvasRef = canvas.current;
    const ctx = canvasRef.getContext("2d");
    canvasRef.width = canvasx;
    canvasRef.height = canvasy;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasRef.width, canvasRef.height);
    ctx.drawImage(mockImage.current, 0, 0, canvasx, canvasy);

    socket.on("currentgrid", (data) => {
      console.log(data);
      const canvasRef = canvas.current;
      const ctx = canvasRef.getContext("2d");
      for (const loc in data) {
        const { x, y } = JSON.parse(loc);
        ctx.fillStyle = data[loc];
        ctx.fillRect(10 * x, 10 * y, 10, 10);
      }
    });
  }, []);

  useEffect(() => {
    const canvasRef = canvas.current;
    const ctx = canvasRef.getContext("2d");
    canvasRef.addEventListener("click", (e) => {
      const x = Math.round((canvasx / 10) * (e.offsetX / canvasx));
      const y = Math.round((canvasy / 10) * (e.offsetY / canvasy));
      // ctx.fillStyle = inputColor;
      // ctx.fillRect(10 * x, 10 * y, 10, 10);
      setInputColor((inputColor) => {
        socket.emit("pixelsend", { x, y, color: inputColor });
        return inputColor;
      });
    });
  }, [inputColor]);

  useEffect(() => {
    socket.on("pixelupdate", (data) => {
      const canvasRef = canvas.current;
      const ctx = canvasRef.getContext("2d");
      ctx.fillStyle = data.color;
      ctx.fillRect(10 * data.x, 10 * data.y, 10, 10);
    });
  }, []);

  // draw the canvas
  return (
    <>
      <div className="flex flex-row gap-20">
        <canvas ref={canvas} id="canvas" />
        <ColorPicker color={"#FF0000"} inputColor={inputColor} setInputColor={setInputColor} />
        <img
          src="https://png2.cleanpng.com/dy/09f0df8216efaefa738e6f3f487cc95b/L0KzQYq3VME2N6Z5f5H0aYP2gLBuTgBweqVmet5uLX7ohMj2kvsub6NmiNpyY4Oweb7ohBUua5l3geV9bXH2PcX5hfUueJp9RadsYkS8SbK9hsA5OmQ7RqYAOEWzQ4qAUcU2PWQ4UagDNkm7RYK1kP5o/kisspng-portable-network-graphics-image-christmas-tree-pix-5cb499a6f08236.4585039715553396869851.png"
          ref={mockImage}
          className="hidden"
        ></img>
      </div>
    </>
  );
}
