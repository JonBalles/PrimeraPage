import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Eden } from "./Eden";

function Placeholder({ title }: { title: string }) {
  return (
    <div className="placeholder">
      <h2>{title}</h2>
      <p>Próximamente...</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Eden />} />

        <Route
          path="/juegos"
          element={<Placeholder title="Juegos 🕹" />}
        />

        <Route
          path="/cumpleanos"
          element={<Placeholder title="Cumpleaños 🎈" />}
        />

        <Route
          path="/libros"
          element={<Placeholder title="Prestamo de libros 📚" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;