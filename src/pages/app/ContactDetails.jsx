import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
  InputGroup,
  Modal,
  Dropdown,
  Breadcrumb,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import { useLocation } from "react-router-dom";
import { withSwal } from "react-sweetalert2";

import Pagination from "../../components/CustomPagination";
import classNames from "classnames";
// components
import PageTitle from "../../components/PageTitle";
import { useSelector, useDispatch } from "react-redux";
import { APICore } from "../../helpers/api/apiCore";
import {
  getContactInvoice,
  getContactDetails,
  getContactInvoiceSetting,
  updateContactInvoiceSetting,
  setContactSuccessAlert,
  getContactService,
  updateContact,
  getClientBalance,
  getCountry,
  getAllKam,
  getDueInvoices,
  getRepeatingInvoice,
  getContactPayment,
  getContactRepeatingInvoice,
  getContact,
} from "../../redux/actions";
import { format } from "date-fns";
const api = new APICore();


const customCapitalize = (client_mode) => {
    const arr = client_mode.split('-')
    for(var i = 0; i < arr.length; i++){
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    const str2 = arr.join(" ");
    return str2
}
/* status column render */
const StatusColumn = ({ row }) => {
  return (
    <React.Fragment>
      <span
        style={{ width: "80px", fontSize: "12px" }}
        className={classNames("badge", {
          "bg-soft-success text-success": row.original.status === "success",
          "bg-soft-danger text-danger": row.original.status === "canceled",
        })}
      >
        {row.original.status.charAt(0).toUpperCase() +
          row.original.status.slice(1)}
      </span>
    </React.Fragment>
  );
};

const InvoiceStatusColumn = ({ row }) => {
  let status = row.original.status.split("_");

  for (var i = 0; i < status.length; i++) {
    status[i] = status[i].charAt(0).toUpperCase() + status[i].slice(1);
  }
  status = status.join(" ");

  return (
    <React.Fragment>
      <span
        style={{ width: "5rem", fontSize: 12 }}
        className={classNames("badge", {
          "bg-soft-primary text-primary": row.original.status === "draft",
          "bg-soft-secondary text-secondary": row.original.status === "waiting",
          "bg-soft-success text-success": row.original.status === "approve",
          "bg-soft-warning text-warning":
            row.original.status === "partial_paid",
          "bg-soft-info text-info": row.original.status === "paid",
        })}
      >
        {status}
      </span>
    </React.Fragment>
  );
};

// action column render

const columns = [


  {
    Header: "Payment No",
    accessor: "payment_no",
    sort: true,
  },
  {
    Header: "Payment Type",
    accessor: "payment_type.name",
    sort: true,
  },
  {
    Header: "Date",
    accessor: "payment_date",
    sort: true,
  },
  {
    Header: "Amount",
    accessor: "amount",
    sort: true,
    Cell: (row) => {
      const scurrency = useSelector(state => state.Currency.selectedCurrency)
      return (
        <div>
          {scurrency?.symbol}{row?.row?.original?.amount !== null
            ? (row?.row?.original?.amount).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      );
    },
  },

  {
    Header: "Status",
    accessor: "status",
    sort: true,
    Cell: StatusColumn,
  },
];

const invoicesColumns = [
  {
    Header: "Invoice No",
    accessor: "invoice_no",
    sort: true,
  },
  {
    Header: "Date",
    accessor: "date",
    sort: true,
  },
  {
    Header: "Due Date",
    accessor: "due_date",
    sort: true,
  },

  {
    Header: "Total Amount",
    accessor: "total_amount",
    sort: true,
    Cell: (row) => {
      const scurrency = useSelector(state => state.Currency.selectedCurrency)
      return (
        <div>
          {scurrency?.symbol}{row?.row?.original?.total_amount !== null
            ? (row?.row?.original?.total_amount).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      );
    },
  },
  {
    Header: "Status",
    accessor: "status",
    sort: true,
    Cell: InvoiceStatusColumn,
  },
];

export const RepeatingInvoiceStatusColumn = withSwal(({ row, swal }) => {
  /*
   *   modal handeling
   */
  const dispatch = useDispatch();

  /*
  handle form submission
  */
  const draftsOptions = (
    <>
      <option selected={row.original.status === "draft"} value="draft">
        Draft
      </option>
      <option selected={row.original.status === "approve"} value="approve">
        Approved
      </option>
    </>
  );

  const approvesOptions = (
    <>
      <option selected={row.original.status === "approve"} value="approve">
        Approved
      </option>
    </>
  );

  var dropDown = (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Form.Select
        style={{ width: "70%" }}
        onChange={(e) => handleShow(row, e)}
      >
        {row.original.status === "draft" ? draftsOptions : null}
        {row.original.status === "approve" ? approvesOptions : null}
      </Form.Select>
    </div>
  );

  const handleShow = (row, e) => {
    const value = e.target.value;
    const data = {
      status: value,
    };
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28bb4b",
        cancelButtonColor: "#f34e4e",
        confirmButtonText: "Yes, change it!",
      })
      .then(function (result) {
        if (result.value) {
          api
            .update(
              `/api/change-repeating-invoice-status/?id=${row.original.id}`,
              data
            )
            .then((res) => {
              if (res) {
                swal.fire(
                  "Updated!",
                  "Repeating Invoice Status has been Updated.",
                  "success"
                );
              } else {
                swal.fire(
                  "Updated!",
                  "Repeating Invoice Status has not Updated.",
                  "warning"
                );
              }
              // setTimeout(() => {
              //     refreshPage();
              // }, 600);
              dispatch(getRepeatingInvoice(10, 1));
            })
            .catch((err) => {
              console.log("err", err);
              dispatch(getRepeatingInvoice(10, 1));
              swal.fire({
                title: err,
              });
            });
        } else if (result.dismiss === "cancel") {
          dispatch(getRepeatingInvoice(10, 1));
        }
      })
      .catch((err) => {
        console.log("swal fire err", err);
      });
  };

  return <>{dropDown}</>;
});

const repeatingInvoiceColumns = [
  {
    Header: "Invoice No",
    accessor: "invoice_no",
    sort: true,
  },
  {
    Header: "Day",
    accessor: "date",
    sort: true,
  },
  {
    Header: "Due Day",
    accessor: "due_date",
    sort: true,
  },
  {
    Header: "Repeat Day",
    accessor: "repeat_date",
    sort: true,
  },
  
  {
    Header: "Total Amount",
    accessor: "total_amount",
    sort: true,
    Cell: (row) => {
      const scurrency = useSelector(state => state.Currency.selectedCurrency)
      return (
        <div>
          {scurrency?.symbol}{row?.row?.original?.total_amount !== null
            ? (row?.row?.original?.total_amount).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      );
    },
  },
  {
    Header: "Status",
    accessor: "status",
    sort: true,
    Cell: RepeatingInvoiceStatusColumn,
  },
];

const servicesColumns = [
  {
    Header: "Service Type",
    accessor: "service_type",
    sort: true,
  },
  {
    Header: "Client Mode",
    accessor: "contact_mode",
    sort: true,
    Cell: (row) => {
      return (
        <div>
          {row?.row?.original?.contact_mode !== null
            ? customCapitalize(row?.row?.original?.contact_mode)
            : 0}
        </div>
      );
    },
  },
  {
    Header: "Payment Terms",
    accessor: "payment_terms",
    sort: true,
    Cell: (row) => {
      return (
        <div>
          {row?.row?.original?.payment_terms !== null
            ? ((row?.row?.original?.payment_terms).charAt(0).toUpperCase() + (row?.row?.original?.payment_terms).slice(1))
            : 0}
        </div>
      );
    },
  },
  {
    Header: "Tax Rate",
    accessor: "tax_rate",
    sort: true,
    Cell: (row) => {
      return (
        <div>
          {row?.row?.original?.tax_rate !== null
            ? (row?.row?.original?.tax_rate).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : 0}%
        </div>
      );
    },
  },
  {
    Header: "Unit Price",
    accessor: "unit_price",
    sort: true,
    Cell: (row) => {
      const scurrency = useSelector(state => state.Currency.selectedCurrency)
      return (
        <div>
          {scurrency?.symbol}{row?.row?.original?.unit_price !== null
            ? (row?.row?.original?.unit_price).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      );
    },
  },
];

const ContactDetails = withSwal(({ swal }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [contactId, setContactId] = useState();
  const [loadings, setLoading] = useState(false);
  const [invoicePageSize, setInvoicePageSize] = useState(10);
  const [repeatingInvoicePageSize, setRepeatingInvoicePageSize] = useState(10);
  const [paymentPageSize, setPaymentPageSize] = useState(10);
  const [servicePageSize, setServicePageSize] = useState(10);
  const [invoiceSetting, setInvoiceSetting] = useState({
    auto_approve: false,
    auto_invoice_send: false,
    reminder_service: false,
    contact_id: contactId,
    reminder_settings: {
      is_include_public_link: false,
      is_include_pdf_link: false,
      minimum_invoice_amount: 0,
      reminder_type: "",
      days: [],
    },
  });

  const invoice_list = useSelector((state) => state.Invoice.invoices);
  const repeating_invoice_list = useSelector(
    (state) => state.RepeatingInvoice.repeating_invoices
  );
  const service_list = useSelector((state) => state.Service.services);
  const payment_list = useSelector((state) => state.Payment.payments);
  const invoice_previous = useSelector((state) => state.Invoice.previous);
  const invoice_next = useSelector((state) => state.Invoice.next);
  const repeating_invoice_previous = useSelector(
    (state) => state.RepeatingInvoice.previous
  );
  const repeating_invoice_next = useSelector(
    (state) => state.RepeatingInvoice.next
  );
  const service_previous = useSelector((state) => state.Service.previous);
  const service_next = useSelector((state) => state.Service.next);
  const payment_previous = useSelector((state) => state.Payment.previous);
  const payment_next = useSelector((state) => state.Payment.next);
  const invoice_current_page = useSelector(
    (state) => state.Invoice.current_page
  );
  const invoice_total_page = useSelector((state) => state.Invoice.total_page);
  const invoice_active = useSelector((state) => state.Invoice.active);
  const repeating_invoice_current_page = useSelector(
    (state) => state.RepeatingInvoice.current_page
  );
  const repeating_invoice_total_page = useSelector(
    (state) => state.RepeatingInvoice.total_page
  );
  const repeating_invoice_active = useSelector(
    (state) => state.RepeatingInvoice.active
  );
  const service_current_page = useSelector(
    (state) => state.Service.current_page
  );
  const service_total_page = useSelector((state) => state.Service.total_page);
  const service_active = useSelector((state) => state.Service.active);
  const payment_current_page = useSelector(
    (state) => state.Payment.current_page
  );
  const payment_total_page = useSelector((state) => state.Payment.total_page);
  const payment_active = useSelector((state) => state.Payment.active);
  const [paymentData, setPaymentData] = useState("");

  const contact_details = useSelector((state) => state.Contact.contact_details);
  console.log("contact_details",contact_details)
  const invoice_setting = useSelector((state) => state.Contact.invoice_setting);
  const loading = useSelector((state) => state.Contact.loading);
  const invoiceLoading = useSelector((state) => state.Invoice.loading);
  const [pageSize, setPageSize] = useState(10);
  const repeatingInvoiceLoading = useSelector(
    (state) => state.RepeatingInvoice.loading
  );
  const serviceLoading = useSelector((state) => state.Service.loading);
  const paymentLoading = useSelector((state) => state.Payment.loading);
  const invoice_setting_error = useSelector(
    (state) => state.Contact.invoice_setting_error
  );
  const invoice_setting_success = useSelector(
    (state) => state.Contact.invoice_setting_success
  );
  const success = useSelector((state) => state.Contact.success);

  const [showClientEditModal, setShowClientEditModal] = useState(false);
  const onCloseModal = () => setShowClientEditModal(false);

  const scurrency = useSelector(state => state.Currency.selectedCurrency)

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");



  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (fromDate === "" || toDate === "") {
      await api
        .get("/api/client-ledger", { client_id: contactId })
        .then((response) => {
          setLoading(false);
         
         
        })
        .catch((err) => {
          const errorMsg = err?.data?.detail;
          setLoading(false);
          
        });
    } else {
      await api
        .get("/api/client-ledger", {
          client_id: contactId,
          start_date: format(new Date(fromDate), "yyyy-MM-dd"),
          end_date: format(new Date(toDate), "yyyy-MM-dd"),
        })
        .then((response) => {
          setLoading(false);
          
          
        })
        .catch((err) => {
          const errorMsg = err?.data?.detail;
          setLoading(false);
          
        });
    }
  };

  useEffect(() => {
    dispatch(getContact(0, 1));
  }, []);
  useEffect(() => {
    const state = location.state;
    if (state) {
      setContactId(parseInt(state));
      localStorage.setItem("client_id", parseInt(state));
    } else {
      let client_id = localStorage.getItem("client_id");
      setContactId(parseInt(client_id));
    }
    dispatch(getCountry());
    dispatch(getAllKam());
  }, []);

  useEffect(() => {
    if (success !== "") {
      onCloseModal();
    }
    setTimeout(() => {
      dispatch(setContactSuccessAlert(""));
    }, 2000);
  }, [success]);

  const visitInvoicePage = (page) => {
    dispatch(getContactInvoice(contactId, invoicePageSize, page));
  };

  const invoice_previous_number = () => {
    dispatch(getContactInvoice(contactId, invoicePageSize, invoice_previous));
  };

  const invoice_next_number = () => {
    dispatch(getContactInvoice(contactId, invoicePageSize, invoice_next));
  };
  const visitRepeatingInvoicePage = (page) => {
    dispatch(
      getContactRepeatingInvoice(contactId, repeatingInvoicePageSize, page)
    );
  };

  const repeating_invoice_previous_number = () => {
    dispatch(
      getContactRepeatingInvoice(
        contactId,
        repeatingInvoicePageSize,
        repeating_invoice_previous
      )
    );
  };

  const repeating_invoice_next_number = () => {
    dispatch(
      getContactRepeatingInvoice(
        contactId,
        repeatingInvoicePageSize,
        repeating_invoice_next
      )
    );
  };
  const visitServicePage = (page) => {
    dispatch(getContactInvoice(contactId, servicePageSize, page));
  };

  const service_previous_number = () => {
    dispatch(getContactService(contactId, servicePageSize, service_previous));
  };

  const service_next_number = () => {
    dispatch(getContactService(contactId, servicePageSize, service_next));
  };
  const visitPaymentPage = (page) => {
    dispatch(getContactPayment(contactId, paymentPageSize, page));
  };

  const payment_previous_number = () => {
    dispatch(getContactPayment(contactId, paymentPageSize, payment_previous));
  };

  const payment_next_number = () => {
    dispatch(getContactPayment(contactId, paymentPageSize, payment_next));
  };

  useEffect(() => {
    if (contactId !== undefined && contactId !== null) {
      dispatch(getContactInvoice(contactId, invoicePageSize, 1));
      dispatch(
        getContactRepeatingInvoice(contactId, repeatingInvoicePageSize, 1)
      );
      dispatch(getContactPayment(contactId, paymentPageSize, 1));
      dispatch(getContactDetails(contactId));
      dispatch(getContactInvoiceSetting(contactId));
      dispatch(getContactService(contactId, servicePageSize, 1));
      dispatch(getClientBalance(contactId));
      dispatch(getDueInvoices(contactId));
      dispatch(getContact(contactId, pageSize, 1));
      dispatch(updateContact(contactId));
    }
  }, [contactId]);

  useEffect(() => {
    const paymentwithDate = payment_list.map((item) => {
      let date = item.payment_date.split("T")[0];
      item.payment_date = date;
      return item;
    });
    setPaymentData(paymentwithDate);
  }, [payment_list]);

  // useEffect(() => {
  //   dispatch(getPayment(pageSize, 1));
  // }, [pageSize]);

  useEffect(() => {
    if (invoice_setting !== undefined) {
      setInvoiceSetting(invoice_setting);
    }
  }, [invoice_setting]);

  const mystyle = {
    width: "12rem",
  };

  const invoiceSettingChange = (e) => {
    const data = { ...invoiceSetting };
    const target = e.target.name;
    const value = e.target.checked;
    data[target] = value;

    setInvoiceSetting(data);
  };

  const invoiceReminderSettingChange = (e) => {
    const reminder_settings = { ...invoiceSetting.reminder_settings };
    const target = e.target.name;
    let value = null;
    if (target === "minimum_invoice_amount" || target === "reminder_type") {
      value = e.target.value;
    } else {
      value = e.target.checked;
    }

    reminder_settings[target] = value;
    const data = { ...invoiceSetting };
    data["reminder_settings"] = reminder_settings;

    setInvoiceSetting(data);
  };

  const [show, setShow] = useState(false);
  const [statementShow, setStatementShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleStatementClose = () => setStatementShow(false);
  const handleShow = () => setShow(true);
  const handleStatementShow = () => setStatementShow(true);
  const [inputDate, setInputDate] = useState("");

  const daySubmit = () => {
    if (inputDate !== "" && parseInt(inputDate) > 0) {
      const reminder_settings = { ...invoiceSetting.reminder_settings };
      const days = reminder_settings?.days;

      let newDays = [];
      if (days !== undefined) {
        newDays = [...days];
      }
      if (!newDays.includes(inputDate)) {
        newDays.push(inputDate);
      }
      reminder_settings["days"] = newDays;
      const data = { ...invoiceSetting };
      data["reminder_settings"] = reminder_settings;
      setInvoiceSetting(data);

      setInputDate("");
      setShow(false);
    }
  };

  const deleteDay = (value) => {
    const reminder_settings = { ...invoiceSetting.reminder_settings };
    const days = reminder_settings?.days;

    let newDays = [...days];
    if (days !== undefined && newDays.includes(value)) {
      const index = newDays.indexOf(value);

      if (index !== -1) {
        newDays.splice(index, 1);
      }
    }

    reminder_settings["days"] = newDays;
    const data = { ...invoiceSetting };
    data["reminder_settings"] = reminder_settings;
    setInvoiceSetting(data);
  };

  const finalSubmit = () => {
    const newData = { ...invoiceSetting };
    newData["contact_id"] = contactId;
    newData["reminder_settings"]["contact_id"] = contactId;
    dispatch(updateContactInvoiceSetting(newData));
  };

  return (
    <>
   

      <div className="page-title-box" style={{ paddingTop: "10px" }}>
        <div className="page-title-left">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Qorum</Breadcrumb.Item>
            <Breadcrumb.Item href="/app/client">Clients</Breadcrumb.Item>
            <Breadcrumb.Item active>Client Details</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <h4
          className="page-titles"
          style={{
            fontSize: "1.25rem",
            marginBottom: "40px",
            color: "#323a46",
          }}
        >
          {contact_details?.name}
        </h4>
      </div>

      <div className="d-flex justify-content-between">
        <div>
          <Dropdown style={{ marginBottom: "30px" }}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic ">
              New <i className="mdi mdi-chevron-down"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link}
                to={{
                  pathname: "/app/invoice_form",
                  state: { contactId: contactId },
                }}
              >
          
                  Invoice
                
              </Dropdown.Item>
              <Dropdown.Item as={Link}
              to={{
                pathname: "/app/repeating_invoice_form",
                state: { contactId: contactId },
              }}
              >
                
                  Repeating Invoice
                
              </Dropdown.Item>
              <Dropdown.Item as={Link}
              to={{
                pathname: "/app/service_form",
                state: { services: service_list, contactId: contactId },
              }}
              >
                {" "}
                
                  Service
                
              </Dropdown.Item>
              <Dropdown.Item as={Link}
              to={{
                pathname: "/app/payment_form",
                state: { contactId: contactId },
              }}
              >
                {" "}
                
                 Payment
               
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
          <Dropdown style={{ marginBottom: "30px" }}>
            <Dropdown.Toggle variant="primary" id="client_statement_dropdown">
              Options <i className="mdi mdi-chevron-down"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to=
              {{
                pathname: "/app/edit_client_form",
                state: {
                  contactId: contactId,
                  name: contact_details?.name,
                },
              }}
              >
                
                  Edit
               
              </Dropdown.Item>
              <Dropdown.Item onClick={handleStatementShow}

              >
               
                  Client Statement
                
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/*  Statement modal */}
      <div>
        <Modal
          show={statementShow}
          onHide={handleStatementClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={(e) => handleSearch(e)} className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>From</Form.Label>
                <Form.Control
                  type="date"
                  name="from_date"
                  onChange={(e) => setFromDate(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>To</Form.Label>
                <Form.Control
                  type="date"
                  name="to_date"
                  onChange={(e) => setToDate(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Link
                type="submit"
                className="mt-2 btn btn-primary waves-effect waves-light me-2"
                to={{
                  pathname: "/app/client_statement",
                  state: {
                    contactId: contactId,
                    start_date: fromDate,
                    end_date: toDate,
                  },
                }}
              >
                Submit
              </Link>
            </form>
          </Modal.Body>
          {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
        </Modal>
      </div>

      <Row>
        <Col md={9} xl={9}>
          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <div className="d-flex justify-content-between">
                    <p style={{ marginBottom: "0px !important" }}>
                      Invoice List
                    </p>
                  </div>
                </Card.Header>

                <Card.Body>
                  {invoiceLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <>
                      {invoice_list?.length > 0 ? (
                        <>
                          <Table
                            columns={invoicesColumns}
                            data={invoice_list}
                            pageSize={invoicePageSize}
                            isSortable={true}
                            isDetails={true}
                            pathName="/app/invoice_details"
                            pagination={false}
                            isSearchable={true}
                            tableClass="table-nowrap table-hover"
                            searchBoxClass=""
                          />
                          <Pagination
                            visitPage={visitInvoicePage}
                            previous_number={invoice_previous_number}
                            next_number={invoice_next_number}
                            total_page={invoice_total_page}
                            current_page={invoice_current_page}
                            active={invoice_active}
                          />
                        </>
                      ) : (
                        "No data available!"
                      )}
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <div className="d-flex justify-content-between">
                    <p style={{ marginBottom: "0px !important" }}>
                      Repeating Invoice List
                    </p>
                  </div>
                </Card.Header>

                <Card.Body>
                  {repeatingInvoiceLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <>
                      {repeating_invoice_list?.length > 0 ? (
                        <>
                          <Table
                            columns={repeatingInvoiceColumns}
                            data={repeating_invoice_list}
                            pageSize={repeatingInvoicePageSize}
                            isSortable={true}
                            isDetails={true}
                            pathName="/app/invoice_details"
                            pagination={false}
                            isSearchable={true}
                            tableClass="table-nowrap table-hover"
                            searchBoxClass=""
                          />
                          <Pagination
                            visitPage={visitRepeatingInvoicePage}
                            previous_number={repeating_invoice_previous_number}
                            next_number={repeating_invoice_next_number}
                            total_page={repeating_invoice_total_page}
                            current_page={repeating_invoice_current_page}
                            active={repeating_invoice_active}
                          />
                        </>
                      ) : (
                        "No data available!"
                      )}
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <div className="d-flex justify-content-between">
                    <p style={{ marginBottom: "0px !important" }}>
                      Payment List
                    </p>
                  </div>
                </Card.Header>

                <Card.Body>
                  {paymentLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <>
                      {paymentData?.length > 0 ? (
                        <>
                          <Table
                            columns={columns}
                            data={paymentData}
                            pageSize={paymentPageSize}
                            isDetails={true}
                            pathName="/app/payment_details"
                            isSortable={true}
                            pagination={false}
                            isSearchable={true}
                            tableClass="table-nowrap table-hover"
                            searchBoxClass=""
                          />
                          <Pagination
                            visitPage={visitPaymentPage}
                            previous_number={payment_previous_number}
                            next_number={payment_next_number}
                            total_page={payment_total_page}
                            current_page={payment_current_page}
                            active={payment_active}
                          />
                        </>
                      ) : (
                        "No payments available!"
                      )}
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <div className="d-flex justify-content-between">
                    <p style={{ marginBottom: "0px !important" }}>
                      Services List
                    </p>
                  </div>
                </Card.Header>

                <Card.Body>
                  {serviceLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <>
                      {service_list?.length > 0 ? (
                        <>
                          <Table
                            columns={servicesColumns}
                            data={service_list}
                            pageSize={servicePageSize}
                            isDetails={true}
                            pathName="/app/service_details"
                            isSortable={true}
                            pagination={false}
                            isSearchable={true}
                            tableClass="table-nowrap table-hover"
                            searchBoxClass=""
                          />
                          <Pagination
                            visitPage={visitServicePage}
                            previous_number={service_previous_number}
                            next_number={service_next_number}
                            total_page={service_total_page}
                            current_page={service_current_page}
                            active={service_active}
                          />
                        </>
                      ) : (
                        "No data available!"
                      )}
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>

        <Col md={3} xl={3}>
          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <h5>Contact Details</h5>
                </Card.Header>
                <Card.Body>
                  <p style={{ fontSize: "14px" }}>
                    {" "}
                    Click{" "}
                    <b>
                      ' Options <i class="bi bi-arrow-right"></i> Edit{" "}
                      <i class="bi bi-arrow-right"></i> '
                    </b>{" "}
                    for show details or change
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card>
                <Card.Header>

                  <h5>Account Details</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <p style={{fontSize: '16px'}}>
                    <b style={{marginRight: '5px'}}>Balance</b> <span>{scurrency?.symbol}{contact_details?.balance?.toLocaleString(undefined, {maximumFractionDigits:2})}</span> 
                    </p>
                    <p style={{fontSize: '16px'}}>
                    <b style={{marginRight: '5px'}}>Due</b> <span>{scurrency?.symbol}{contact_details?.due?.toLocaleString(undefined, {maximumFractionDigits:2})}</span> 
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <h5>Invoice Setting</h5>

                </Card.Header>
                <Card.Body>
                  <div className="container">
                    {!loading &&
                      invoice_setting_error &&
                      !invoice_setting_success && (
                        <Alert variant="danger" className="my-2">
                          {invoice_setting_error}
                        </Alert>
                      )}

                    {!loading &&
                      invoice_setting_success &&
                      !invoice_setting_error && (
                        <Alert variant="success" className="my-2">
                          {invoice_setting_success}
                        </Alert>
                      )}
                    <InputGroup className="mb-3">
                      <InputGroup.Text style={mystyle}>
                        Auto Approve
                      </InputGroup.Text>
                      <InputGroup.Checkbox
                        checked={invoiceSetting?.auto_approve}
                        name="auto_approve"
                        onChange={(e) => invoiceSettingChange(e)}
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroup.Text style={mystyle}>
                        Auto Invoice Send
                      </InputGroup.Text>
                      <InputGroup.Checkbox
                        checked={invoiceSetting?.auto_invoice_send}
                        name="auto_invoice_send"
                        onChange={(e) => invoiceSettingChange(e)}
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroup.Text style={mystyle}>
                        Reminder Service
                      </InputGroup.Text>
                      <InputGroup.Checkbox
                        name="reminder_service"
                        checked={invoiceSetting?.reminder_service}
                        onChange={(e) => invoiceSettingChange(e)}
                      />
                    </InputGroup>

                    {invoiceSetting?.reminder_service ? (
                      <div style={{ marginLeft: "1rem" }}>
                        <InputGroup className="mb-3">
                          <InputGroup.Text style={mystyle}>
                            Is Inclued Public Link
                          </InputGroup.Text>
                          <InputGroup.Checkbox
                            name="is_include_public_link"
                            checked={
                              invoiceSetting?.reminder_settings
                                ?.is_include_public_link
                            }
                            onChange={(e) => invoiceReminderSettingChange(e)}
                          />
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroup.Text style={mystyle}>
                            Is Inclued Pdf Link
                          </InputGroup.Text>
                          <InputGroup.Checkbox
                            name="is_include_pdf_link"
                            checked={
                              invoiceSetting?.reminder_settings
                                ?.is_include_pdf_link
                            }
                            onChange={(e) => invoiceReminderSettingChange(e)}
                          />
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroup.Text style={mystyle}>
                            Minimum Invoice Amount
                          </InputGroup.Text>
                          <Form.Control
                            type="number"
                            name="minimum_invoice_amount"
                            value={
                              invoiceSetting?.reminder_settings
                                ?.minimum_invoice_amount
                            }
                            onChange={(e) => invoiceReminderSettingChange(e)}
                          />
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroup.Text style={mystyle}>
                            Reminder Type
                          </InputGroup.Text>
                          <Form.Check
                            type="radio"
                            name="reminder_type"
                            checked={
                              invoiceSetting?.reminder_settings
                                ?.reminder_type === "due_in"
                            }
                            onChange={(e) => invoiceReminderSettingChange(e)}
                            label="Due In"
                            value="due_in"
                            style={{
                              marginRight: "1rem",
                              marginLeft: "1rem",
                              marginTop: "0.5rem",
                            }}
                          />
                          <Form.Check
                            type="radio"
                            name="reminder_type"
                            checked={
                              invoiceSetting?.reminder_settings
                                ?.reminder_type === "over_due"
                            }
                            onChange={(e) => invoiceReminderSettingChange(e)}
                            label="Over Due"
                            value="over_due"
                            style={{ marginRight: "1rem", marginTop: "0.5rem" }}
                          />
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroup.Text style={{ width: "6rem" }}>
                            Days
                          </InputGroup.Text>
                          {invoiceSetting?.reminder_settings?.days?.map(
                            (day) => (
                              <div key={day} style={{ margin: "0 5px" }}>
                                <div>
                                  <InputGroup.Text style={{ width: "6rem" }}>
                                    {day} days{" "}
                                    <i
                                      onClick={() => deleteDay(day)}
                                      style={{
                                        marginLeft: ".8rem",
                                        color: "red",
                                        cursor: "pointer",
                                      }}
                                      className="fe-delete"
                                    ></i>
                                  </InputGroup.Text>
                                </div>
                              </div>
                            )
                          )}
                          <>
                            <Button variant="primary" onClick={handleShow}>
                              Add
                            </Button>

                            <Modal
                              show={show}
                              size="sm"
                              aria-labelledby="contained-modal-title-vcenter"
                              centered
                            >
                              <Modal.Header>
                                <Modal.Title id="contained-modal-title-vcenter">
                                  Add Reminder Days
                                </Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <Form>
                                  <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                  >
                                    <Form.Label>Reminder Type</Form.Label>
                                    <Form.Select
                                      disabled
                                      aria-label="Default select example"
                                    >
                                      <option
                                        selected={
                                          invoiceSetting?.reminder_settings
                                            ?.reminder_type === "due_in"
                                        }
                                        value="due_in"
                                      >
                                        Due In
                                      </option>
                                      <option
                                        selected={
                                          invoiceSetting?.reminder_settings
                                            ?.reminder_type === "over_due"
                                        }
                                        value="over_due"
                                      >
                                        Over Due
                                      </option>
                                    </Form.Select>
                                  </Form.Group>
                                  <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                  >
                                    <Form.Label>Day</Form.Label>
                                    <Form.Control
                                      onChange={(e) => {
                                        setInputDate(e.target.value);
                                      }}
                                      type="number"
                                    />
                                  </Form.Group>
                                </Form>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="secondary"
                                  onClick={handleClose}
                                >
                                  Close
                                </Button>
                                <Button
                                  variant="primary"
                                  onClick={() => daySubmit()}
                                >
                                  Submit
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </>
                        </InputGroup>
                      </div>
                    ) : (
                      <></>
                    )}

                    <Button variant="primary" onClick={() => finalSubmit()}>
                      Submit
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
});
export default ContactDetails;
