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

  useEffect(() => {

    fetch("https://registry.scalar.com/@mail-ufgwz/apis/gallery-api@latest")
      .then((response) => response.json())
      .then((api) => {

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
      })
      .catch((error) => {
        console.error("Ошибка загрузки:", error);
      });

  }, []);


  const filtered = cards.filter((card) =>
    (card.title + card.artist + card.location)
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const perPage = 6;
  const totalPages = Math.ceil(filtered.length / perPage);

  const paginated = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <Container>
      <Header>111</Header>

      <Search onChange={setQuery} />

      <div className={styles.content}>
        {paginated.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>

      <Pag page={page} total={totalPages} onChange={setPage} />
    </Container>
  );
}