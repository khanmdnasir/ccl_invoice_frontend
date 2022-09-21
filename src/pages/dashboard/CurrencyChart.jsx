import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { Card, Dropdown } from 'react-bootstrap';
import { useLayoutEffect } from "react";
import { APICore } from '../../helpers/api/apiCore';
import { useSelector } from "react-redux";

const api = new APICore();




const CurrencyChart = ({ isEdit }) => {
  const currency = useSelector((state)=> state.Currency.currency);
  useLayoutEffect(() => {
    am4core.addLicense("ch-custom-attribution");
    let chart = am4core.create("currencyChart", am4charts.PieChart);
    
    // api.get(`/api/currency_graph`,{})
    // .then(res=>{
    //     chart.data=res.data;
    // }) 

  chart.dataSource.url = "pie_chart_data.json";
  let pieSeries = chart.series.push(new am4charts.PieSeries());   
  pieSeries.dataFields.value = "amount";
  pieSeries.dataFields.radiusValue = "amount";
  pieSeries.dataFields.category = "currency";
  pieSeries.slices.template.stroke = am4core.color("#fff");
  pieSeries.slices.template.strokeWidth = 2;
  pieSeries.slices.template.strokeOpacity = 1;
  pieSeries.colors.step = 2;
  chart.legend = new am4charts.Legend();
  let marker = chart.legend.markers.template.children.getIndex(0);
  marker.cornerRadius(12, 12, 12, 12);
  marker.strokeWidth = 0;
  let markerTemplate = chart.legend.markers.template;
  markerTemplate.width = 10;
  markerTemplate.height = 10;

  }, []);
  

  return (
    <Card className={isEdit ? 'mb-0':'mb-3'}>
      <Card.Body>
          <Dropdown className="float-end" align="end">
              <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                  <i className="mdi mdi-dots-vertical"></i>
              </Dropdown.Toggle>
              
          </Dropdown>

          <h4 className="header-title mb-0">Currency</h4>
          
          <div id="currencyChart" style={{ width: "100%", height: "350px" }}></div>
          {!currency.length > 0 &&
          <p>No currency data available</p>}
         
      </Card.Body>
  </Card>
    
  )
}

export default CurrencyChart