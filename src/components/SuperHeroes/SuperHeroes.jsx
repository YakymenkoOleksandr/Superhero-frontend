import { useEffect, useState } from "react";
import css from "./SuperHeroes.module.css";

function SuperHeroes() {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    async function fetchSuperHeroes() {
      try {
        const response = await fetch(
          "https://superhero-backend-vrcc.onrender.com/superheros"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const heroesData = data.data.data; // Отримуємо перші 5 супергероїв
        setHeroes(heroesData);
      } catch (error) {
        console.error("Failed to fetch superheroes:", error);
      }
    }

    fetchSuperHeroes();
  }, []);

  return (
    <div>
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
                <p><span className={css.titelsInCard}>Real name:</span> {hero.real_name}</p>
                <p><span className={css.titelsInCard}>Description:</span> {hero.origin_description}</p>
                <p><span className={css.titelsInCard}>Superpowers:</span> {hero.superpowers.join(", ")}</p>
                <p><span className={css.titelsInCard}>Catch Phrase:</span> {hero.catch_phrase}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuperHeroes;
