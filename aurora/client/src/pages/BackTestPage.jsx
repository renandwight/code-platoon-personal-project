import { useState } from "react";
import { fetchMarket } from '../api/calls';
import Row from "react-bootstrap/esm/Row";
import ChartCard from "../components/ChartCard";
import SummaryCard from "../components/SummaryCard";
import BacktestForm from "../components/BacktestForm";

function BackTestPage() {

    const [backtestData, setBacktestData] = useState(null)

    const runBackTest = async({ticker, cash}) => {
        try {
        const data = await fetchMarket(ticker, cash);
        setBacktestData(data)
        } catch (error) {
        console.log({"Ticker Data Error": error})
        }
    };

    return (
        <div>
            <h1 className="backtests">Backtests</h1>
            <Row>
                <BacktestForm startBackTest={runBackTest}/>
            </Row>
            <Row>
                <ChartCard backtestData={backtestData}/>
            </Row>
            <Row>
                <SummaryCard backtestData={backtestData}/>
            </Row>
        </div>
    );
};

export default BackTestPage;