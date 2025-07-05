import clsx from "clsx";
import { styles } from ".";

interface MenuBurgerProps {
  open?: boolean;
  className?: string;
  onClick?: () => void;
}

export const MenuBurger = ({open, className, onClick}: MenuBurgerProps) => (
  <button
    onClick={onClick}
    className={clsx(styles.burger, open && styles.active, className && className)}
    aria-label="Open/Close Burger Menu"
  >
    <span className={clsx(styles.ball, styles.ball1)}>
      <span className={styles.front}></span>
      <span className={styles.back}></span>
    </span>
    <span className={clsx(styles.ball2, styles.ball)}></span>
    <span className={clsx(styles.ball3, styles.ball)}>
      <span className={styles.front}></span>
      <span className={styles.back}></span>
    </span>
  </button>
);
