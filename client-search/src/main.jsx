//* LIB
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

//* IMPORT
import "./App.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import LoadingPage from "@/pages/loading.jsx";
import router from "@/routes/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} fallbackElement={<LoadingPage />} />
);
