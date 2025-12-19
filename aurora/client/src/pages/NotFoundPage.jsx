import NotFoundImage from "../assets/404.svg";
import Container from 'react-bootstrap/Container';


function NotFoundPage() {



    return (
        <Container className="d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: "70vh" }}>
        <img
            src={NotFoundImage}
            alt="404 Page Not Found"
        />
        </Container>
    );
};

export default NotFoundPage;