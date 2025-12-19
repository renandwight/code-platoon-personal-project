import { fetchMarket } from '../api/api';
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { getWatchlists } from "../api/http";
import { useEffect, useState } from "react";
import ChartCard from "../components/ChartCard";
import SummaryCard from "../components/SummaryCard";
import BacktestForm from "../components/BacktestForm";
import { useOutletContext, Link } from "react-router-dom";
import SaveToWatchlist from "../components/SaveToWatchlist";

function BackTestPage() {

    const { backtestData, setBacktestData } = useOutletContext()
    const [hasWatchlist, sethasWatchlist] = useState(null)

    useEffect(() => {
        setBacktestData(null);
    }, [setBacktestData]);

    const runBackTest = async({ticker, cash}) => {
        try {
        const data = await fetchMarket(ticker, cash);
        setBacktestData(data)
        } catch (error) {
        console.log({"Ticker Data Error": error})
        }
    };

    useEffect(()=> {
        async function checkWatchlists() {
            try {
                const exist = await getWatchlists();
                sethasWatchlist((exist?.length??0)>0);
            } catch (error) {
                sethasWatchlist(false);
                console.log(error, "Watchlist does not exit.")
            }
        }
        checkWatchlists()
    }, []);

    return (
        <div>
            <h1 className="backtests">Backtests</h1>
            {!hasWatchlist && (
                <div className="text-warning fs-5 fw-semibold mb-3">
                    <Link to="/watchlists" className="text-decoration-underline">
                        Lets create your first Watchlist
                    </Link>
                </div>
            )}

            <Row>
                <BacktestForm startBackTest={runBackTest} disableForm={!hasWatchlist}/>
            </Row>
            <Row>
                <ChartCard backtestData={backtestData}/>
            </Row>
            <Row>
                <SummaryCard backtestData={backtestData}/>
            </Row>
            <Row>
                <Col>
                    <SaveToWatchlist backtestData={backtestData} />
                </Col>
            </Row>
        </div>
    );
};

export default BackTestPage;