import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { Card, Dropdown } from 'react-bootstrap';
import { useEffect, useLayoutEffect } from "react";
import { APICore } from '../../helpers/api/apiCore';
import { useDispatch, useSelector } from "react-redux";
// import { getIndustry } from "../../redux/actions";

const api = new APICore();




const IndustryChart = ({ isEdit }) => {
  const dispatch = useDispatch();
  // const industry = useSelector((state)=> state.Industry.industries);
  useLayoutEffect(() => {
    am4core.addLicense("ch-custom-attribution");
    let chart = am4core.create("industryChart", am4charts.PieChart);
    
    
    // api.get(`/api/industry_graph`,{})
    // .then(res=>{
    //     chart.data=res.data;
    // }) 

  chart.dataSource.url = "pie_chart_data.json";
  let pieSeries = chart.series.push(new am4charts.PieSeries());   
  pieSeries.dataFields.value = "amount";
  pieSeries.dataFields.category = "industry";
  pieSeries.labels.template.disabled = true;
  pieSeries.ticks.template.disabled = true;
  chart.legend = new am4charts.Legend();
  let markerTemplate = chart.legend.markers.template;
  markerTemplate.width = 10;
  markerTemplate.height = 10;

  }, []);
  
  // useEffect(()=>{
  //   dispatch(getIndustry(0,1))
  // },[])
  return (
    <Card className={isEdit ? 'mb-0':'mb-3'}>
      <Card.Body>
          <Dropdown className="float-end" align="end">
              <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                  <i className="mdi mdi-dots-vertical"></i>
              </Dropdown.Toggle>
              
          </Dropdown>

          <h4 className="header-title mb-0">Industry</h4>
          
          <div id="industryChart" style={{ width: "100%", height: "350px" }}></div>
          {/* {!industry.length > 0 &&
          <p>No industry data available</p>} */}
         
      </Card.Body>
  </Card>
    
  )
}

export default IndustryChart