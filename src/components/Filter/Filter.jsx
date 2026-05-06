import { useEffect, useState } from "react";
import styles from "./Filter.module.scss"


export default function Filter({onClose}){
  const [openSection, setOpenSection] = useState(null);

  function toggle(section) {
    setOpenSection(openSection === section ? null : section);
  }
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);
  return(
    <div className={`${styles.filter} ${visible ? styles.open : ""}`}>
      {/* закрыть */}
      <button className={styles.close} onClick={onClose}>X</button>

      <div className={styles.filterContent}>
        {/* ARTIST */}
        <div>
          <div className={styles.header} onClick={() => toggle("artist")}>
            <span>ARTIST</span>
            <span>{openSection === "artist" ? "−" : "+"}</span>
          </div>

          {openSection === "artist" && (
            <div>
              <select className={styles.select}>
                <option>Select the artist</option>
                <option>Van Gogh</option>
                <option>Da Vinci</option>
              </select>
            </div>
          )}
        </div>

        {/* LOCATION */}
        <div>
          <div className={styles.header} onClick={() => toggle("location")}>
            <span>LOCATION</span>
            <span>{openSection === "location" ? "−" : "+"}</span>
          </div>

          {openSection === "location" && (
            <div>
              <select className={styles.select}>
                <option>Select the location</option>
                <option>Italy</option>
                <option>France</option>
              </select>
            </div>
          )}
        </div>

        {/* YEARS */}
        <div>
          <div className={styles.header} onClick={() => toggle("years")}>
            <span>YEARS</span>
            <span>{openSection === "years" ? "−" : "+"}</span>
          </div>

          {openSection === "years" && (
            <div className={styles.years}>
              <input type="number" placeholder="From" />
              <input type="number" placeholder="To" />
            </div>
          )}
        </div>
      </div>
      

      {/* кнопки */}
      <div className={styles.filterBtns}>
        <button>SHOW THE RESULTS</button>
        <button>CLEAR</button>
      </div>
    </div>
  )
}