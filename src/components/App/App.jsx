import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Homepage from "../Homepage/Homepage.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import SuperHeroes from "../SuperHeroes/SuperHeroes.jsx";
import AddSuperhero from "../AddSuperhero/AddSuperhero.jsx";
import css from "./App.module.css";

function App() {
  return (
    <div className={css.body}>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/superherosColection" element={<SuperHeroes />} />
        <Route path="/CURDsuperhero" element={<AddSuperhero />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
