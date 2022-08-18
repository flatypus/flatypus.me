import styles from "./styles/slideright.module.css";
export default function SlideRight({ children }) {
  return <div className={styles.right}>{children}</div>;
}
