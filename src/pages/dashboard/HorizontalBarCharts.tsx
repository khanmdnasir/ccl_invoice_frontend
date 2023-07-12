import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';
import { ApexOptions } from 'apexcharts';

const HorizontalBarCharts = ({summaryList}:any) => {
    // console.log("summaryList",summaryList)
    const apexOpts: ApexOptions = {
        chart: {
          type: 'bar',
          height: 440,
          stacked: true
        },
        colors: ['#008FFB', '#FF4560'],
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '80%',
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 1,
          colors: ["#fff"]
        },
        
        grid: {
          xaxis: {
            lines: {
              show: false
            }
          }
        },
        yaxis: {
          min: -5,
          max: 5,
          title: {
            // text: 'Age',
          },
        },
        tooltip: {
          shared: false,
          x: {
            formatter: function (val:any) {
              return val
            }
          },
          y: {
            formatter: function (val:any) {
              return Math.abs(val) + "%"
            }
          }
        },
        title: {
          text: 'Top 10 client due and paid'
        },
        xaxis: {
          categories: summaryList?.top_client_summary?.client_list,
          title: {
            text: 'Percent'
          },
          labels: {
            formatter: function (val:any) {
              return Math.abs(Math.round(val)) + "%"
            }
          }
        
      },
    
    
    };

    const series = [{
        name: 'Paid',
        data: summaryList?.top_client_summary?.paid_list
      },
      {
        name: 'Due',
        data: summaryList?.top_client_summary?.due_list
      }
      ];

    return (
        <>
            <Card>
                <Card.Body>
                    

                    <h4 className="header-title mb-3">Client Summary</h4>

                    <div dir="ltr">
                        <Chart
                            options={apexOpts}
                            series={series}
                            type="bar"
                            height={360}
                            className="apex-charts mt-4"
                        />
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default HorizontalBarCharts;
