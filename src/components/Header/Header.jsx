import styles from "./Header.module.scss"
import SunIcon from "../../assets/icons/light_icon.svg?react";
import MoonIcon from "../../assets/icons/dark_icon.svg?react";

import { useEffect, useState } from "react";

export default function Header() {
  const [dark, setDark] = useState(true);

  function toggleTheme() {
    setDark(prev => !prev);
  }

  useEffect(() => {
    document.body.classList.toggle("light", !dark);
  }, [dark]);

  return (
    <header className={styles.header}>
      <button className={styles.themeBtn} onClick={toggleTheme}>
        {dark ? <SunIcon /> : <MoonIcon />}
      </button>
    </header>
  );
};