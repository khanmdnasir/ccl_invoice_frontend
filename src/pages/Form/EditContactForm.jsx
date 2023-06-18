import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Alert,
  Breadcrumb,
  Tab,
  Nav,
  Card,
  InputGroup,
  DropdownButton,
  Dropdown,
  SplitButton,
} from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RootState, AppDispatch } from "../../redux/store";
// components
import { FormInput } from "../../components";
import { APICore } from "../../helpers/api/apiCore";
import { useDispatch, useSelector } from "react-redux";
import { getCity, getCountry } from "../../redux/location/actions";
import {
  addContact,
  updateContact,
  getAllKam,
  getContact,
  setContactErrorAlert,
  setContactSuccessAlert,
  getContactDetails,
  contactDetailsClear,
} from "../../redux/actions";
import { Link, useHistory, useLocation } from "react-router-dom";

const api = new APICore();

// interface FormData {
//     id: number;
//     name: string;
//     contact_type: any;
//     contact_person: string;
//     phone: string;
//     email: string;
//     bin: string;
//     kam: any;
//     balance: any;
//     city: any;
//     country: any;
//     billing_address: string;
// }

// interface AddContactProps {
//     show: boolean;
//     onHide: () => void;
//     contact: FormData;
//     contact_name: string;
//     countries: any;
//     kamList: any;
//     onSubmit: (value: any) => void;
// }

