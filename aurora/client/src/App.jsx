import './App.css';
import { useState } from 'react';
import NavigationBar from './components/NavigationBar';
import { Outlet, useLoaderData } from "react-router-dom";

function App() {
  
  const loadedUser = useLoaderData();
  const [user, setUser] = useState(loadedUser);
  const [backtestData, setBacktestData] = useState(null);
  
  return (
    <>
      <div>
        {user && <NavigationBar user={user} setUser={setUser} />}
        <Outlet context={{user, setUser, backtestData, setBacktestData}} />
      </div>
    </>
  )
}

export default App