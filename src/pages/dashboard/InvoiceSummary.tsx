import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Card } from 'react-bootstrap';


const InvoiceSummary = ({summaryList}:any) => {
    const apexOpts: ApexOptions = {
        chart: {
            type: 'donut',
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            formatter: (val: string) => {
                                return val;
                            },
                        },
                        value: {
                            show: true,
                            formatter: (val: string) => {
                                return val;
                            },
                        },
                    },
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: ['#4fc6e1', '#6658dd', '#ebeff2'],
        legend: {
            show: false,
        },
        labels: ['Draft', 'Approve', 'Paid'],
        tooltip: {
            enabled: false,
        },
    };

    const apexData = summaryList?.invoice_summary;

    return (
        <>
            <Card>
                <Card.Body>
                    

                    <h4 className="header-title mb-3">Invoice Summary</h4>

                    <div dir="ltr">
                        <Chart
                            options={apexOpts}
                            type="donut"
                            series={apexData}
                            height={380}
                            className="apex-charts mt-4"
                        />
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default InvoiceSummary;
