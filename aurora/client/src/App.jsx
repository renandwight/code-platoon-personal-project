import './App.css';
import { useEffect, useState } from 'react';
import Footer from './components/FooterContent';
import Container from "react-bootstrap/Container";
import NavigationBar from './components/NavigationBar';
import { Outlet, Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";

// import { test_connection } from './utilities';

function App() {
  
  // useEffect(() => {
  //   test_connection()
  // }, [])


  return (
    <>
      <div>
        <NavigationBar />
        <Outlet />
      </div>
    </>
  )
}

export default App