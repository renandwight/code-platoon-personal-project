import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function WatchlistCard({onCreate}) {

  const [name, setName] = useState("");

  async function handleCreate(e) {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await onCreate(name.trim());
      setName("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <Row>
      <h1 className="mywatchlists">Watchlists</h1>
    </Row>
    <Row>
      <Col>
          <Form onSubmit={handleCreate}>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Watchlist name"
                className="mb-2"
              />
              <Button type="submit" className="w-100">
                Create
              </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default WatchlistCard;