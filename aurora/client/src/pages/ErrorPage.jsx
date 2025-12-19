import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";

function ErrorPage() {



    return (
        <Container style={{ minHeight: "70vh", display: "grid", placeItems: "center", textAlign: "center", padding: 24 }}>
            <h1>Something went wrong</h1>
            <p>An unexpected error occured</p>
            <Link to="/">Return Home</Link>
        </Container>
    );
};

export default ErrorPage;