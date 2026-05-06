import styles from "./Pag.module.scss";

export default function Pag({ page, total, onChange }) {
  if (total <= 1) return null;

  const pages = [];
  for (let i = 1; i <= total; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.prev}
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        {"<"}
      </button>

      <div className={styles.pages}>
        {pages.map((p) => (
          <span
            key={p}
            className={p === page ? styles.active : ""}
            onClick={() => onChange(p)}
          >
            {p}
          </span>
        ))}
      </div>

      <button
        className={styles.next}
        disabled={page === total}
        onClick={() => onChange(page + 1)}
      >
        {">"}
      </button>
    </div>
  );
}