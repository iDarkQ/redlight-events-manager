import { Routes, Route, BrowserRouter } from "react-router";
import { Home } from "~/pages/home";
import "~/assets/styles/global.css";
import { Layout } from "~/components/layout";
import { Login } from "~/pages/login";
import { NotificationProvider } from "~/providers/notification";

export const App = () => (
  <NotificationProvider>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </NotificationProvider>
);
