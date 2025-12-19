import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import Container from "react-bootstrap/esm/Container";
import WatchlistCard from "../components/WatchlistCard";
import { getWatchlists, createWatchlist } from '../api/http';

function AllWatchlistPage() {

    const [watchlists, setWatchlists] = useState([]);

    useEffect(() => {
        async function loadWatchlists() {
        try {
        const data = await getWatchlists();
        setWatchlists(data);
        } catch (error) {
        console.log("loading watchlist", error)
        }
    }
    loadWatchlists();
    }, [])

    async function handleCreateWatchlist(name) {
        const created = await createWatchlist(name);
        setWatchlists((prev) => [...prev, created]);
    }

    return (
    <div>
        <Container>
        <Row className="mb-3">
            <Col xs={12} md={6} lg={4}>
            <WatchlistCard onCreate={handleCreateWatchlist} />
            </Col>
        </Row>
        <Row xs={1} md={2} lg={3} className="g-4">
            {watchlists.map((w) => (
            <Col key={w.id}>
                <Card border="dark" className="h-100">
                <Card.Body className="d-flex align-items-center justify-content-center">
                    <Card.Title className="text-center mb-0">
                    <Link to={`/watchlists/${w.id}`}>{w.name}</Link>
                    </Card.Title>
                </Card.Body>
                </Card>
            </Col>
            ))}
        </Row>
        </Container>
    </div>
    );
};

export default AllWatchlistPage;