import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./pages/sign-in";
import { Summary } from "./pages/summary";
import { CallbackAuth } from "./pages/callback-auth";
import { UserSessionProvider } from "./context/user-authenticate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/summary",
    element: <Summary />,
  },
  {
    path: "/callback",
    element: <CallbackAuth />,
  },
]);

export function App() {
  return (
    <UserSessionProvider>
      <RouterProvider router={router} />
    </UserSessionProvider>
  );
}
