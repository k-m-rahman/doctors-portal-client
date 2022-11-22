import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./Routes/Router";
import "react-day-picker/dist/style.css";
import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeProvider";
import { Toaster } from "react-hot-toast";

function App() {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div
      className=" min-h-screen max-w-[1440px] mx-auto"
      data-theme={darkMode ? "dark" : "doctorTheme"}
    >
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
