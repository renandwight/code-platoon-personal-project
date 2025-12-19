import Table from 'react-bootstrap/Table';

function SummaryCard({backtestData}) {

  if (!backtestData) {
    return null;
  }

  const { meta, summary } = backtestData
  const summaryData = Object.entries(summary).map(([key, value])=>({key,value}))

  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>{meta?.ticker ? "Ticker":"_"}</th>
            {summaryData.map(({key}) => (
              <th key={key}>
                {key.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, char => char.toUpperCase())}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{meta?.ticker ?? "-"}</td>
            {summaryData.map(({key,value}) => (
              <td key={key}>{value}</td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default SummaryCard;