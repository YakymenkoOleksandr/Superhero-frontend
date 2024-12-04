import { useEffect, useState } from "react";
import css from "./SuperHeroes.module.css";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import MoreInfo from "../MoreInfo/MoreInfo";
import { useDispatch, useSelector } from "react-redux";
import { fetchHeroes } from "../../redux/actions.js";
import axiosInstance, { setAuthToken } from "../../components/AxiosInstance/AxiosInstance.jsx";

function SuperHeroes() {
  const savedPage = Number(localStorage.getItem("currentPage")) || 1;
  const [page, setPage] = useState(savedPage);
  const totalPage = useSelector((state) => state.heroes.totalPage);

  const dispatch = useDispatch();
  const heroes = useSelector((state) => state.heroes.heroes || []);

  const accessToken = useSelector((state) => state.auth.accessToken);
  console.log("AccessToken: ", accessToken);
  
  useEffect(() => {
    if (accessToken) {
      // Налаштування токена для axios
      setAuthToken(accessToken);
    }

    // Виклик Redux action для оновлення стану
    dispatch(fetchHeroes(page));
    localStorage.setItem("currentPage", page);
  }, [dispatch, page, accessToken]);

  const nextPage = () =>
    setPage((prevPage) => Math.min(prevPage + 1, totalPage));
  const prevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  useEffect(() => {
    async function fetchSuperHeroes() {
      try {
        const response = await axiosInstance.get(`/superheros?page=${page}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
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
              <div className={css.horisontal}>
                <div className={css.wrapperForImg}>
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
              <div className={css.blockForButtonMoreInfo}>
                <MoreInfo hero={hero} currentPage={page} />
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
