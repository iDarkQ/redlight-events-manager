import { Routes, Route, BrowserRouter } from "react-router";
import { Home } from "~/pages/home";
import "~/assets/styles/global.css";
import { Layout } from "~/components/layout";

export const App = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);
