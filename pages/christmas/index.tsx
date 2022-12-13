import { useEffect, useMemo, useRef, useState } from "react";
import ColorPicker from "../../components/colorpicker/ColorPicker";
import Socket from "socket.io-client";
import ChristmasCanvas from "../../components/christmascanvas";

export default function Christmas() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const mockImage = useRef(null);
  // draw the canvas
  return (
    <>
      {imageLoaded ? (
        <>
          <ChristmasCanvas mockImage={mockImage}></ChristmasCanvas>
        </>
      ) : null}
      <img
        src="https://png2.cleanpng.com/dy/09f0df8216efaefa738e6f3f487cc95b/L0KzQYq3VME2N6Z5f5H0aYP2gLBuTgBweqVmet5uLX7ohMj2kvsub6NmiNpyY4Oweb7ohBUua5l3geV9bXH2PcX5hfUueJp9RadsYkS8SbK9hsA5OmQ7RqYAOEWzQ4qAUcU2PWQ4UagDNkm7RYK1kP5o/kisspng-portable-network-graphics-image-christmas-tree-pix-5cb499a6f08236.4585039715553396869851.png"
        ref={mockImage}
        onLoad={() => {
          setImageLoaded(true);
        }}
        className="hidden"
      ></img>
    </>
  );
}
