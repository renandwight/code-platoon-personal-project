import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { formatTableHeader } from "../utils/tableformat";


// function prettyLabel(key) {
//   return key
//     .replaceAll("_", " ")
//     .toLowerCase()
//     .replace(/\b\w/g, (c) => c.toUpperCase());
// }

function WatchlistItemsTable({ items, onRemove, removingId }) {
  if (!items?.length) return (<div className="mt-3">
    No Tickers added yet. Go to {" "}
    <Link to="/backtest" className="text-decoration-underline">
    Backtest
    </Link>
    </div>);

  const columns = Object.keys(items[0]).filter((k) => k !== "id");

  return (
    <div className="mt-3 fs-6">
      <Table responsive bordered hover size="sm" className="watchlistitems">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{formatTableHeader(col)}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col}>{row[col] ?? "-"}</td>
              ))}
              <td>
                <Button
                  size="sm"
                  variant="outline-danger"
                  disabled={removingId === row.id}
                  onClick={() => onRemove(row.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default WatchlistItemsTable;
