import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

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
              <linearGradient id="equityColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ff9f68" stopOpacity={1} />
                <stop offset={off} stopColor="#ff9f68" stopOpacity={0.1} />
                <stop offset={off} stopColor="#be4f0c" stopOpacity={0.1} />
                <stop offset="1" stopColor="#be4f0c" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="benchmarkColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#9ca3af" stopOpacity={1} />
                <stop offset={off} stopColor="#9ca3af" stopOpacity={0.1} />
                <stop offset={off} stopColor="#393939" stopOpacity={0.1} />
                <stop offset="1" stopColor="#393939" stopOpacity={1} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="Equity" stroke="#ec7f37" fill="url(#equityColor)" />
            <Area type="monotone" dataKey="benchmark" stroke="#393939" fill="url(#benchmarkColor)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default ChartCard;
