import styles from "./Card.module.scss"
import ArrowIcon from "../../assets/icons/arrow_icon.svg?react"

export default function Card({imageUrl,title,year,artist,location}){



  return(
    <div className={styles.card}>
      <img src={imageUrl} alt={title}/>
      <div className={styles.cardContent}>
        <div className={styles.overlay}>
          <div className={styles.default}>
            <span className={styles.title}>{title}</span>
            <span className={styles.year}>{year}</span>
          </div>
          <div className={styles.hover}>
            <span className={styles.title}>{artist}</span>
            <span className={styles.year}>{location}</span>
          </div>
        </div>
        <button className={styles.cardBtn}>
          <ArrowIcon></ArrowIcon>
        </button>
      </div>
    </div>
  )
}

