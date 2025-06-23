import { Routes, Route, BrowserRouter } from "react-router";
import { Home } from "~/pages/home";
import "~/assets/styles/global.css";

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  </BrowserRouter>
);
