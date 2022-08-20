import styles from "./styles/main.module.css";
export default function SlideRight({ children }) {
  return <div className={styles.right}>{children}</div>;
}
