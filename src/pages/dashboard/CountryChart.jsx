import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { Card, Dropdown } from 'react-bootstrap';
import { useEffect, useLayoutEffect, useState } from "react";
import { APICore } from '../../helpers/api/apiCore';
import { useDispatch, useSelector } from "react-redux";
// import { getMarket } from "../../redux/actions";

const api = new APICore();



const CountryChart = ({ isEdit }) => {
  const dispatch = useDispatch();
  // const market = useSelector((state)=> state.Market.markets);
  useLayoutEffect(() => {
    am4core.addLicense("ch-custom-attribution");
    let chart = am4core.create("countryChart", am4charts.PieChart);
    
    // api.get(`/api/country_graph`,{})
    // .then(res=>{
    //     chart.data=res.data;
    // }) 

  chart.dataSource.url = "pie_chart_data.json";
  chart.innerRadius = am4core.percent(40);
  // let pieSeries = chart.series.push(new am4charts.PieSeries());   
  // pieSeries.dataFields.value = "litres";
  // pieSeries.dataFields.category = "country";
  // pieSeries.slices.template.stroke = am4core.color("#fff");
  // pieSeries.slices.template.strokeWidth = 2;
  // pieSeries.slices.template.strokeOpacity = 1;
  // pieSeries.labels.template.disabled = true;
  // pieSeries.ticks.template.disabled = true;
  // pieSeries.colors.step = 2;
 

  let pieSeries2 = chart.series.push(new am4charts.PieSeries());
  pieSeries2.dataFields.value = "amount";
  pieSeries2.dataFields.category = "country";
  pieSeries2.slices.template.stroke = am4core.color("#fff");
  pieSeries2.slices.template.strokeWidth = 2;
  pieSeries2.slices.template.strokeOpacity = 1;

  }, []);
  
  // useEffect(()=>{
  //   dispatch(getMarket(0,1));
  // },[])
  return (
    <Card className={isEdit ? 'mb-0':'mb-3'}>
      <Card.Body>
          <Dropdown className="float-end" align="end">
              <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                  <i className="mdi mdi-dots-vertical"></i>
              </Dropdown.Toggle>
              
          </Dropdown>

          <h4 className="header-title mb-0">Country</h4>
          
          <div id="countryChart" style={{ width: "100%", height: "350px" }}></div>
          {/* {!market.length > 0 &&
          <p>No country data available</p>} */}
         
      </Card.Body>
  </Card>
    
  )
}

export default CountryChart