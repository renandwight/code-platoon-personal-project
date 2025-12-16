import Row from "react-bootstrap/esm/Row";
import NewsCard from "../components/NewsCard";
import Container from "react-bootstrap/esm/Container";

function HomePage() {



    return (
        <>
        <div>
            <Row>
                <Container>
                    <NewsCard />
                </Container>
            </Row>
        </div>
        </>
    );
};

export default HomePage;