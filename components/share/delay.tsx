import { useEffect, useState } from "react";

interface Props {
  children: React.ReactElement;
  wait?: number;
}

export default function Delay({ children, wait = 500 }: Props) {
  const [isShown, setIsShown] = useState(false);
  useEffect(() => {
    console.log(wait);
    setTimeout(() => {
      setIsShown(true);
    }, wait);
  }, [wait]);
  return isShown ? children : null;
}
