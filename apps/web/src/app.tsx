import { Routes, Route, BrowserRouter } from "react-router";
import { Home } from "~/pages/home";
import "~/assets/styles/global.css";
import { Layout } from "~/components/layout";
import { NotificationProvider } from "~/providers/notification";

export const App = () => (
  <NotificationProvider>
    <BrowserRouter>
      <Layout>
      </Layout>
    </BrowserRouter>
  </NotificationProvider>
);
