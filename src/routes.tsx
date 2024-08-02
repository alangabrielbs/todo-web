import { createBrowserRouter } from "react-router-dom";
import { TodoPage } from "./pages/todo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoPage />,
  },
]);
