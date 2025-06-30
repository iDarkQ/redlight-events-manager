import { Routes, Route, BrowserRouter } from "react-router";
import { CookiesProvider } from "react-cookie";
import { Home } from "~/pages/home";
import "~/assets/styles/global.css";
import { Layout } from "~/components/layout";
import { Login } from "~/pages/login";
import { Event } from "~/pages/event";
import { MessageProvider } from "~/providers/message";
import { UserProvider } from "~/providers/user";
import { EventProvider } from "~/providers/event";
import ScrollToTop from "~/hooks/scroll-to-top";

export const App = () => (
  <CookiesProvider>
    <MessageProvider>
      <UserProvider>
        <EventProvider>
          <BrowserRouter>
            <Layout>
              <ScrollToTop>
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="login" element={<Login />} />
                  <Route path="event">
                    <Route path="create" element={<Event state="create" />} />
                    <Route path="view/:id" element={<Event state="view" />} />
                    <Route path="edit/:id" element={<Event state="edit" />} />
                  </Route>
                </Routes>
              </ScrollToTop>
            </Layout>
          </BrowserRouter>
        </EventProvider>
      </UserProvider>
    </MessageProvider>
  </CookiesProvider>
);
