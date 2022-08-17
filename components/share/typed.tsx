import { useEffect, useRef, useState } from "react";

export default function Typed({ text }: any) {
  const textref = useRef<HTMLDivElement>(null);
  const [textHTML, setTextHTML] = useState<string>("");
  const listoftext = [];
  useEffect(() => {
    if (textref.current) {
      let i = 0;
      let innertext = ""
      console.log(text);
      const listloop = setInterval(() => {
        listoftext.push(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(listloop);
        }
      }, 0);
      i = 0;
      console.log(text);
      const loop = setInterval(() => {
        setTextHTML(listoftext[i]);
        i++;
        if (i >= listoftext.length) {
          clearInterval(loop);
        }
      }, 30);
    }
  }, [textref]);
  return (
    <div dangerouslySetInnerHTML={{ __html: textHTML }} ref={textref}></div>
  );
}
