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
    let publicUrls = ["/", "/about", "/register"];
    let isPublic = publicUrls.includes(location.pathname);
     if (!user && !isPublic) {
      navigate("/", {replace:true});
    }
  }, [location.pathname, user, navigate]);
  
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