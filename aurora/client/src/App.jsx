import './App.css';
import Menu from './components/navbar';
import { Outlet } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function App() {

  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App