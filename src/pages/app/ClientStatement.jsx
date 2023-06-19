import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Form, Alert } from "react-bootstrap";
import { format, set } from "date-fns";

// components
import Table from "../../components/Table";
import PageTitle from "../../components/PageTitle";
import { useSelector, useDispatch } from "react-redux";
import { getContact } from "../../redux/actions";
import ComponentToPrint from "./ComponentToPrint";
import ReactToPrint from "react-to-print";
import { APICore } from "../../helpers/api/apiCore";
import { getCurrentDate } from "../../utils/getCurrentDate";
import classNames from "classnames";
import { useLocation } from "react-router-dom";

// action column render

const api = new APICore();

const DescriptionColumn = ({ row }) => {
  return (
    <React.Fragment>
      <span>
        {row.original.invoice_no && row.original.invoice_no}
        {row.original.payment_no && row.original.payment_no}
      </span>
    </React.Fragment>
  );
};

const columns = [
  {
    Header: "Date",
    accessor: "date",
    sort: true,
  },
  {
    Header: "Description",
    Cell: DescriptionColumn,
    sort: true,
  },
  {
    Header: "Paid By",
    accessor: "payment_type",
    sort: true,
  },
  {
    Header: "Invoice Paid Amount",
    accessor: "paid",
    sort: true,
  },
  {
    Header: "Payment Amount",
    accessor: "amount",
    sort: true,
    Cell: (row) => {
      return (
        <div>
          {row?.row?.original?.amount !== null &&
          row?.row?.original?.amount !== undefined
            ? (row?.row?.original?.amount).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      );
    },
  },
];

const ClientStatement = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const contacts = useSelector((state) => state.Contact.contact);
  const cloading = useSelector((state) => state.Contact.loading);
  const [contactId, setContactId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [clientLedger, setClientLedger] = useState({});
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    const state = location.state;
    // console.log("report",state.start_date)
    if (state) {
      setContactId(parseInt(state.contactId));
      setFromDate(state.start_date);
      setToDate(state.end_date);
      setLoading(true);

      if (fromDate === "" || toDate === "") {
        await api
          .get("/api/client-ledger", { client_id: parseInt(state.contactId) })
          .then((response) => {
            setLoading(false);
            setError("");
            setClientLedger(response.data.data);
          })
          .catch((err) => {
            const errorMsg = err?.data?.detail;
            setLoading(false);
            setError(errorMsg);
          });
      } else {
        const response = await api
          .get("/api/client-ledger", {
            client_id: parseInt(state.contactId),
            start_date: format(new Date(state.start_date), "yyyy-MM-dd"),
            end_date: format(new Date(state.end_date), "yyyy-MM-dd"),
          })
          .then((response) => {
            setLoading(false);
            setError("");
            setClientLedger(response.data.data);
          })
          .catch((err) => {
            const errorMsg = err?.data?.detail;
            setLoading(false);
            setError(errorMsg);
          });
      }
      // const response = await api.get('/api/client-ledger', { client_id: parseInt(state.contactId),start_date: format(new Date(state.start_date),'yyyy-MM-dd'),
      //     end_date: format(new Date(state.end_date), 'yyyy-MM-dd')});

      // if (response.data.success) {

      //     setLoading(false)
      // }
      // setClientLedger(response.data.data)
    }
  }, []);

  const componentRef = React.useRef();

  useEffect(() => {
    if (error !== "") {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (fromDate === "" || toDate === "") {
      await api
        .get("/api/client-ledger", { client_id: contactId })
        .then((response) => {
          setLoading(false);
          setError("");
          setClientLedger(response.data.data);
        })
        .catch((err) => {
          const errorMsg = err?.data?.detail;
          setLoading(false);
          setError(errorMsg);
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
          setError("");
          setClientLedger(response.data.data);
        })
        .catch((err) => {
          const errorMsg = err?.data?.detail;
          setLoading(false);
          setError(errorMsg);
        });
    }
  };

  useEffect(() => {
    dispatch(getContact(0, 1));
    // dispatch(getPayment(pageSize,1));
  }, []);
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: "Client Statement",
            path: "/app/client_statement",
            active: true,
          },
        ]}
        title={"General Ledger"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              {!loading && error && (
                <Alert
                  variant="danger"
                  className="my-2"
                  onClose={() => setError("")}
                  dismissible
                >
                  {error}
                </Alert>
              )}
              <Row className="mb-2">
                <Col sm={8}>
                  <form onSubmit={(e) => handleSearch(e)} className="mb-4">
                    <Row className="mb-3">
                      <Form.Group as={Col}>
                        <Form.Label className="required">Client</Form.Label>

                        <Form.Select
                          aria-label="Default select example"
                          required
                          onChange={(e) => setContactId(e.target.value)}
                          value={contactId}
                        >
                          {cloading ? (
                            <option value="" disabled>
                              Loading...
                            </option>
                          ) : (
                            <>
                              <option value="" disabled>
                                Select Client ...
                              </option>
                              {contacts.length > 0 &&
                                contacts?.map((item) => {
                                  return (
                                    <option
                                      key={"scontact" + item.id}
                                      value={item.id}
                                    >
                                      {item.name}
                                    </option>
                                  );
                                })}
                            </>
                          )}
                        </Form.Select>
                      </Form.Group>

                      <Form.Group as={Col}>
                        <Form.Label>From</Form.Label>
                        <Form.Control
                          type="date"
                          name="from_date"
                          onChange={(e) => setFromDate(e.target.value)}
                          value={fromDate}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>To</Form.Label>
                        <Form.Control
                          type="date"
                          name="to_date"
                          onChange={(e) => setToDate(e.target.value)}
                          value={toDate}
                        ></Form.Control>
                      </Form.Group>
                    </Row>

                    <Button type="submit" className="mt-2">
                      Search
                    </Button>
                  </form>
                </Col>

                <Col sm={4}>
                  <div className="text-sm-end mt-2 mt-sm-0">
                    {clientLedger.statements &&
                      clientLedger.statements?.length > 0 && (
                        <ReactToPrint
                          trigger={() => (
                            <Button className="btn btn-success mb-2 me-1">
                              <i className="mdi mdi-printer me-1"></i> Print
                            </Button>
                          )}
                          content={() => componentRef.current}
                          documentTitle={`qorum_invoice_${getCurrentDate()}`}
                        />
                      )}
                    <div className="d-none">
                      <ComponentToPrint
                        ref={componentRef}
                        data={clientLedger}
                      />
                    </div>
                  </div>
                </Col>
              </Row>

              {loading ? (
                <p>Loading...</p>
              ) : (
                <>
                  {clientLedger.statements &&
                  clientLedger.statements?.length > 0 ? (
                    <>
                      <Table
                        columns={columns}
                        data={clientLedger.statements}
                        pageSize={10}
                        isSortable={true}
                        pagination={true}
                        isSearchable={false}
                        tableClass="table-nowrap table-hover"
                        searchBoxClass=""
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
    </>
  );
};

export default ClientStatement;
