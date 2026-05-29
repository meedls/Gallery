import { useState, useEffect } from "react";
import styles from "./MainPage.module.scss";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";
import Card from "../../components/Card/Card";
import Pag from "../../components/Pag/Pag";

export default function MainPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [cards, setCards] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [artists, setArtists] = useState([]);
  const [locations, setLocations] = useState([]);
  const [years, setYears] = useState([]);
  const [filters, setFilters] = useState({ artist: null, location: null, from: null, to: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://registry.scalar.com/@mail-ufgwz/apis/gallery-api@latest");
        const api = await response.json();


        const paintings =
          api.paths["/paintings"]
            .get
            .responses["200"]
            .content["application/json"]
            .example;

        const preparedCards = paintings.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        setCards(preparedCards);
        setAllCards(preparedCards);


        const uniqueArtists = [...new Set(paintings.map((p) => p.artist))];
        setArtists(uniqueArtists);


        const uniqueLocations = [...new Set(paintings.map((p) => p.location))];
        setLocations(uniqueLocations);


        const allYears = paintings.map((p) => p.year);
        const minYear = Math.min(...allYears);
        const maxYear = Math.max(...allYears);
        setYears([minYear, maxYear]);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      }
    };

    fetchData();
  }, []);


  const filteredBySearch = cards.filter((card) =>
    (card.title + card.artist + card.location)
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const perPage = 6;
  const totalPages = Math.ceil(filteredBySearch.length / perPage);

  const paginated = filteredBySearch.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <Container>
      <Header>111</Header>

      <Search
        onChange={setQuery}
        onApply={(filters) => {
          setLoading(true);
          setTimeout(() => {
            const filtered = allCards.filter((card) => {
              if (filters.artist && card.artist !== filters.artist) {
                return false;
              }
              if (filters.location && card.location !== filters.location) {
                return false;
              }
              if (filters.from && card.year < filters.from) {
                return false;
              }
              if (filters.to && card.year > filters.to) {
                return false;
              }
              return true;
            });
            setCards(filtered);
            setLoading(false);
            setPage(1);
          }, 100);
        }}
        onClear={() => {
          setFilters({ artist: null, location: null, from: null, to: null });
          setCards(allCards);
          setPage(1);
        }}
        artists={artists}
        locations={locations}
        years={years}
      />

      <div className={styles.content}>
        {loading ? (
          <p>Загрузка...</p>
        ) : (
          paginated.map((card) => <Card key={card.id} {...card} />)
        )}
      </div>

      <Pag page={page} total={totalPages} onChange={setPage} />
    </Container>
  );
}