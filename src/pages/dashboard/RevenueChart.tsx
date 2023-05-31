import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Line, defaults as ChartjsDefaults } from 'react-chartjs-2';

// components
import ChartStatistics from '../../components/ChartStatistics';

const RevenueChart = ({summaryList, scurrency}:any) => {
    ChartjsDefaults.color = '#8391a2';
    ChartjsDefaults.scale.grid.color = '#8391a2';
    console.log("summaryList",summaryList)

    // chart data
    const lineChartData = {
        labels: summaryList?.monthly_received_payment ? summaryList?.monthly_received_payment[0]:[],
        datasets: [
            {
                label: `Payment(${scurrency.symbol})`,
                backgroundColor: '#00a551',
                borderColor: '#00a551',
                data: summaryList?.monthly_received_payment ? summaryList?.monthly_received_payment[1]:[],
                tension: 0.4,
                fill: {
                    target: 'origin',
                    above: 'rgb(0, 165, 81, 0.3)',
                },
            },
            // {
            //     label: 'Previous Week',
            //     fill: true,
            //     backgroundColor: 'transparent',
            //     borderColor: '#00a551',
            //     borderDash: [5, 5],
            //     data: [412, 581, 661, 821, 1075],
            //     tension: 0.4,
            // },
        ],
    };

    // chart options
    const lineChartOpts = {
        bezierCurve: false,
        maintainAspectRatio: false,
        tooltips: {
            intersect: false,
        },
        hover: {
            intersect: true,
        },
        plugins: {
            filler: {
                propagate: false,
            },
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(0,0,0,0.05)',
                },
            },
            y: {
                ticks: {
                    stepSize: summaryList?.monthly_received_payment ? summaryList?.monthly_received_payment[2]:0,
                },
                display: true,
                borderDash: [5, 5],
                grid: {
                    color: 'rgba(0,0,0,0)',
                    fontColor: '#fff',
                },
            },
        },
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <div className="float-end d-none d-md-inline-block">
                        <div className="btn-group mb-2">
                            {/* <button type="button" className="btn btn-xs btn-secondary">
                                Today
                            </button>
                            <button type="button" className="btn btn-xs btn-light">
                                Weekly
                            </button>
                            <button type="button" className="btn btn-xs btn-light">
                                Monthly
                            </button> */}
                        </div>
                    </div>

                    <h4 className="header-title">Payment Receive</h4>

                    <Row className="mt-4 text-center">
                        {/* <Col className="col-4">
                            <ChartStatistics title="Target" icon="fe-arrow-down" stats="$7.8k" variant="danger" />
                        </Col>
                        <Col className="col-4">
                            <ChartStatistics title="Last week" icon="fe-arrow-up" stats="$1.4k" variant="success" />
                        </Col>
                        <Col className="col-4">
                            <ChartStatistics title="Last Month" icon="fe-arrow-down" stats="$15k" variant="danger" />
                        </Col> */}
                    </Row>

                    <div style={{ height: '300px' }} className="mt-3 chartjs-chart">
                        <Line data={lineChartData} options={lineChartOpts} />
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default RevenueChart;
