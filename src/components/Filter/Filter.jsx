import { useEffect, useState, useRef } from "react";
import styles from "./Filter.module.scss"


export default function Filter({ onClose, onApply, onClear, artists, locations, years }) {
  const [openSection, setOpenSection] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [loading, setLoading] = useState(false);
  const applyBtnRef = useRef(null);

  function toggle(section) {
    setOpenSection(openSection === section ? null : section);
  }

  function handleApply() {
    if (!selectedArtist && !selectedLocation && !fromYear && !toYear) {
      return;
    }

    setLoading(true);
    const filters = {
      artist: selectedArtist || null,
      location: selectedLocation || null,
      from: fromYear ? parseInt(fromYear) : null,
      to: toYear ? parseInt(toYear) : null,
    };
    onApply(filters);
    onClose();
    setTimeout(() => {
      setSelectedArtist("");
      setSelectedLocation("");
      setFromYear("");
      setToYear("");
      setLoading(false);
    }, 100);
  }

  function handleClear() {
    setSelectedArtist("");
    setSelectedLocation("");
    setFromYear("");
    setToYear("");
    onClear();
  }

  useEffect(() => {
    if (!loading && applyBtnRef.current) {
      applyBtnRef.current.focus();
    }
  }, [loading]);

  useEffect(() => {
    if (onClose) {
      const handleEscape = (e) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [onClose]);

  return (
    <div className={`${styles.filter} ${styles.open} ${loading ? styles.loading : ""}`}>

      <button className={styles.close} onClick={onClose}>X</button>

      <div className={styles.filterContent}>

        <div className={styles.section}>
          <div
            className={styles.header}
            onClick={() => toggle("artist")}
          >
            <span>ARTIST</span>
            <span>{openSection === "artist" ? "−" : "+"}</span>
          </div>

          {openSection === "artist" && (
            <div>
              <select
                className={styles.select}
                value={selectedArtist}
                onChange={(e) => setSelectedArtist(e.target.value)}
                disabled={!artists || artists.length === 0}
              >
                <option value="">Select the artist</option>
                {artists.map((artist) => (
                  <option key={artist} value={artist}>
                    {artist}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>


        <div className={styles.section}>
          <div
            className={styles.header}
            onClick={() => toggle("location")}
          >
            <span>LOCATION</span>
            <span>{openSection === "location" ? "−" : "+"}</span>
          </div>

          {openSection === "location" && (
            <div>
              <select
                className={styles.select}
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                disabled={!locations || locations.length === 0}
              >
                <option value="">Select the location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>


        <div className={styles.section}>
          <div
            className={styles.header}
            onClick={() => toggle("years")}
          >
            <span>YEARS</span>
            <span>{openSection === "years" ? "−" : "+"}</span>
          </div>

          {openSection === "years" && (
            <div className={styles.years}>
              <input
                type="number"
                placeholder="From"
                value={fromYear}
                onChange={(e) => setFromYear(e.target.value)}
              />
              <input
                type="number"
                placeholder="To"
                value={toYear}
                onChange={(e) => setToYear(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>


      <div className={styles.filterBtns}>
        <button
          ref={applyBtnRef}
          onClick={handleApply}
          disabled={loading}
        >
          {loading ? "Loading..." : "SHOW THE RESULTS"}
        </button>
        <button onClick={handleClear}>CLEAR</button>
      </div>
    </div>
  );
}