import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Homepage from "../Homepage/Homepage.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import SuperHeroes from "../SuperHeroes/SuperHeroes.jsx";
import AddSuperhero from "../AddSuperhero/AddSuperhero.jsx";
import Auth from "../Auth/Auth.jsx";
import css from "./App.module.css";
import LogIn from "../LogIn/LogIn.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../redux/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
    if (token) {
      dispatch(setAccessToken({ token, persistType: "local" })); // Токен буде відновлено
    }
  }, [dispatch]);

  return (
    <div className={css.body}>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/superherosColection" element={<SuperHeroes />} />
        <Route path="/CURDsuperhero" element={<AddSuperhero />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
