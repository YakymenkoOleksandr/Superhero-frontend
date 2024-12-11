import css from "./Heaer.module.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAccessToken } from "../../redux/authSlice";

function Header() {
  const accessToken = useSelector((state) => state.auth.accessToken); // Redux токен
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://superhero-backend-vrcc.onrender.com/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.status === 204) {
        dispatch(clearAccessToken()); // Очищення Redux токену
        navigate("/"); // Перенаправлення на головну сторінку
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

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
        {accessToken ? (
          <nav className={css.logOutBlock}>
            <div>
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
          </nav>
        ) : (
          <></>
        )}
      </nav>
    </div>
  );
}

export default Header;
