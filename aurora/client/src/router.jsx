import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BackTestPage from "./pages/BackTestPage";
import AllWatchlistPage from "./pages/AllWatchlistPage";
import AWatchlistPage from "./pages/AWatchlistPage";
import ErrorPage from "./pages/ErrorPage";
import NotFoundPage from "./pages/NotFoundPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        
        children: [
            {
                index: true,
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
                path: "watchlist",
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