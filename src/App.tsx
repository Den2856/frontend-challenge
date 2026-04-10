import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import FavoriteCatsPage from "./pages/FavoriteCatsPage";
import NotFoundPage from "./pages/NotFoundPage";


export default function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/frontend-challenge/" element={<Home />} />
        <Route path="/favorite-cats" element={<FavoriteCatsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}