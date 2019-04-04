import React from "react";
import logger from "../../../logger";
import * as schemas from "../public/contactUs/schemas/schemasContactUs";
import { Formik, Form } from "formik";
import PropTypes from 'prop-types';
import * as contactUsService from "../../../services/contactUsService";
import SweetAlert from "sweetalert";
import "./contactUs/ContactUs.css";
import NavBar from "./NavBar";
import Footer from "./Footer";

const _logger = logger.extend("uPForm");

export default class ContactUs extends React.PureComponent {
    state = {
        contactFormData: {
            name: ""
            , email: ""
            , description: ""
        },
        targetSchema: schemas.contactUsSchema
    };

    componentDidMount() {
        _logger("Asim's Contact Us Form Component did mount");
    };

    handleChange = event => {
        const keyName = event.target.name;
        let contactFormData = { ...this.state.contactFormData };
        contactFormData[keyName] = event.target.value;
        this.setState({ contactFormData });
    };

    handleSubmit = payload => {
        contactUsService.createMessage(payload)
            .then(this.createMessageSucc)
            .catch(this.createMessageErr)
    };

    createMessageSucc = () => {
        SweetAlert("Message sent!", "We will be in touch, if necessary. Thanks.", "success");
    };

    createMessageErr = (err) => {
        //this is accounting for various conditions of errors that come back and stop an error from causing the page to crash and instead show an error to end user
        if (err.message === "timeout of 0ms exceeded") {
            SweetAlert("Error", "Sorry, try again with proper format. If unable, email: webmaster@sellersplace.com", "error");
        }
        else if (!err) {
            SweetAlert("Error", "Sorry, try again with proper format. If unable, email: webmaster@sellersplace.com", "error");
        }
        else if (!err.response) {
            SweetAlert("Error", "Sorry, try again with proper format. If unable, email: webmaster@sellersplace.com", "error");
        }
        else if (!err.response.data) {
            SweetAlert("Error", "Sorry, try again with proper format. If unable, email: webmaster@sellersplace.com", "error");
        }
        else if (!err.response.data.errors) {
            SweetAlert("Error", "Sorry, try again with proper format. If unable, email: webmaster@sellersplace.com", "error");
        }
        else if (err.response.data.errors) {
            SweetAlert(err.message, err.response.data.errors.toString(), "error");
        }
        else {
            SweetAlert("Error", "Sorry, try again with proper format. If unable, email: webmaster@sellersplace.com", "error");
        }
    };

    render() {
        return (
            <React.Fragment>
                <NavBar />
                <Formik style={{
                }}
                    initialValues={this.state.contactFormData
                    }
                    enableReinitialize={true}
                    validationSchema={this.state.targetSchema}
                    onSubmit={this.handleSubmit} >
                    {props => {
                        const { values
                            , touched
                            , errors
                            , handleBlur
                            , handleChange
                            , handleSubmit
                            , isSubmitting
                            , onReset
                        } = props;
                        return (
                            <div className=" wrapperStyleAsim"
                            >
                                <div className="row">

                                    <div className="col-md-6 order-md-2 order-lg-2 col-auto" >
                                        <div className="card col-lg-8 mx-auto" style={{
                                            background: "transparent"
                                        }}>
                                            <div className="mx-auto card-header text-bold" style={{
                                                background: "transparent"

                                            }}>
                                                <legend style={{
                                                    color: "black"
                                                }}> {this.props.title}</legend>
                                            </div>
                                            <div className="card-body">
                                                <Form className="form-horizontal" onSubmit={handleSubmit}>
                                                    <div className="form-group row">
                                                        <div className="col-md-12">
                                                            <input
                                                                name="name"
                                                                type="text"
                                                                placeholder="enter name"
                                                                className={
                                                                    errors.name &&
                                                                        touched.name
                                                                        ? "form-control error border-danger placeH"
                                                                        : "form-control placeH"
                                                                }
                                                                onBlur={handleBlur}
                                                                value={values.name}
                                                                onChange={handleChange} />
                                                            {errors.name &&
                                                                touched.name && (
                                                                    <span style={{ color: 'red' }} className="input-feedback"> <i className="fas fa-exclamation"></i> <span></span>
                                                                        {errors.name}  i.e. Roberto.
                                                                        </span>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-md-12">
                                                            <input
                                                                name="email"
                                                                type="email"
                                                                placeholder="enter email address"
                                                                className={
                                                                    errors.email &&
                                                                        touched.email
                                                                        ? "form-control error border-danger placeH"
                                                                        : "form-control placeH"
                                                                }
                                                                onBlur={handleBlur}
                                                                value={values.email}
                                                                onChange={handleChange} />
                                                            {errors.email &&
                                                                touched.email && (
                                                                    <span className="input-feedback" style={{
                                                                        color: 'red'
                                                                    }}>
                                                                        <i className="fas fa-exclamation"></i> <span></span>
                                                                        {errors.email}  i.e.  johnsmith@gmail.com .
                                                                    </span>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-md-12">
                                                            <textarea
                                                                name="description"
                                                                type="text"
                                                                placeholder="enter description"

                                                                className={errors.description &&
                                                                    touched.description
                                                                    ? "form-control error border-danger placeH"
                                                                    : "form-control placeH"
                                                                }

                                                                onBlur={handleBlur}
                                                                value={values.description}
                                                                onChange={handleChange}
                                                            />{errors.description &&
                                                                touched.description && (
                                                                    <span className="input-feedback" style={{ color: 'red' }}><i className="fas fa-exclamation"></i> <span></span>
                                                                        {errors.description}  i.e.  I need help with reaching out to promoter ASAP because ...
                                                                    </span>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="AsimContatcUsForm form-group row text-center" style={{ marginLeft: "0" }}>
                                                        <div className="col-md-12">
                                                            <button type="submit" style={{ marginLeft: "0", backgroundColor: "#e9227b", color: "white" }} disabled={isSubmitting} className="AsimContatcUsForm mb-1 btn modalSubmit">
                                                                Submit
                                                </button>
                                                            <button type="reset" style={{ marginLeft: "0" }} className="AsimContatcUsForm mb-1 btn btn-warning" onClick={onReset}>Reset </button>
                                                        </div>
                                                    </div>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                    <img className="col-md-6 order-md-1 order-lg-1 img-fluid" alt="Show example of type of artwork a person may see at the event. Such as colorful pink Hispanic art."
                                        src="https://sabio-s3.s3.us-west-2.amazonaws.com/sellersplace/4701d4f5-01c7-41f8-b14c-27c9ab0b8a6d_Creative_Community_Art.jpg"
                                    >
                                    </img>
                                </div>
                            </div >
                        );
                    }
                    }
                </Formik >
                <Footer />
            </React.Fragment >
        );
    };
};

ContactUs.propTypes = {
    title: PropTypes.string
};

ContactUs.defaultProps = {
    title: "Contact Us"
};
