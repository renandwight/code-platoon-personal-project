import App from "./App";
import { getUser } from "./api/auth";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import AboutPage from "./pages/AboutPage";
import BackTestPage from "./pages/BackTestPage";
import NotFoundPage from "./pages/NotFoundPage";
import AWatchlistPage from "./pages/AWatchlistPage";
import { createBrowserRouter } from "react-router-dom";
import AllWatchlistPage from "./pages/AllWatchlistPage";
import RegisterLoginPage from "./pages/RegisterLoginPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: getUser,
        errorElement: <ErrorPage />,
        
        children: [
            {
                index: true,
                element: <RegisterLoginPage />,
            },
            {
                path: "home",
                element: <HomePage />,
            },
            {
                path: "about",
                element: <AboutPage />,
            },
            {
                path: "backtest",
                element: <BackTestPage />,
            },
            {
                path: "watchlists",
                element: <AllWatchlistPage />,
            },
            {
                path: "watchlists/:watchlistId",
                element: <AWatchlistPage />,
            },
            {
                path: "*",
                element: <NotFoundPage />,
            },
        ],
    },
]);

export default router;