import styles from "./styles/main.module.css";
export default function SlideLeft({ children }) {
  return <div className={styles.left}>{children}</div>;
}
