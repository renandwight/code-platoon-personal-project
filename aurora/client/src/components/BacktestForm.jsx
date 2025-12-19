import { useState } from 'react';
import { Form, Button, InputGroup, Container, Row } from 'react-bootstrap';

function BacktestForm({startBackTest, disableForm}) {

  const [ticker, setTicker] = useState('');
  const [cash, setCash] = useState('');

  const handleBackTest = async (e) => {
      e.preventDefault();

    startBackTest({
      ticker: ticker.trim().toUpperCase(),
      cash: Number(cash),
    });
  };

  return (
    <Row>
      <Container style={{ maxWidth: "320px", marginTop: "1rem" }}>
        <Form onSubmit={handleBackTest}>
          <Form.Group controlId="formCash">
            <Form.Label>Cash Amount</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                disabled={disableForm}
                placeholder="e.g. 10000"
                type="number"
                min="0"
                step="0.01"
                value={cash}
                onChange={(e) => setCash(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formTicker" className="mt-3">
            <Form.Label>Ticker Symbol</Form.Label>
            <Form.Control
              disabled={disableForm}
              type="text"
              placeholder="e.g. CPTN"
              value={ticker}
              onChange={(e) =>
                setTicker(
                  e.target.value.toUpperCase().replace(/[^A-Z]/g, "")
                )
              }
              maxLength={5}
              required
            />
          </Form.Group>

          <Button type="submit" disabled={disableForm} className="mt-4 w-100">
            Run Backtest
          </Button>
        </Form>
      </Container>
    </Row>
  );
}

export default BacktestForm;
