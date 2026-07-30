import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AboutNick from "./pages/AboutNick";

// Single-page CV site. The permalink is /about-nick; root and any other
// path land on the same page rather than a dead end.
const App = () => (
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Routes>
      <Route path="/about-nick" element={<AboutNick />} />
      <Route path="*" element={<Navigate to="/about-nick" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
