import styles from "./Search.module.scss"
import SettingsIcon from "../../assets/icons/filter_icon.svg?react"
import SearchIcon from "../../assets/icons/search_icon.svg?react"
import Filter from "../Filter/Filter"
import { useState } from "react"

export default function Search({ onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.search}>
      <div className={styles.searchInput}>
        <SearchIcon />
        <input
          type="text"
          placeholder="Painting title"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      <button
        className={styles.settingIcon}
        onClick={() => setOpen(true)}
      >
        <SettingsIcon />
      </button>

      {open && <Filter onClose={() => setOpen(false)} />}
    </div>
  );
}