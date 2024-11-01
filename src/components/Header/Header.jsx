import css from "./Heaer.module.css";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className={css.wrapperForHeader}>
      <nav className={css.nabar}>
        <div className={css.logoInHeader}>
          <NavLink to="/" className={css.logolink}>
            <span className={css.super}>Super </span>
            <span className={css.heroes}>Heroes</span>
          </NavLink>
        </div>
        <ul className={css.navButtons}>
          <li className={css.navigationElementHeader}>
            <NavLink to="/" className={css.navigationLink}>
              Home page
            </NavLink>
          </li>
          <li className={css.navigationElementHeader}>
            <NavLink to="/superherosColection" className={css.navigationLink}>
              Superheroes <br /> colection
            </NavLink>
          </li>
          <li className={css.navigationElementHeader}>
            <NavLink to="/CURDsuperhero" className={css.navigationLink}>
              Add superhero
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
