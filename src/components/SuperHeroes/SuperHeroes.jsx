import { useEffect, useState } from "react";
import css from "./SuperHeroes.module.css";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import MoreInfo from "../MoreInfo/MoreInfo";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuperHeroes } from "../../redux/heroes/heroesOperations";
import { setAuthToken } from "../../AxiosInstance/AxiosInstance.jsx";
import { selectAccessToken } from "../../redux/auth/authSelectors.js"
import {selectTotalPage, selectHeroes} from "../../redux/heroes/heroesSelectors.js"

function SuperHeroes() {
  const savedPage = Number(localStorage.getItem("currentPage")) || 1;
  const [page, setPage] = useState(savedPage);
  const totalPage = useSelector(selectTotalPage);

  
  const dispatch = useDispatch();
  const heroes = useSelector(selectHeroes || []);

  const accessToken = useSelector(selectAccessToken);
  // console.log("AccessToken: ", accessToken);
  
  
  useEffect(() => {
  if (accessToken) {
    setAuthToken(accessToken);
  }
  dispatch(fetchSuperHeroes(page, accessToken));
  localStorage.setItem("currentPage", page);
}, [dispatch, page, accessToken]);

  const nextPage = () => setPage((prevPage) => Math.min(prevPage + 1, totalPage));
  const prevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

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