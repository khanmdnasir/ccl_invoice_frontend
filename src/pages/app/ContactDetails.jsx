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
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import { useLocation } from "react-router-dom";
import { withSwal } from "react-sweetalert2";
import ContactForm from "../Form/ContactForm";

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
  getPayment,
  setPaymentSuccessAlert,
  getAllContact,
  getPaymentTypes,
  getDueInvoices,
  addPayment,
  clearSubmitSuccessMessage,
  clearSubmitErrorMessage,
  resetPaymentReducerState,
  clearDueInvoices,
  getCompanySettingsByKey,
  getRepeatingInvoice,
  getContactPayment,
  getContactRepeatingInvoice,
} from "../../redux/actions";

const api = new APICore();

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
  let status = (row.original.status).split('_')

  for (var i = 0; i < status.length; i++) {
      status[i] = status[i].charAt(0).toUpperCase() + status[i].slice(1);
  }
  status = status.join(" ");

  return (
      <React.Fragment>
          <span style={{width:"5rem",fontSize:12}}
              className={classNames('badge', {
                  'bg-soft-primary text-primary': row.original.status === "draft",
                  'bg-soft-secondary text-secondary': row.original.status === "waiting",
                  'bg-soft-success text-success': row.original.status === "approve",
                  'bg-soft-warning text-warning': row.original.status === "partial_paid",
                  'bg-soft-info text-info': row.original.status === "paid",
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
    Header: "Name",
    accessor: "client_id.name",
    sort: true,
  },

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
  },
  {
    Header: "Reference",
    accessor: "reference",
    sort: true,
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
        Header: 'Invoice No',
        accessor: 'invoice_no',
        sort: true,
    },
    {
        Header: 'Client',
        accessor: 'contact_id.name',
        sort: true,
    },
    {
        Header: 'Date',
        accessor: 'date',
        sort: true,
    },
    {
        Header: 'Due Date',
        accessor: 'due_date',
        sort: true,
    },
    {
        Header: 'Tax Type',
        accessor: 'tax_type',
        sort: true,
    },
    {
        Header: 'Sub Total',
        accessor: 'sub_total',
        sort: true,
        Cell: (row) => {
            return <div>{row?.row?.original?.sub_total!==null?(row?.row?.original?.sub_total).toLocaleString(undefined, {maximumFractionDigits:2}):0}</div>;
        }
    },
    {
        Header: 'Discount',
        accessor: 'discount',
        sort: true,
        Cell: (row) => {
            return <div>{row?.row?.original?.discount!==null?(row?.row?.original?.discount).toLocaleString(undefined, {maximumFractionDigits:2}):0}</div>;
        }
    },
    {
        Header: 'Total Tax',
        accessor: 'total_tax',
        sort: true,
        Cell: (row) => {
            return <div>{row?.row?.original?.total_tax!==null?(row?.row?.original?.total_tax).toLocaleString(undefined, {maximumFractionDigits:2}):0}</div>;
        }
    },
    {
        Header: 'Total Amount',
        accessor: 'total_amount',
        sort: true,
        Cell: (row) => {
            return <div>{row?.row?.original?.total_amount!==null?(row?.row?.original?.total_amount).toLocaleString(undefined, {maximumFractionDigits:2}):0}</div>;
        }
    },
    {
        Header: 'Status',
        accessor: 'status',
        sort: true,
        Cell: InvoiceStatusColumn,
    },
    

];


export const RepeatingInvoiceStatusColumn = withSwal(({ row, swal }) => {
  /*
   *   modal handeling
   */
  const dispatch = useDispatch();
  const user_role = useSelector((state) => state.Role.user_role);

  /*
  handle form submission
  */
  const draftsOptions =
      <>
          <option selected={row.original.status === 'draft'} value='draft'>Draft</option>
          <option selected={row.original.status === 'approve'} value='approve'>Approved</option>
      </>

  const approvesOptions =
      <>
          <option selected={row.original.status === 'approve'} value='approve'>Approved</option>
      </>


  var dropDown = (<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Form.Select style={{ width: '70%' }} onChange={(e) => handleShow(row, e)}>
          {row.original.status === "draft" ? (draftsOptions) : null}
          {row.original.status === "approve" ? (approvesOptions) : null}
      </Form.Select>
  </div>)

  const handleShow = (row, e) => {
      const value = e.target.value;
      const data = {
          "status": value
      }
      swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#28bb4b',
          cancelButtonColor: '#f34e4e',
          confirmButtonText: 'Yes, change it!',
      })
          .then(function (result) {

              if (result.value) {
                  api.update(`/api/change-repeating-invoice-status/?id=${row.original.id}`, data)
                      .then(res => {
                          if (res) {
                              swal.fire(
                                  'Updated!',
                                  'Repeating Invoice Status has been Updated.',
                                  'success'
                              );
                          }
                          else {
                              swal.fire(
                                  'Updated!',
                                  'Repeating Invoice Status has not Updated.',
                                  'warning'
                              );
                          }
                          // setTimeout(() => {
                          //     refreshPage();
                          // }, 600);
                          dispatch(getRepeatingInvoice(10, 1));
                      })
                      .catch(err => {
                          console.log('err', err)
                          dispatch(getRepeatingInvoice(10, 1));
                          swal.fire({
                              title: err,
                          }
                          );
                      })
              } else if (result.dismiss === 'cancel') {
                  dispatch(getRepeatingInvoice(10, 1));
              }
          })
          .catch(err => {
              console.log('swal fire err', err)
          })
  };

  return (
      <>
          {dropDown}

      </>
  );
});

