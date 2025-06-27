import { Routes, Route, BrowserRouter } from "react-router";
import { CookiesProvider } from "react-cookie";
import { Home } from "~/pages/home";
import "~/assets/styles/global.css";
import { Layout } from "~/components/layout";
import { Login } from "~/pages/login";
import { Event } from "~/pages/event";
import { NotificationProvider } from "~/providers/notification";
import { UserProvider } from "~/providers/user";
import { EventProvider } from "~/providers/event";

export const App = () => (
  <CookiesProvider>
    <UserProvider>
      <EventProvider>
        <NotificationProvider>
          <BrowserRouter>
              <Layout>
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="login" element={<Login />} />
                  <Route path="event" element={<Event />} />
                </Routes>
              </Layout>
            </BrowserRouter>
        </NotificationProvider>
      </EventProvider>
    </UserProvider>
  </CookiesProvider>
);
