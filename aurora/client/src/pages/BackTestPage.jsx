import Row from "react-bootstrap/esm/Row";
import ChartCard from "../components/ChartCard";
import SummaryCard from "../components/SummaryCard";

function BackTestPage() {


    
    return (
        <div>
            <h1 className="backtests">Backtests</h1>
            <Row>
                <ChartCard />
            </Row>
            <Row>
                <SummaryCard />
            </Row>
        </div>
    );
};

export default BackTestPage;