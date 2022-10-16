import { useRef, useState, useEffect } from "react";
import { generateColor } from "../lib/gradient";

class Person {
  name: any;
  context: any;
  ref: any;
  elem: any;

  constructor(name) {
    this.name = name;
    this.elem = <div className="absolute left-0 top-0">
      {this.name}
    </div>
  }
  Draw(runs) {
    // console.log(runs)
    this.elem = <div className={`absolute left-[${runs}px] top-0`}>
      {this.name}
    </div>
    return this.elem;
    // console.log(this.elem);
  }
}

export default function Canvas() {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef: any = useRef();
  const previousTimeRef = useRef(null);
  const mousepos = useRef([]);
  const [peoplelist, setPeoplelist] = useState([]);
  const [elems, setElems] = useState([]);
  const [run, setRun] = useState(0);
  // ss for square size, bs for border size, trail for length of trail, colarray for start and end color

  const trail = 20;
  const colarray = generateColor("0f1e3f", "603BFF", trail);

  // function to encapsulate all draw funcs
  const drawAll = (mousepos) => {
    const [x, y] = mousepos;
    setRun((run) => run + 1);
    console.log(run);
    peoplelist.forEach((person) => person.Draw(run));
    // console.log(peoplelist);
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


  useEffect(() => {
    const objectList = [
      new Person("John"),
      // new Person("Mary"),
      // new Person("Peter"),
    ]
    setElems(objectList.map((person) => person.Draw(0)));
    setPeoplelist(objectList);
  }, [elems, peoplelist]);

  useEffect(() => {
    // function to handle when mouse moves
    const handleWindowMouseMove = (event) => {
      mousepos.current = [
        event.clientX,
        event.clientY
      ];
    };

    // add listeners to watch when mouse moves and when window resizes for
    // improved performance vs onMouseMove
    window.addEventListener("mousemove", handleWindowMouseMove);
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once

  return (
    <div>
      {elems.map((elem) => elem)}
    </div>
  );
}