const repeatingInvoiceColumns = [
  {
      Header: 'Invoice No',
      accessor: 'invoice_no',
      sort: true,
  },
  {
      Header: 'Client',
      accessor: 'contact_id.name',
      sort: true,
  },
  {
      Header: 'Day',
      accessor: 'date',
      sort: true,
  },
  {
      Header: 'Due Day',
      accessor: 'due_date',
      sort: true,
  },
  {
      Header: 'Repeat Day',
      accessor: 'repeat_date',
      sort: true,
  },
  {
      Header: 'Tax Type',
      accessor: 'tax_type',
      sort: true,
  },
  {
      Header: 'Sub Total',
      accessor: 'sub_total',
      sort: true,
      Cell: (row) => {
          return <div>{row?.row?.original?.sub_total!==null?(row?.row?.original?.sub_total).toLocaleString(undefined, {maximumFractionDigits:2}):0}</div>;
      }
  },
  {
      Header: 'Discount',
      accessor: 'discount',
      sort: true,
      Cell: (row) => {
          return <div>{row?.row?.original?.discount!==null?(row?.row?.original?.discount).toLocaleString(undefined, {maximumFractionDigits:2}):0}</div>;
      }
  },
  {
      Header: 'Total Tax',
      accessor: 'total_tax',
      sort: true,
      Cell: (row) => {
          return <div>{row?.row?.original?.total_tax!==null?(row?.row?.original?.total_tax).toLocaleString(undefined, {maximumFractionDigits:2}):0}</div>;
      }
  },
  {
      Header: 'Total Amount',
      accessor: 'total_amount',
      sort: true,
      Cell: (row) => {
          return <div>{row?.row?.original?.total_amount!==null?(row?.row?.original?.total_amount).toLocaleString(undefined, {maximumFractionDigits:2}):0}</div>;
      }
  },
  {
      Header: 'Status',
      accessor: 'status',
      sort: true,
      Cell: RepeatingInvoiceStatusColumn,
  },
  
  
];

const servicesColumns = [

    {
        Header: 'Client',
        accessor: 'contact_id.name',
        sort: true,
    },
    {
        Header: 'Service Type',
        accessor: 'service_type',
        sort: true,
    },
    {
        Header: 'Client Mode',
        accessor: 'contact_mode',
        sort: true,
    },
    {
        Header: 'Payment Terms',
        accessor: 'payment_terms',
        sort: true,
    },
    {
        Header: 'Tax Rate',
        accessor: 'tax_rate',
        sort: true,
        Cell: (row) => {
            return <div>{row?.row?.original?.tax_rate!==null?(row?.row?.original?.tax_rate).toLocaleString(undefined, {maximumFractionDigits:2}):0}</div>;
        }
    },
    {
        Header: 'Unit Price',
        accessor: 'unit_price',
        sort: true,
        Cell: (row) => {
            return <div>{row?.row?.original?.unit_price!==null?(row?.row?.original?.unit_price).toLocaleString(undefined, {maximumFractionDigits:2}):0}</div>;
        }
    },
];

