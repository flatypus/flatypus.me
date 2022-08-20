import styles from "./stylesimage.png/main.module.css";

export default function NavBar() {
  return (
    <div className="grid grid-cols-12 place-items-center px-6 pt-2 pb-0">
      <img
        className="shadow-md rounded-full h-1/2 transition hover:scale-105"
        src="/images/profile.png"
      ></img>
      <div className={styles.circle}>H</div>
    </div>
  );
}
