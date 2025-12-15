import './App.css';
import Container from "react-bootstrap/Container";
import { useEffect, useState } from 'react';
import { Outlet, Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// import { test_connection } from './utilities';
import NavigationBar from './components/NavigationBar';

// https://github.com/Code-Platoon-Curriculum/curriculum/blob/main/08-Full-Stack-Dep/1-full-stack-auth/full-stack-auth.md

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