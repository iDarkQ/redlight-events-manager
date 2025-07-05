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
// import { ProtectedRoute } from "~/components/protected-route";

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
                    <Route path="view/:id" element={<Event state="view" />} />

                    {/* <Route element={<ProtectedRoute />}> */}
                      <Route path="create" element={<Event state="create" />} />
                      <Route path="edit/:id" element={<Event state="edit" />} />
                    {/* </Route> */}
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
