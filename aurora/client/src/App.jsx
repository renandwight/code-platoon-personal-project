import './App.css';
import { useEffect, useState } from 'react';
import NavigationBar from './components/NavigationBar';
import { Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom";

function App() {
  
  const location = useLocation();
  const navigate = useNavigate();
  const loadedUser = useLoaderData();
  const [user, setUser] = useState(loadedUser);
  const [backtestData, setBacktestData] = useState(null);

  useEffect(()=> {
    let nonAuthPath = ["/", "/about", "/register"];
    let isAuth = nonAuthPath.includes(location.pathname);
    if (user && isAuth) {
      navigate("/backtest");
    } else if (!user && !isAuth) {
      navigate("/");
    }
  }, [location.pathname, user]);
  
  return (
    <>
      <div>
        <NavigationBar user={user} setUser={setUser} />
        <Outlet context={{user, setUser, backtestData, setBacktestData}} />
      </div>
    </>
  )
}

export default App