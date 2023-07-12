import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';
import { ApexOptions } from 'apexcharts';

const SalesAnalyticsChart = ({summaryList}:any) => {
    // console.log("summaryList",summaryList)
    const apexOpts: ApexOptions = {
        chart: {
            height: 378,
            type: 'line',
            offsetY: 10,
        },
        stroke: {
            width: [2, 3],
        },
        plotOptions: {
            bar: {
                columnWidth: '50%',
            },
        },
        colors: ['#1abc9c', '#4a81d4'],
        dataLabels: {
            enabled: true,
            enabledOnSeries: [1],
        },
        labels: summaryList?.sales_analytics?.date_list,
        xaxis: {
            type: 'datetime',
        },
        legend: {
            offsetY: 7,
        },
        grid: {
            padding: {
                bottom: 20,
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'horizontal',
                shadeIntensity: 0.25,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 0.75,
                opacityTo: 0.75,
                stops: [0, 0, 0],
            },
        },
        yaxis: [
            {
                title: {
                    text: 'Net Revenue',
                },
            },
            {
                opposite: true,
                title: {
                    text: 'Number of Invoices',
                },
            },
        ],
    };

    const series = [
        {
            name: 'Revenue',
            type: 'column',
            data: summaryList?.sales_analytics?.total_revenue,
        },
        {
            name: 'Sales',
            type: 'line',
            data: summaryList?.sales_analytics?.total_invoice,
        },
    ];

    return (
        <>
            <Card>
                <Card.Body>
                    

                    <h4 className="header-title mb-3">Current Month Sale Summary</h4>

                    <div dir="ltr">
                        <Chart
                            options={apexOpts}
                            series={series}
                            type="line"
                            height={360}
                            className="apex-charts mt-4"
                        />
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default SalesAnalyticsChart;
