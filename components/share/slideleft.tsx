import styles from "./styles/slideleft.module.css";
export default function SlideLeft({ children }) {
  return <div className={styles.left}>{children}</div>;
}
