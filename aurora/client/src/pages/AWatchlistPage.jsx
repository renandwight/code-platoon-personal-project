import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WatchlistItemsTable from "../components/WatchlistItemsTable";

import {
  getAWatchlist,
  renameWatchlist,
  deleteAWatchlist,
  getWatchlistItems,
  removeWatchlistItem,
} from "../api/http";

function AWatchlistPage() {
  const { watchlistId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading")
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    if (!watchlistId) return;

    (async () => {
      setStatus("loading");
      try {
        const [wl, wlItems] = await Promise.all([
          getAWatchlist(watchlistId),
          getWatchlistItems(watchlistId),
        ]);
        setName(wl?.name ?? "");
        setItems(wlItems ?? []);
        setStatus("idle");
      } catch (error) {
        console.log(error, "Failed to load.")
        setStatus("idle");
      }
    })();
  }, [watchlistId]);

  async function handleRename(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      console.log("Name cannot be empty.");
    }
    try {
      const updated = await renameWatchlist(watchlistId, { name: trimmed });
      setName(updated?.name ?? trimmed);
    } catch (error) {
      console.log(error, "Failed to rename watchlist.");
    } 
  }

  async function handleDelete() {
    try {
      await deleteAWatchlist(watchlistId);
      navigate("/watchlists");
    } catch (error) {
      console.log(error, "Failed to delete watchlist.");
    }
  }

  async function handleRemoveItem(itemId) {
    setRemovingId(itemId)
    try {
      await removeWatchlistItem(watchlistId, itemId);
      setItems((prev) => prev.filter((i) => i.id !== itemId));
    } catch (error) {
      console.log(error, "Failed to remove ticker.");
    } finally {
      setRemovingId(null)
    }
  }

  if (!name) return <div>{"Watchlist not found."}</div>;

  return (
    <div style={{paddingTop: "35px"}}>
      <Card border="dark" style={{ maxWidth: 1120, margin: "0 auto"}}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Form onSubmit={handleRename} className="d-flex gap-2 mb-3">
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button type="submit">
              Rename
            </Button>
          </Form>
          <Button variant="danger" onClick={handleDelete}>
            Delete Watchlist
          </Button>
        </Card.Body>
        <WatchlistItemsTable items={items} onRemove={handleRemoveItem} removingId={removingId}/>
      </Card>
    </div>
  );
}
export default AWatchlistPage;