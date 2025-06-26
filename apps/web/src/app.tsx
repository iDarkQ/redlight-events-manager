import { Routes, Route, BrowserRouter } from "react-router";
import { Home } from "~/pages/home";
import "~/assets/styles/global.css";
import { Layout } from "~/components/layout";
import { Login } from "~/pages/login";
import { NotificationProvider } from "~/providers/notification";

export const App = () => (
                  <Route index element={<Home />} />
                  <Route path="login" element={<Login />} />
                  <Route path="event" element={<Event />} />
                </Routes>
              </Layout>
);
