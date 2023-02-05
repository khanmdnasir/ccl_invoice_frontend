import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { APICore } from "../../helpers/api/apiCore";
import { Link } from "react-router-dom";

// components
import PageTitle from "../../components/PageTitle";
import CCL_Logo from "../../assets/images/Qorum.svg";
const api = new APICore();

// invoice component
const PublicInvoice = () => {
  const [invoice_details, setInvoiceDetails] = useState({});
  //   console.log('invoice_details',invoice_details?.contact_id?.name)
  const [colorchange, setColorChange] = useState("blue-color");
  const urlParams = new URLSearchParams(window.location.search);
  let unique_id = urlParams.get("unique_id");
  // Show only firstname

  let invoiceFirstName = invoice_details.contact_id?.name?.split(" ")[0];
  //    console.log(invoiceFirstName)

  // Color Change

  const changeColor = () => {
    if (colorchange === "green-color") {
      setColorChange("blue-color");
    } else {
      setColorChange("green-color");
    }
  };

  useEffect(() => {
    api
      .get(`/api/public-invoice?unique_id=${unique_id}`)
      .then((res) => {
        // console.log(res);
        if (res.data.success) {
          setInvoiceDetails(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="row justify-content-md-center p-5" id={colorchange}>
      <div className="switch">
        <button className="float-end" onClick={() => changeColor()}>
          Switch Color
        </button>
      </div>
      <div className="col-6 p-4" style={{ background: "white" }}>
        <React.Fragment>
          <div className="m-2 d-flex justify-content-between">
            <div className="head-logo">
              <Link to="/" className="logo">
                <img src={CCL_Logo} alt="" height="100" />
              </Link>
              <div className="address mt-3">
                <address>
                  Level 4, Khansons Center 37, <br />
                  Kawran Bazar Rd, Dhaka 1215
                  <br />
                  akram.hossain@gmail.com
                </address>
              </div>
            </div>
            <div className="right-text">
              <h3 className="">Invoice of {invoiceFirstName}</h3>
              <div className="right-table">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td
                        style={{ textTransform: "uppercase", fontSize: "12px" }}
                      >
                        Invoice No :
                      </td>
                      <td>{invoice_details?.invoice_no}</td>
                    </tr>
                    <tr>
                      <td
                        style={{ textTransform: "uppercase", fontSize: "12px" }}
                      >
                        Date :
                      </td>
                      <td>{invoice_details?.date}</td>
                    </tr>
                    <tr>
                      <td
                        style={{ textTransform: "uppercase", fontSize: "12px" }}
                      >
                        Due Date :
                      </td>
                      <td>{invoice_details?.due_date}</td>
                    </tr>
                    {/* <tr>
                      <td
                        style={{ textTransform: "uppercase", fontSize: "12px" }}
                      >
                        Reference :
                      </td>
                      <td>{invoice_details?.reference}</td>
                    </tr> */}
                    <tr>
                      <td
                        style={{ textTransform: "uppercase", fontSize: "12px" }}
                      >
                        Tax Type :
                      </td>
                      <td>
                        {invoice_details?.tax_type?.charAt(0).toUpperCase() +
                          invoice_details?.tax_type?.slice(1)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Bill To */}

          <div className="bill-to">
            <p className="bill-head">Bill To</p>
            <div bill-table>
              <span>{invoice_details?.contact_id?.name}</span>
              <br />

              <span>City Bank</span>
              <br />

              <span>0145XXXXXXXX</span>
            </div>
          </div>

          <Row>
            <Col>
              {/* <Row className="mt-3">
                    <Col sm={6}>
                    <div>
                      <p>
                        <strong>Contact : </strong>{" "}
                        <span>
                          {" "}
                          &nbsp;&nbsp;&nbsp; {
                            invoice_details?.contact_id?.name
                          }{" "}
                        </span>
                      </p>
                      <p>
                        <strong>Invoice No : </strong>{" "}
                        <span>
                          {" "}
                          <span>{invoice_details?.invoice_no}</span>
                        </span>
                      </p>
                      <p>
                        <strong>Date : </strong>
                        <span>
                          {" "}
                          <span>{invoice_details?.date}</span>
                        </span>
                      </p>
                      <p>
                        <strong>Due Date : </strong>
                        <span>
                          {" "}
                          <span>{invoice_details?.due_date}</span>
                        </span>
                      </p>
                      <p>
                        <strong>Reference : </strong>
                        <span>
                          {" "}
                          <span>{invoice_details?.reference}</span>
                        </span>
                      </p>
                      <p>
                        <strong>Tax Type : </strong>
                        <span>
                          {" "}
                          <span>{invoice_details?.tax_type}</span>
                        </span>
                      </p>
                    </div>
                  </Col>
                    <Col sm={6}>
                  <h6>Address</h6>
                  <address>
                    {invoice_details?.contact_id?.city?.name},{" "}
                    {invoice_details?.contact_id?.country?.name}
                    <br />
                    {invoice_details?.contact_id?.email}
                  </address>
                </Col>
                  </Row> */}

              <Row>
                <Col xs={12}>
                  <div className="table-responsive main-table">
                    <table className="table mt-4 table-centered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Item</th>
                          <th>Quantity</th>
                          <th>Unit Price</th>
                          <th>Discount</th>
                          <th>Account</th>
                          <th>Tax Rate</th>
                          <th className="text-end">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(invoice_details.items || []).map((item, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>
                                <b>{item.item}</b> <br />
                                {item.description}
                              </td>
                              <td>{item.qty}</td>
                              <td>
                                
                              <span style={{ fontSize: "18px" }}>৳</span> {item.unit_price} 
                              </td>
                              <td>{item.discount}</td>
                              <td>{item.account_id.account_name}</td>
                              <td>{item.tax_rate}</td>
                              <td className="text-end"><span style={{ fontSize: "18px" }}>৳</span> {item.total_amount}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col sm={6}></Col>
                <Col sm={6}>
                  <div className="float-end">
                    <p>
                      <b>Sub-total:</b>{" "}
                      <span className="textalign">
                      <span style={{ fontSize: "18px" }}>৳</span> {invoice_details.sub_total}
                      </span>
                    </p>
                    <p>
                      <b>Total Tax:</b>{" "}
                      <span className="textalign">
                        &nbsp; {invoice_details.total_tax}
                      </span>
                    </p>
                    <hr className="line" />
                    <h4>Total Amount: <span style={{ fontSize: "18px" }}>৳</span> {invoice_details.total_amount}</h4>
                  </div>
                  <div className="clearfix"></div>
                </Col>
              </Row>
              <div className="terms" style={{ width: "315px" }}>
                <p className="bill-head">Notes</p>
                <p>This is computer generated invoice signature not required</p>
              </div>

              <div className="last-footer d-flex justify-content-between align-items-center">
                <div className="phone d-flex align-items-center">
                  <p className="icon">
                    <i className=" fas fa-phone-alt"></i>
                  </p>
                  <p>
                    <span>+880255011874</span>
                    <br />
                  </p>
                </div>
                <div className="addresss">
                  <div className="phone d-flex align-items-center">
                    <p className="icons">
                      <i className="fas fa-globe"></i>
                    </p>
                    <p>
                      <Link to="/">www.qoruminvoice.aero</Link>
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </React.Fragment>
      </div>
    </div>
  );
};

export default PublicInvoice;
