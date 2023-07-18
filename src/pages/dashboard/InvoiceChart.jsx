import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { Card, Dropdown } from 'react-bootstrap';
import {  useEffect, useLayoutEffect, useState } from "react";
import { APICore } from '../../helpers/api/apiCore';
import { useDispatch, useSelector } from "react-redux";
// import { getAssetType } from "../../redux/actions";

const api = new APICore();


const InvoiceChart = () => {
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const d = new Date();
  const [month,setMonth] = useState(d.getMonth());

  useLayoutEffect(()=>{
    am4core.addLicense("ch-custom-attribution");
  let chart = am4core.create("invoiceChart", am4charts.PieChart);
  
  api.get(`/api/dashboard/invoice_summary?month=${month+1}`)
      .then(res => {
          
          if(res?.data?.status){
            
            chart.data = res?.data?.data;
          }
          
      })
      .catch(err => {
          console.log(err);
          
      })
  chart.dataSource.url = "pie_chart_data.json";
  let pieSeries = chart.series.push(new am4charts.PieSeries());   
  pieSeries.dataFields.value = "amount";
  pieSeries.dataFields.category = "asset_type";
  chart.innerRadius = am4core.percent(40);
  pieSeries.slices.template.stroke = am4core.color("#4a2abb");
  pieSeries.slices.template.strokeWidth = 0;
  pieSeries.slices.template.strokeOpacity = 1;
  chart.legend = new am4charts.Legend();
  let marker = chart.legend.markers.template.children.getIndex(0);
  marker.cornerRadius(12, 12, 12, 12);
  marker.strokeWidth = 0;
  let markerTemplate = chart.legend.markers.template;
  markerTemplate.width = 10;
  markerTemplate.height = 10;
  },[month])
  

  const monthChangeHandler = (e) =>{
    setMonth(e);
    
  }

  return (
    <Card className='mb-3'>
      <Card.Body>
        
          <div className="d-flex justify-content-between">

          <h4 className="header-title mb-0">Invoice Summary of {months[month]}, {d.getFullYear()}</h4>
          <Dropdown onSelect={(e)=>monthChangeHandler(e)}>
            
              <Dropdown.Toggle split variant='primary' >
                  Select Month  <i className="mdi mdi-chevron-down"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                  <Dropdown.Item eventKey="0" active={month === 0}>January</Dropdown.Item>
                  <Dropdown.Item eventKey="1" active={month === 1}>February</Dropdown.Item>
                  <Dropdown.Item eventKey="2" active={month === 2}>March</Dropdown.Item>
                  <Dropdown.Item eventKey="3" active={month === 3}>April</Dropdown.Item>
                  <Dropdown.Item eventKey="4" active={month === 4}>May</Dropdown.Item>
                  <Dropdown.Item eventKey="5" active={month === 5}>June</Dropdown.Item>
                  <Dropdown.Item eventKey="6" active={month === 6}>July</Dropdown.Item>
                  <Dropdown.Item eventKey="7" active={month === 7}>August</Dropdown.Item>
                  <Dropdown.Item eventKey="8" active={month === 8}>September</Dropdown.Item>
                  <Dropdown.Item eventKey="9" active={month === 9}>October</Dropdown.Item>
                  <Dropdown.Item eventKey="10" active={month === 10}>November</Dropdown.Item>
                  <Dropdown.Item eventKey="11" active={month === 11}>December</Dropdown.Item>
              </Dropdown.Menu>
          </Dropdown>
          </div>
          
          
          <div id="invoiceChart" style={{ width: "100%", height: "350px" }}></div>
          
          {/* {!asset_type.length > 0 &&
          <p>No asset type available</p>} */}
         
      </Card.Body>
  </Card>
    
  )
}

export default InvoiceChart