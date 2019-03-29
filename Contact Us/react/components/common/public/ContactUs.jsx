import React from "react";
import logger from "../../../logger";
import * as schemas from "../public/contactUs/schemas/schemasContactUs";
import { Formik, Form } from "formik";
import PropTypes from 'prop-types';
import * as contactUsService from "../../../services/contactUsService";
import SweetAlert from "sweetalert";
import "../public/contactUs/ContactUs.css";

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
            <div>
                <Formik
                    initialValues={this.state.contactFormData}
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
                            <div className="wrapper" style={{
                                backgroundImage: "url(img/bg7.jpg)"
                                , backgroundPosition: "center"
                                , backgroundRepeat: "no-repeat"
                                , backgroundSize: "cover"
                                , position: "relative"
                            }}>
                                <div className="card col-md-4 mx-auto" style={{
                                    verticalAlign: "bottom",
                                    color: "white"
                                    , background: "transparent"
                                }}>
                                    <div className="card-header text-bold mx-auto" style={{ background: "transparent" }}>
                                        <legend> {this.props.title}</legend>
                                    </div>
                                    <div className="card-body">
                                        <Form className="form-horizontal" onSubmit={handleSubmit}>
                                            <div className="form-group row">
                                                <div className="col-md-12">
                                                    <input
                                                        name="name"
                                                        type="text"
                                                        placeholder="Enter Name"
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
                                                            <span style={{ color: 'white' }} className="input-feedback"> <i className="fas fa-exclamation"></i> <span></span>
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
                                                        placeholder="Enter Email Address"
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
                                                                color: 'white'
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
                                                        placeholder="Enter Description"

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
                                                            <span className="input-feedback" style={{ color: 'white' }}><i className="fas fa-exclamation"></i> <span></span>
                                                                {errors.description}  i.e.  I need help with reaching out to promoter ASAP because ...
                                                                    </span>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div className="form-group row text-center">
                                                <div className="col-md-12">
                                                    <button type="submit" disabled={isSubmitting} className="mb-1 btn btn-pink">
                                                        Submit
                                                </button>
                                                    <button type="reset" className="mb-1 btn btn-warning" onClick={onReset}>Reset </button>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div >
                        );
                    }
                    }
                </Formik >
            </div >
        );
    };
};

ContactUs.propTypes = {
    title: PropTypes.string
};

ContactUs.defaultProps = {
    title: "Contact Us"
};