const EditContactForm = () => {
  /*
    form validation schema
    */

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const contact = useSelector((state) => state.Contact.contact_details)
  console.log("contactForm", contact.name);
  const all_kam = useSelector((state) => state.Kam.all_kam);
  const country = useSelector((state) => state.Location.country);
  // console.log("contactFormCountry", country);
  // console.log("contactFormCountry", country[0]?.country_code);
  const cities = useSelector((state) => state.Location.city);
  const success = useSelector((state) => state.Contact.success);
  const error = useSelector((state) => state.Contact.error);
  const loading = useSelector((state) => state.Contact.loading);
  const countryCodeLength = contact?.phone ? contact?.phone?.length - 11 : 0
  const [countryCode, setCountryCode] = useState(contact?.phone ? contact?.phone?.substr(0, countryCodeLength) : "");
  const [phone, setPhone] = useState(contact?.phone ? contact?.phone?.substr(countryCodeLength, contact?.phone?.length) : "");
  const [active,setActive] = useState('details');
  const [contactId, setContactId] = useState('');
  const [editSuccess,setEditSuccess] = useState(null);
  const [editName,setEditName] = useState('')

  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup.string().required("Please enter name"),
      email: yup.string().required("Please enter email"),
      bin: yup.string().required("Please enter bin"),
    })
  );

  const methods = useForm({
    defaultValues: {
      name: contact ? contact.name : "",
      contact_person: contact?.contact_person,
      bin: contact?.bin,
      kam: contact?.kam?.id,
      email: contact?.email,
      city: contact?.city?.id,
      country: contact?.country?.id,
      billing_address: contact?.billing_address,
    },
    resolver: schemaResolver,
  });
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    control,
    formState: { errors },
  } = methods;

  

  const onSubmit = (formData) => {
    const newFormData = { ...formData };
    console.log("newFormData",newFormData)
    newFormData["phone"] = countryCode.concat(phone);
    if (contactId){
      newFormData["id"] = contactId;
      dispatch(updateContact(newFormData));
    }else{
      dispatch(addContact(newFormData));
    }
  };

  

  useEffect(() => {
    setTimeout(() => {
      dispatch(setContactSuccessAlert(""));
      dispatch(setContactErrorAlert(""));
    }, 2000);
    
    if(success !== null && success !== ''){
      if(editSuccess == null){
        setEditSuccess('Client Edited Successfully');
        setActive('address');
      }
      
      if(success === 'Client Updated Successfully'){
        setTimeout(() => {
          history.push({
            pathname: '/app/client_details',
            state: contactId
          });
        },2000)
        
      }
      
    }
    
  }, [success]);

  useEffect(() => {
    const state = location.state;
    if(state){
        setContactId(parseInt(state.contactId),);
        setEditName(state.name);
        
    }
    // console.log("EditContact", state);
  })

  useEffect(() => {
    // dispatch(contactDetailsClear());
    dispatch(getCountry());
    dispatch(getAllKam());
  }, []);

  useEffect(() => {
    const countryCodeLength = contact?.phone ? contact?.phone?.length - 11 : 0
    setCountryCode(contact?.phone ? contact?.phone?.substr(0, countryCodeLength) : "+88");
    setPhone(contact?.phone ? contact?.phone?.substr(countryCodeLength, contact?.phone?.length) : "");
    reset({
      name: contact ? contact.name : "",
      contact_person: contact?.contact_person,
      bin: contact?.bin,
      kam: contact?.kam?.id,
      email: contact?.email,
      city: contact?.city?.id,
      country: contact?.country?.id,
      billing_address: contact?.billing_address,
    })
  },[contact])

  return (
    <>
      <div
        className="page-title-box"
        style={{ maxWidth: "1200px", margin: "auto", paddingTop: "10px" }}
      >
        <div className="page-title-left">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Qorum</Breadcrumb.Item>
            <Breadcrumb.Item href="/app/client">Clients</Breadcrumb.Item>
            <Breadcrumb.Item href="/app/client_details"> Client Details</Breadcrumb.Item>
            <Breadcrumb.Item active> {editName}</Breadcrumb.Item>
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
      Edit Client
        </h4>
      </div>
      {!loading && success && (
        <Alert
          variant="success"
          className="my-2"
          onClose={() => dispatch(setContactSuccessAlert(""))}
          dismissible
          style={{
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          {success}
        </Alert>
      )}
      {!loading && error && (
        <Alert
          variant="danger"
          className="my-2"
          onClose={() => dispatch(setContactErrorAlert(""))}
          dismissible
          style={{
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          {error}
        </Alert>
      )}
      <div
        className="cards"
        style={{
          maxWidth: "1200px",
          margin: "auto",
          border: "1px solid rgb(224, 224, 224)",
          background: "#fff",
        }}
      >
        <div className="cards-body">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3} className="border-rightStyle">
                <Nav variant="pills" className="flex-column">
                  <Nav.Item className="item-border">
                    <Nav.Link
                      className="active-border"
                      eventKey="first"
                      active={active === 'details'}
                      onClick={()=>setActive('details')}
                    >
                      Client details
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item className="item-border">
                    <Nav.Link
                      className="active-border"
                      eventKey="second"
                      active={active === 'address'}
                      onClick={()=>setActive('address')}
                      disabled={!contact?.id}
                    >
                      Addresses
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9} className="p-0">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Tab.Content className="first-tab">
                    <Tab.Pane eventKey="second" active={active === 'address'}>
                      <div className="main-tab">
                        <div className="tab-header">
                          <h4>Addresses</h4>
                        </div>

                        <div className="tab-form d-flex justify-content-center">
                          <div
                            className="mb-4 mt-4 "
                            style={{ width: "375px" }}
                          >
                            <FormInput
                              label="Country"
                              type="select"
                              name="country"
                              containerClass={"mb-3"}
                              register={register}
                              errors={errors}
                              control={control}
                              defaultValue={contact ? contact?.country?.id : ""}
                              onChange={(e) => {
                                dispatch(getCity(e.target.value));
                                if (
                                  e.target.value &&
                                  parseInt(e.target.value) ===
                                    contact?.country?.id
                                ) {
                                  setValue("city", contact?.city?.id);
                                } else {
                                  setValue("city", "");
                                }
                              }}
                            >
                              <option value="">Select Country ...</option>
                              {country?.map((item) => {
                                return (
                                  <option key={"co" + item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </FormInput>
                            <Form.Group className="mb-3">
                              <Form.Label>City</Form.Label>

                              <Form.Select
                                aria-label="Default select example"
                                isInvalid={
                                  errors && errors["city"] ? true : false
                                }
                                {...register("city")}
                                defaultValue={contact ? contact?.city?.id : ""}
                              >
                                <option value="">Select City ...</option>
                                {cities?.map((item) => {
                                  return (
                                    <option
                                      selected={contact?.city?.id === item.id}
                                      key={"ci" + item.id}
                                      value={item.id}
                                    >
                                      {item.name}
                                    </option>
                                  );
                                })}
                              </Form.Select>

                              {errors && errors["city"] ? (
                                <Form.Control.Feedback type="invalid">
                                  {errors["city"]["message"]}
                                </Form.Control.Feedback>
                              ) : null}
                            </Form.Group>

                            <FormInput
                              label="Contact Person"
                              type="text"
                              name="contact_person"
                              placeholder="Enter Contact Person"
                              containerClass={"mb-3"}
                              register={register}
                              errors={errors}
                              control={control}
                            />

                            <FormInput
                              label="Billing Address"
                              type="textarea"
                              name="billing_address"
                              placeholder="Enter Billing Adress"
                              containerClass={"mb-3"}
                              register={register}
                              errors={errors}
                              control={control}
                            />
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="first" active={active === 'details'}>
                      <div className="main-tab">
                        <div className="tab-header">
                          <h4>Client Details</h4>
                        </div>
                      </div>
                      <div className="tab-body">
                        <div className="tab-form d-flex justify-content-center">
                          <div
                            className="mb-4 mt-4 "
                            style={{ width: "375px" }}
                          >
                            <FormInput
                              className="mb-3"
                              label="Name"
                              type="text"
                              name="name"
                              labelClassName="required"
                              placeholder="Enter Name"
                              containerClass={"mb-3"}
                              register={register}
                              errors={errors}
                              control={control}
                              defaultValue={contact ? contact.name : ""}
                              style={{ height: "42px" }}
                            />

                            <FormInput
                              label="Email"
                              type="text"
                              name="email"
                              labelClassName="required"
                              placeholder="Enter Email"
                              containerClass={"mb-3"}
                              register={register}
                              errors={errors}
                              control={control}
                              style={{ height: "42px" }}
                              className="mb-3"
                              defaultValue={contact ? contact.email : ""}
                            />

                            <FormInput
                              label="Client Type"
                              type="select"
                              name="contact_type"
                              containerClass={"mb-3"}
                              register={register}
                              errors={errors}
                              control={control}
                              style={{ height: "42px" }}
                              className="mb-3"
                              defaultValue={
                                contact ? contact.contact_type : null
                              }
                            >
                              <option value="" disabled>
                                Select Client Type ...
                              </option>
                              <option value="individual">Individual</option>
                              <option value="corporate">Corporate</option>
                            </FormInput>

                            <FormInput
                              label="Bin"
                              type="text"
                              name="bin"
                              labelClassName="required"
                              placeholder="Enter bin"
                              containerClass={"mb-3"}
                              register={register}
                              errors={errors}
                              control={control}
                              style={{ height: "42px" }}
                              className="mb-3"
                              defaultValue={contact ? contact.bin : ""}
                            />

                            <FormInput
                              label="Kam"
                              type="select"
                              name="kam"
                              containerClass={"mb-3"}
                              register={register}
                              errors={errors}
                              control={control}
                              defaultValue={contact ? contact?.kam?.id : ""}
                              style={{ height: "42px" }}
                              className="mb-3"
                            >
                              <option value="">Select Kam ...</option>
                              {all_kam?.length > 0 &&
                                all_kam?.map((kam) => {
                                  return (
                                    <option key={"km-" + kam.id} value={kam.id}>
                                      {kam.name}
                                    </option>
                                  );
                                })}
                            </FormInput>

                            <Form.Label>Phone</Form.Label>
                            <InputGroup>
                           

                              <Form.Select
                               size="sm"
                               value={countryCode}
                               onChange={(e)=>setCountryCode(e.target.value)}
                               >
                              {country.map((code) => {
                                return(
                                  <option value={code?.country_code}>{code?.country_code}</option>
                                )
                              })

                              }
                              </Form.Select>
                              <Form.Control
                                className="inputs"
                                aria-label="Text input with dropdown button"
                                label="Phone"
                                type="text"
                                name="phone"
                                placeholder="ex: 01XXXXXXX"
                                containerClass={"mb-3"}
                                register={register}
                                errors={errors}
                                onChange={(e) => setPhone(e.target.value)}
                               
                                defaultValue={contact ? contact.phone : ""}
                              />
                            </InputGroup>
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>

                    <div className="text-end footer-tab">
                      <Link
                        type="button"
                        className="btn btn-danger waves-effect waves-light me-2"
                        to="#"
                        onClick={() => history.goBack()}
                      >
                        Cancel
                      </Link>
                     
                        <Button
                          variant="success"
                          type="submit"
                          className="waves-effect waves-light"
                        >
                          Save
                        </Button>
                      
                    </div>
                  </Tab.Content>
                </Form>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    </>
  );
};

export default EditContactForm;
