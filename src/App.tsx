import "./global.css";

import { RouterProvider } from "react-router-dom";

import { Background } from "./components/background";
import { router } from "./routes";

export function App() {
  return (
    <>
      <Background />
      <RouterProvider router={router} />
    </>
  );
}
