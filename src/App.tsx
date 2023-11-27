import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Blogs from "./components/Blogs";
import { useStore } from "./hooks/useStore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Blogs endpoint="users/:id/feed" />,
    // children: [],
  },
  {
    path: "/blogs",
    element: <Blogs endpoint="blogs/" />,
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
  const setUserId = useStore(state => state.setUserId);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token) {
      setToken(token);
    }
    if (userId) {
      setUserId(userId);
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
