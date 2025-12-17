import './App.css';
import { useState } from 'react';
import Footer from './components/FooterContent';
import NavigationBar from './components/NavigationBar';
import { Outlet, useLoaderData, useLocation } from "react-router-dom";

function App() {
  
  const loadedUser = useLoaderData();
  const [user, setUser] = useState(loadedUser);


  return (
    <>
      <div>
        {user && <NavigationBar user={user} setUser={setUser} />}
        <Outlet context={{user, setUser}} />
      </div>
    </>
  )
}

export default App