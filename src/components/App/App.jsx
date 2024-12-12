import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import css from "./App.module.css";
import {lazy, Suspense, useEffect} from "react";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../redux/auth/authSlice";
const Homepage = lazy(() => import("../../pages/Homepage/Homepage.jsx"));
const NotFound = lazy(() => import("../../pages/NotFound/NotFound.jsx"));
const SuperHeroes = lazy(() =>
  import("../../pages/SuperHeroes/SuperHeroes.jsx")
);
const AddSuperhero = lazy(() =>
  import("../../pages/AddSuperhero/AddSuperhero.jsx")
);
const Auth = lazy(() => import("../../pages/Auth/Auth.jsx"));
const LogIn = lazy(() => import("../../pages/LogIn/LogIn.jsx"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");
    if (token) {
      dispatch(setAccessToken({ token, persistType: "local" }));
    }
  }, [dispatch]);

  return (
    <div className={css.body}>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/superherosColection" element={<SuperHeroes />} />
          <Route path="/CURDsuperhero" element={<AddSuperhero />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
