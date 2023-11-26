import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import { useStore } from "./hooks/useStore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
]);

function App() {
  const setToken = useStore(state => state.setToken);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <RouterProvider
      router={router}
      // fallbackElement={<LandingPage />}
    />
  );
}

export default App;
