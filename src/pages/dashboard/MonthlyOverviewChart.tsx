import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Bar, defaults as ChartjsDefaults } from 'react-chartjs-2';



const MonthlyOverviewChart = ({summaryList}:any) => {
    ChartjsDefaults.color = '#8391a2';
    ChartjsDefaults.scale.grid.color = '#8391a2';
    // console.log('summary list',summaryList)
    // chart data
    const barChartData = {
        labels: summaryList?.monthly_summary?.month_list,
        datasets: [
            {
                label: 'Sales',
                backgroundColor: '#F3A407',
                borderColor: '#F3A407',
                hoverBackgroundColor: '#F3A407',
                hoverBorderColor: '#F3A407',
                data: summaryList?.monthly_summary?.invoice_amount_list_by_month,
                barPercentage: 0.7,
                categoryPercentage: 0.5,
            },
            {
                label: 'Payment',
                backgroundColor: '#4a81d4',
                borderColor: '#4a81d4',
                hoverBackgroundColor: '#4a81d4',
                hoverBorderColor: '#4a81d4',
                data: summaryList?.monthly_summary?.revenue_list_by_month,
                barPercentage: 0.7,
                categoryPercentage: 0.5,
            },
            {
                label: 'Due',
                backgroundColor: '#D7110E',
                borderColor: '#D7110E',
                hoverBackgroundColor: '#D7110E',
                hoverBorderColor: '#D7110E',
                data: summaryList?.monthly_summary?.due_list_by_month,
                barPercentage: 0.7,
                categoryPercentage: 0.5,
            },
        ],
    };

    // options
    const barChartOpts = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                ticks: {
                    stepSize: 20,
                },
                grid: {
                    display: false,
                    color: 'rgba(0,0,0,0.05)',
                },
                stacked: false,
            },
            x: {
                stacked: false,
                grid: {
                    color: 'rgba(0,0,0,0.05)',
                },
            },
        },
    };

    return (
        <>
            <Card>
                <Card.Body>
                    

                    <h4 className="header-title">Monthwise Sale Summary of Current Year</h4>

                    

                    <div style={{ height: '390px' }} className="chartjs-chart">
                        <Bar data={barChartData} options={barChartOpts} />
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default MonthlyOverviewChart;
