import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/auth/authOperations";
import { NavLink, useNavigate } from "react-router-dom";
import css from "../Header/Header.module.css";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);
const isAuthenticated = Boolean(accessToken);

  const handleLogout = async () => {
    const resultAction = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(resultAction)) {
      navigate("/");
    }
  };

  return (
    <div className={css.wrapperForHeader} key={isAuthenticated}>
      <nav className={css.nabar}>
        <div className={css.logoInHeader}>
          <NavLink to="/" className={css.logolink}>
            <span className={css.super}>Super </span>
            <span className={css.heroes}>Heroes</span>
          </NavLink>
        </div>
        <ul className={css.navButtons}>
          {accessToken ? (
            <div className={css.navBlock}>
              <li className={css.navigationElementHeader}>
                <NavLink to="/" className={css.navigationLink}>
                  Home page
                </NavLink>
              </li>
              <li className={css.navigationElementHeader}>
                <NavLink
                  to="/superherosColection"
                  className={css.navigationLink}
                >
                  Superheroes <br /> collection
                </NavLink>
              </li>
              <li className={css.navigationElementHeader}>
                <NavLink to="/CURDsuperhero" className={css.navigationLink}>
                  Add superhero
                </NavLink>
              </li>
              <div className={css.wrapperForLogOut}>
                <li className={css.logOutBlock}>
                  <NavLink
                    to="/"
                    className={css.logOutPading}
                    onClick={handleLogout}
                  >
                    Log Out
                  </NavLink>
                </li>
              </div>
            </div>
          ) : (
            <div className={css.navBlock}>
              <li className={css.navigationElementHeader}>
                <NavLink to="/auth" className={css.navigationLink}>
                  Sign Up
                </NavLink>
              </li>
              <li className={css.navigationElementHeader}>
                <NavLink to="/login" className={css.navigationLink}>
                  Log In
                </NavLink>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
