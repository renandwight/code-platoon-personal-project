import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { getWatchlists, addTicker } from "../api/http"; 
import { flattenTickerSummary } from "../utils/backtest";

function SaveToWatchlist({ backtestData }) {
  const [watchlists, setWatchlists] = useState([]);
  const [selectedWatchlistId, setSelectedWatchlistId] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getWatchlists();
        setWatchlists(data);
      } catch (error) {
        console.log(error, "Failed to load watchlists.");
      }
    }
    load();
  }, []);

  async function handleSave() {

    if (!selectedWatchlistId) {
      console.log("Select a watchlist.");
      return;
    }
    try {
      const tickerSummary = flattenTickerSummary(backtestData);
      await addTicker(selectedWatchlistId, tickerSummary);
    } catch (error) {
      console.log(error, "Failed to save to watchlist.")
    } 
  }

  if (!backtestData) return null;

  return (
    <div className="mt-2">
      <Form.Group className="mb-2">
        <Form.Label>Save results to watchlist</Form.Label>
        <Form.Select
          value={selectedWatchlistId}
          onChange={(e) => setSelectedWatchlistId(e.target.value)}
        >
          <option value="">Select a watchlist...</option>
          {watchlists.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button onClick={handleSave} disabled={!selectedWatchlistId}>
        Save to Watchlist
      </Button>
    </div>
  );
}

export default SaveToWatchlist;
