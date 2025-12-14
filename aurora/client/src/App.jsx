import './App.css';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from 'react';
import { Outlet, Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { test_connection } from './utilities';

function App() {
  
  useEffect(() => {
    test_connection()
  }, [])


  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App