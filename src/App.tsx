import { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Blogs from "./components/Blogs";
import { useStore } from "./hooks/useStore";
import BlogPage from "./components/BlogPage";

function App() {
  const setToken = useStore(state => state.setToken);
  const setUserId = useStore(state => state.setUserId);
  const { token } = useStore();

  const router = createBrowserRouter([
    {
      path: "/",
      element: token ? <Navigate to="/feed" /> : <Navigate to="/blogs" />,
    },
    {
      path: "/feed",
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
    {
      path: "blogs/:id",
      element: <BlogPage />,
    },
  ]);

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
