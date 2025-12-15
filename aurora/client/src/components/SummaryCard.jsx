import Table from 'react-bootstrap/Table';

import sampleMarketData from "../data/markets.json";

function SummaryCard() {

  const { meta, summary } = sampleMarketData

  const summaryData = Object.entries(summary).map(([key, value])=>({key,value}))

  return (
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
          {summaryData.map(({value}) => (
            <td key={value}>{value}</td>
          ))}
        </tr>
      </tbody>
    </Table>

  );
};

export default SummaryCard;