const ContactDetails = withSwal(({ swal }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [contactId, setContactId] = useState();
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
  const repeating_invoice_list = useSelector((state) => state.RepeatingInvoice.repeating_invoices);
  const service_list = useSelector((state) => state.Service.services);
  const payment_list = useSelector((state) => state.Payment.payments);
  // console.log("payment ListContact", payment);
  const invoice_previous = useSelector((state) => state.Invoice.previous);
  const invoice_next = useSelector((state) => state.Invoice.next);
  const repeating_invoice_previous = useSelector((state) => state.RepeatingInvoice.previous);
  const repeating_invoice_next = useSelector((state) => state.RepeatingInvoice.next);
  const service_previous = useSelector((state) => state.Service.previous);
  const service_next = useSelector((state) => state.Service.next);
  const payment_previous = useSelector((state) => state.Payment.previous);
  const payment_next = useSelector((state) => state.Payment.next);
  const invoice_current_page = useSelector((state) => state.Invoice.current_page);
  const invoice_total_page = useSelector((state) => state.Invoice.total_page);
  const invoice_active = useSelector((state) => state.Invoice.active);
  const repeating_invoice_current_page = useSelector((state) => state.RepeatingInvoice.current_page);
  const repeating_invoice_total_page = useSelector((state) => state.RepeatingInvoice.total_page);
  const repeating_invoice_active = useSelector((state) => state.RepeatingInvoice.active);
  const service_current_page = useSelector((state) => state.Service.current_page);
  const service_total_page = useSelector((state) => state.Service.total_page);
  const service_active = useSelector((state) => state.Service.active);
  const payment_current_page = useSelector((state) => state.Payment.current_page);
  const payment_total_page = useSelector((state) => state.Payment.total_page);
  const payment_active = useSelector((state) => state.Payment.active);
  const [paymentData, setPaymentData] = useState("");
  // const invoice_list = useSelector((state) => state.Contact.invoice_list);
  // const invoice_list_pagination_data = useSelector(
  //   (state) => state.Contact.invoice_list_pagination_data
  // );
  const contact_details = useSelector((state) => state.Contact.contact_details);
  const invoice_setting = useSelector((state) => state.Contact.invoice_setting);
  const loading = useSelector((state) => state.Contact.loading);
  const invoiceLoading = useSelector((state) => state.Invoice.loading);
  const repeatingInvoiceLoading = useSelector((state) => state.RepeatingInvoice.loading);
  const serviceLoading = useSelector((state) => state.Service.loading);
  const paymentLoading = useSelector((state) => state.Payment.loading);
  const invoice_setting_error = useSelector(
    (state) => state.Contact.invoice_setting_error
  );
  const invoice_setting_success = useSelector(
    (state) => state.Contact.invoice_setting_success
  );
  const success = useSelector((state) => state.Contact.success);
  // const services = useSelector((state) => state.Service.contact_services);
  const client_balance = useSelector((state) => state.Payment.client_balance);

  const user_role = useSelector((state) => state.Role.user_role);
  const all_kam = useSelector((state) => state.Kam.all_kam);
  const country = useSelector((state) => state.Location.country);
  const [showClientEditModal, setShowClientEditModal] = useState(false);
  const onCloseModal = () => setShowClientEditModal(false);
  const onOpenModal = () => setShowClientEditModal(true);

  const onSubmit = (formData) => {
    formData["id"] = contactId;
    dispatch(updateContact(formData));
  };

  const onDelete = () => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28bb4b",
        cancelButtonColor: "#f34e4e",
        confirmButtonText: "Yes, delete it!",
      })
      .then(function (result) {
        if (result.value) {
          api
            .delete(`/api/contact/${contactId}/`)
            .then((res) => {
              if (res.data.success) {
                swal.fire("Deleted!", "Account has been deleted.", "success");
              } else {
                swal.fire("Error", res.data.error, "warning");
              }
            })
            .catch((err) => {
              swal.fire({
                title: err,
              });
            });
        } else if (result.dismiss === "cancel") {
          console.log("cancel");
        }
      });
  };

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
    dispatch(getContactInvoice(contactId,invoicePageSize, page));
  };

  const invoice_previous_number = () => {
      dispatch(getContactInvoice(contactId,invoicePageSize, invoice_previous));
  };

  const invoice_next_number = () => {
      dispatch(getContactInvoice(contactId,invoicePageSize, invoice_next));
  };
  const visitRepeatingInvoicePage = (page) => {
    dispatch(getContactRepeatingInvoice(contactId,repeatingInvoicePageSize, page));
  };

  const repeating_invoice_previous_number = () => {
      dispatch(getContactRepeatingInvoice(contactId,repeatingInvoicePageSize, repeating_invoice_previous));
  };

  const repeating_invoice_next_number = () => {
      dispatch(getContactRepeatingInvoice(contactId,repeatingInvoicePageSize, repeating_invoice_next));
  };
  const visitServicePage = (page) => {
    dispatch(getContactInvoice(contactId,servicePageSize, page));
  };

  const service_previous_number = () => {
      dispatch(getContactService(contactId,servicePageSize, service_previous));
  };

  const service_next_number = () => {
      dispatch(getContactService(contactId,servicePageSize, service_next));
  };
  const visitPaymentPage = (page) => {
    dispatch(getContactPayment(contactId,paymentPageSize, page));
  };

  const payment_previous_number = () => {
      dispatch(getContactPayment(contactId,paymentPageSize, payment_previous));
  };

  const payment_next_number = () => {
      dispatch(getContactPayment(contactId,paymentPageSize, payment_next));
  };

  useEffect(() => {
    if (contactId !== undefined && contactId !== null) {
      dispatch(getContactInvoice(contactId, invoicePageSize, 1));
      dispatch(getContactRepeatingInvoice(contactId, repeatingInvoicePageSize, 1));
      dispatch(getContactPayment(contactId, paymentPageSize, 1));
      dispatch(getContactDetails(contactId));
      dispatch(getContactInvoiceSetting(contactId));
      dispatch(getContactService(contactId,servicePageSize,1));
      dispatch(getClientBalance(contactId));
      dispatch(getDueInvoices(contactId));
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
      <PageTitle
        breadCrumbItems={[
          { label: "Client", path: "/app/client", active: false },
          {
            label: "Client Details",
            path: "/app/client_details",
            active: true,
          },
        ]}
        title={"Client Report"}
      />

      <Row>
        <Col md={8} xl={8}>
          {!loading && success && (
            <Alert
              variant="success"
              className="my-2"
              onClose={() => dispatch(setContactSuccessAlert(""))}
              dismissible
            >
              {success}
            </Alert>
          )}
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between">
                <span>Personal Details</span>
                <div>
                <Dropdown >
                      <Dropdown.Toggle variant='primary'>
                          Action <i className="mdi mdi-chevron-down"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                            {user_role.includes("view_general_ledger") ? (
                              <Dropdown.Item>
                                  <Link
                                    data-bs-toggle="Client Statement"
                                    data-bs-placement="top"
                                    title="Client Statement"
                                    to={{
                                      pathname: "/app/client_statement",
                                      state: contactId,
                                    }}
                                    
                                  >
                                    <i className="mdi mdi-file"> Client Statement</i>
                                  </Link>
                              </Dropdown.Item>
                              
                            ) : (
                              ""
                            )}

                            {user_role.includes("change_contact") ? (
                              <Dropdown.Item>
                                  <Link
                                    to="#"
                                    data-bs-toggle="Edit"
                                    data-bs-placement="top"
                                    title="Edit"
                                    
                                    onClick={() => onOpenModal()}
                                  >
                                    <i className="mdi mdi-square-edit-outline"> Edit</i>
                                  </Link>
                              </Dropdown.Item>
                              
                            ) : (
                              ""
                            )}

                            {user_role.includes("delete_contact") ? (
                              <Dropdown.Item>
                                  <Link
                                    to="#"
                                    data-bs-toggle="Delete"
                                    data-bs-placement="top"
                                    title="Delete"
                                    
                                    onClick={() => onDelete()}
                                  >
                                    <i className="mdi mdi-delete"> Delete</i>
                                  </Link>
                              </Dropdown.Item>
                              
                            ) : (
                              ""
                            )}
                            {showClientEditModal ? (
                              <Dropdown.Item>
                                  <ContactForm
                                  show={showClientEditModal}
                                  onHide={onCloseModal}
                                  onSubmit={onSubmit}
                                  contact={contact_details}
                                  countries={country}
                                  kamList={all_kam}
                                />
                              </Dropdown.Item>
                              
                            ) : null}
                            <Dropdown.Item>
                              <Link to={{
                                    pathname: "/app/payment_form",
                                    state: { contactId: contactId, clientPayment: true},
                                  }}  >
                                  <i className="mdi mdi-cash me-1"></i>Payment
                              </Link> 
                            </Dropdown.Item>
                      </Dropdown.Menu>
                  </Dropdown>
                  
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="container">
                <div className="row mb-4">
                  <div className="col-sm">
                    <h5>Name: </h5>
                    <p>{contact_details?.name}</p>
                  </div>
                  <div className="col-sm">
                    <h5 className="me-2">Client ID:</h5>
                    <p>{contact_details?.client_id}</p>
                  </div>
                  <div className="col-sm">
                    <h5 className="me-2">Client Type:</h5>
                    <p>{contact_details?.contact_type}</p>
                  </div>
                  <div className="col-sm">
                    <h5 className="me-2">Contact Person:</h5>
                    <p>{contact_details?.contact_person}</p>
                  </div>
                  <div className="col-sm">
                    <h5 className="me-2">Phone:</h5>
                    <p>{contact_details?.phone}</p>
                  </div>
                  <div className="col-sm">
                    <h5 className="me-2">Email:</h5>
                    <p>{contact_details?.email}</p>
                  </div>
                </div>

                {/* <div className="row mb-4">
                                    <div className="col-sm">
                                        <h5 className='me-2'>Contact Person:</h5>
                                        <p>{contact_details?.contact_person}</p>
                                    </div>
                                    <div className="col-sm">
                                        <h5 className='me-2'>Phone:</h5>
                                        <p>{contact_details?.phone}</p>
                                    </div>
                                    <div className="col-sm">
                                        <h5 className='me-2'>Email:</h5>
                                        <p>{contact_details?.email}</p>
                                    </div>
                                </div> */}

                <div className="row mb-2">
                  <div className="col-sm">
                    <h5 className="me-2">Country:</h5>
                    <p>{contact_details?.country?.name}</p>
                  </div>
                  <div className="col-sm">
                    <h5 className="me-2">City:</h5>
                    <p>{contact_details?.city?.name}</p>
                  </div>
                  <div className="col-sm">
                    <h5 className="me-2">Billing Address:</h5>
                    <p>{contact_details?.billing_address}</p>
                  </div>
                  <div className="col-sm">
                    <h5 className="me-2">Kam:</h5>
                    <p>{contact_details?.kam?.name}</p>
                  </div>
                  <div className="col-sm">
                    <h5 className="me-2">Bin:</h5>
                    <p>{contact_details?.bin}</p>
                  </div>
                  <div className="col-sm">
                    <h5 className="me-2">Balance</h5>
                    <p>{client_balance.balance}</p>
                  </div>
                  <div className="col-sm">
                    <h5 className="me-2">Due</h5>
                    <p>{client_balance.due}</p>
                  </div>
                </div>

                {/* <div className="row mb-4">
                                    <div className="col-sm">
                                        <h5 className='me-2'>Kam:</h5>
                                        <p>{contact_details?.kam?.name}</p>
                                    </div>
                                    <div className="col-sm">
                                        <h5 className='me-2'>Bin:</h5>
                                        <p>{contact_details?.bin}</p>
                                    </div>
                                    <div className="col-sm">
                                        <h5 className='me-2'>Balance</h5>
                                        <p>{client_balance.toLocaleString()}</p>
                                    </div>
                                </div> */}
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} xl={4}>
          <Card>
            <Card.Header>
              <p>Invoice Setting</p>
            </Card.Header>
            <Card.Body>
              <div className="container">
              {!loading && invoice_setting_error && !invoice_setting_success && (
                <Alert variant="danger" className="my-2">
                  {invoice_setting_error}
                </Alert>
              )}

              {!loading && invoice_setting_success && !invoice_setting_error && (
                <Alert variant="success" className="my-2">
                  {invoice_setting_success}
                </Alert>
              )}
              <InputGroup className="mb-3">
                <InputGroup.Text style={mystyle}>Auto Approve</InputGroup.Text>
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
                        invoiceSetting?.reminder_settings?.is_include_pdf_link
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
                        invoiceSetting?.reminder_settings?.reminder_type ===
                        "due_in"
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
                        invoiceSetting?.reminder_settings?.reminder_type ===
                        "over_due"
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
                    {invoiceSetting?.reminder_settings?.days?.map((day) => (
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
                    ))}
                    <>
                      <Button variant="primary" onClick={handleShow}>
                        Add
                      </Button>

                      {/* <MyVerticallyCenteredModal
                                                    show={show}
                                                    onHide={handleClose}
                                                /> */}

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
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                          <Button variant="primary" onClick={() => daySubmit()}>
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

      <Row>
        <Col md={12} xl={12}>
          <Card>
            <Card.Header>
            <div className="d-flex justify-content-between">
              <p style={{ marginBottom: "0px !important" }}>Invoice List</p>
              <Link
                  className="btn btn-primary"
                  to={{
                    pathname: "/app/invoice_form",
                    state: { contactId: contactId },
                  }}
                >
                  <i className="mdi mdi-pencil me-1"></i> Add
                </Link>
              </div>
            </Card.Header>

            <Card.Body>
            {invoiceLoading ? <p>Loading...</p> :
            <>
              {invoice_list?.length > 0 ? (
                <>
                  <Table
                    columns={invoicesColumns}
                    data={invoice_list}
                    pageSize={invoicePageSize}
                    isSortable={true}
                    isDetails={true}
                    pathName='/app/invoice_details'
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
              )}</>}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12} xl={12}>
          <Card>
            <Card.Header>
            <div className="d-flex justify-content-between">
              <p style={{ marginBottom: "0px !important" }}>Repeating Invoice List</p>
              <Link
                  className="btn btn-primary"
                  to={{
                    pathname: "/app/repeating_invoice_form",
                    state: { contactId: contactId },
                  }}
                >
                  <i className="mdi mdi-pencil me-1"></i> Add
                </Link>
              </div>
            </Card.Header>

            <Card.Body>
            {repeatingInvoiceLoading ? <p>Loading...</p> :
            <>
              {repeating_invoice_list?.length > 0 ? (
                <>
                  <Table
                    columns={invoicesColumns}
                    data={repeating_invoice_list}
                    pageSize={repeatingInvoicePageSize}
                    isSortable={true}
                    isDetails={true}
                    pathName='/app/invoice_details'
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
              </>}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12} xl={12}>
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between">
                <p style={{ marginBottom: "0px !important" }}>Payment List</p>

                <Link
                  className="btn btn-primary"
                  to={{
                    pathname: "/app/payment_form",
                    state: { contactId: contactId },
                  }}
                >
                  <i className="mdi mdi-pencil me-1"></i> Add
                </Link>
              </div>
            </Card.Header>

            <Card.Body>
            {paymentLoading ? <p>Loading...</p> :
            <>
              {paymentData?.length > 0 ? (
                <>
                  <Table
                    columns={columns}
                    data={paymentData}
                    pageSize={paymentPageSize}
                    isDetails={true}
                    pathName='/app/payment_details'
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
              </>}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12} xl={12}>
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between">
                <p style={{ marginBottom: "0px !important" }}>Services List</p>

                <Link
                  className="btn btn-primary"
                  to={{
                    pathname: "/app/service_form",
                    state: { services: service_list, contactId: contactId },
                  }}
                >
                  <i className="mdi mdi-pencil me-1"></i> Add
                </Link>
              </div>
            </Card.Header>

            <Card.Body>
            {serviceLoading ? <p>Loading...</p> :
            <>
              {service_list?.length > 0 ? (
                <>
                  <Table
                    columns={servicesColumns}
                    data={service_list}
                    pageSize={servicePageSize}
                    isDetails={true}
                    pathName='/app/service_details'
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
              </>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
});
export default ContactDetails;
