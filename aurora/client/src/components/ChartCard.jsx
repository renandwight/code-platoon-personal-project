import Button from 'react-bootstrap/Button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function ChartCard({backtestData}) {

  if (!backtestData) {
    return null;
  }

  const data = [...backtestData.equity]

  const gradientOffset = () => {
    const dataMax = Math.max(...data.map(i => i.Equity));
    const dataMin = Math.min(...data.map(i => i.Equity));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();

  return (
    <>
      <div style={{ width: '100%', height: 360, minWidth: 0}}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis width="Equity" />
            <Tooltip />
            <defs>
              <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="green" stopOpacity={1} />
                <stop offset={off} stopColor="green" stopOpacity={0.1} />
                <stop offset={off} stopColor="red" stopOpacity={0.1} />
                <stop offset="1" stopColor="red" stopOpacity={1} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="Equity" stroke="#000" fill="url(#splitColor)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* <div>
        <Button variant="outline-info">Info</Button>
      </div> */}
    </>
  );
};

export default ChartCard;
