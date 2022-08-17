import { useEffect, useRef, useState } from "react";

export default function Typed({ text, speed = 20 }: any) {
  const textref = useRef<HTMLDivElement>(null);
  const [textHTML, setTextHTML] = useState<string>("");

  useEffect(() => {
    if (textref.current) {
      let left = "";
      let middle = "";
      let right = "";
      let last = "";
      let mode = 0;
      let listoftext = [];
      console.log(text);
      for (let i = 0; i < text.length; i++) {
        if (text[i] == "<" || text[i] == ">") {
          if (mode == 0) {
            last = listoftext[listoftext.length - 1];
          }
          if (mode == 3) {
            for (let j = 0; j < middle.length; j++) {
              if (j < middle.length) {
                listoftext.push(
                  `${last} <${left}>${middle.slice(0, j + 1)}<${right}>`
                );
              }
            }
            left = "";
            middle = "";
            right = "";
            last = listoftext[listoftext.length - 1];
          }
          mode = (mode + 1) % 4;
        } else {
          if (mode == 0) {
            listoftext.push(last + text[i]);
            last = last + text[i];
          } else if (mode == 1) {
            left += text[i];
          } else if (mode == 2) {
            middle += text[i];
          } else if (mode == 3) {
            right += text[i];
          }
        }
        console.log(listoftext);
      }
      let i = 0;
      const loop = setInterval(() => {
        setTextHTML(listoftext[i]);
        i++;
        if (i >= listoftext.length) {
          clearInterval(loop);
        }
      }, speed);
    }
  }, [textref]);
  return (
    <div dangerouslySetInnerHTML={{ __html: textHTML }} ref={textref}></div>
  );
}
