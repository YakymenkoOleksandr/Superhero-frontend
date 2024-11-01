import { useEffect, useState } from "react";
import css from "./SuperHeroes.module.css";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

function SuperHeroes() {
  const [heroes, setHeroes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  useEffect(() => {
    async function fetchSuperHeroes() {
      try {
        const response = await fetch(
          `https://superhero-backend-vrcc.onrender.com/superheros?page=${page}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const heroesData = data.data.data; // Отримуємо перші 5 супергероїв
        setTotalPage(Math.ceil(data.data.totalItems / 5));
        setHeroes(heroesData);
      } catch (error) {
        console.error("Failed to fetch superheroes:", error);
      }
    }

    fetchSuperHeroes();
  }, [page]);

  return (
    <div className={css.bacgroundForSuperHeroesPage}>
      <div>
        {heroes.map((hero) => (
          <div key={hero._id} className={css.wrapperForHeroesCards}>
            <div className={css.heroCard}>
              <div>
                <img
                  src={hero.images[0]}
                  alt="Oops, there must be an image!"
                  className={css.imageInCardHero}
                />
              </div>
              <div className={css.wrapperForDescriptionTextHero}>
                <h2 className={css.nameOfHero}>{hero.nickname}</h2>
                <p className={css.textInCard}>
                  <span className={css.titelsInCard}>Real name:</span>{" "}
                  {hero.real_name}
                </p>
                <p className={css.textInCard}>
                  <span className={css.titelsInCard}>Description:</span>{" "}
                  {hero.origin_description}
                </p>
                <p className={css.textInCard}>
                  <span className={css.titelsInCard}>Superpowers:</span>{" "}
                  {hero.superpowers.join(", ")}
                </p>
                <p className={css.textInCard}>
                  <span className={css.titelsInCard}>Catch Phrase:</span>{" "}
                  {hero.catch_phrase}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={css.wrapperForForvardAndBackButtons}>
        {page > 1 ? (
          <button className={css.buttonsTogle} onClick={prevPage}>
            <FaChevronLeft className={css.buttonTogleIcon} />
          </button>
        ) : (
          <button className={css.buttonsTogleHiden} onClick={prevPage}>
            <FaChevronLeft className={css.buttonTogleIconHiden} />
          </button>
        )}
        <p className={css.pageNumber}>{page}</p>
        {page < totalPage ? (
          <button className={css.buttonsTogle} onClick={nextPage}>
            <FaChevronRight className={css.buttonTogleIcon} />
          </button>
        ) : (
          <button className={css.buttonsTogleHiden} onClick={nextPage}>
            <FaChevronRight className={css.buttonTogleIconHiden} />
          </button>
        )}
      </div>
    </div>
  );
}

export default SuperHeroes;
