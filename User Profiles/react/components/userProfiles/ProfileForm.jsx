import React from "react";
import logger from "../../logger";
import { Formik, Form } from "formik";
import * as schemas from "./schemas/schemasUSP";
import PropTypes from 'prop-types';

const _logger = logger.extend("uPForm");

export default class ProfileForm extends React.PureComponent {
    state = {
        userProfileFormData: {
            firstName: ""
            , lastName: ""
            , avatarUrl: ""
            , description: ""
            , dob: ""
            , phoneNumber: ""
        },
        targetSchema: schemas.addSchema
    };

    componentDidMount() {
        _logger("Asim's Profile Form Component did mount");
    };

    handleChange = event => {
        const keyName = event.target.name;
        let userProfileFormData = { ...this.state.userProfileFormData };
        userProfileFormData[keyName] = event.target.value;
        this.setState({ userProfileFormData });
    };

    render() {
        return (
            <div>
                <Formik
                    initialValues={this.props.userProfileFormData ? this.props.userProfileFormData : this.state.userProfileFormData}
                    enableReinitialize={true}
                    validationSchema={this.state.targetSchema}
                    onSubmit={this.props.onSubmit}>
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
                            <div className="wrapper">
                                <div className="card card-default">
                                    <div className="card-header">
                                        <legend> {this.props.title} User Profile</legend>
                                    </div>
                                    <div className="card-body">
                                        <Form className="form-horizontal" onSubmit={handleSubmit}>
                                            <fieldset>
                                                <div className="form-group row"><label className="col-md-2 col-form-label">First Name*</label>
                                                    <div className="col-md-10">
                                                        <input
                                                            name="firstName" type="text" placeholder="Roberto"
                                                            className={
                                                                errors.firstName &&
                                                                    touched.firstName
                                                                    ? "form-control error border-danger"
                                                                    : "form-control"
                                                            }
                                                            onBlur={handleBlur}
                                                            value={values.firstName}
                                                            onChange={handleChange} />{errors.firstName &&
                                                                touched.firstName && (
                                                                    <span style={{ color: 'red' }} className="input-feedback"> <i className="fas fa-exclamation"></i> <span></span>
                                                                        {errors.firstName}  i.e. Roberto.
                                                                        </span>
                                                                )
                                                        }
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <div className="form-group row"><label className="col-md-2 col-form-label">Last Name*</label>
                                                    <div className="col-md-10">
                                                        <input
                                                            placeholder="Smith"
                                                            name="lastName" type="text"
                                                            className={
                                                                errors.lastName &&
                                                                    touched.lastName
                                                                    ? "form-control error border-danger"
                                                                    : "form-control"
                                                            }
                                                            onBlur={handleBlur}
                                                            value={values.lastName}
                                                            onChange={handleChange} />

                                                        {errors.lastName &&
                                                            touched.lastName && (
                                                                <span className="input-feedback" style={{ color: 'red' }}> <i className="fas fa-exclamation"></i> <span></span>
                                                                    {errors.lastName}  i.e.  Smith.
                                                                    </span>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <div className="form-group row"><label className="col-md-2 col-form-label">Avatar Url (Use http://)</label>
                                                    <div className="col-md-10">
                                                        <input
                                                            type="url"
                                                            placeholder="https://www.google.com/vendorStall.png"
                                                            name="avatarUrl"
                                                            className={
                                                                errors.avatarUrl &&
                                                                    touched.avatarUrl
                                                                    ? "form-control error border-danger"
                                                                    : "form-control"
                                                            }
                                                            onBlur={handleBlur}
                                                            value={values.avatarUrl}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.avatarUrl &&
                                                            touched.avatarUrl && (
                                                                <span className="input-feedback" style={{ color: 'red' }}><i className="fas fa-exclamation"></i> <span></span>
                                                                    {errors.avatarUrl}  i.e.  https://www.google.com/vendorStall.png .
                                                                    </span>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <div className="form-group row"><label className="col-md-2 col-form-label">Description</label>
                                                    <div className="col-md-10">
                                                        <textarea
                                                            name="description"
                                                            type="text"
                                                            placeholder="Owner of World Famous Burgers. Love eating  vegan burgers from around the world. Known for my ability to connect people. "

                                                            className={errors.description &&
                                                                touched.description
                                                                ? "form-control error border-danger"
                                                                : "form-control"
                                                            }

                                                            onBlur={handleBlur}
                                                            value={values.description}
                                                            onChange={handleChange}
                                                        />{errors.description &&
                                                            touched.description && (
                                                                <span className="input-feedback" style={{ color: 'red' }}><i className="fas fa-exclamation"></i> <span></span>
                                                                    {errors.description}  i.e.  Owner of World Famous Burgers. Love eating  vegan burgers from around the world. Known for my ability to connect people.
                                                                    </span>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <fieldset>

                                                <div className="form-group row"><label className="col-md-2 col-form-label">Date of Birth </label>
                                                    <div className="col-md-10"><input
                                                        name="dob"
                                                        type="date" placeholder="12/30/1960"

                                                        className={errors.dob &&
                                                            touched.dob
                                                            ? "form-control error border-danger"
                                                            : "form-control"
                                                        }

                                                        onBlur={handleBlur}
                                                        value={values.dob}
                                                        onChange={handleChange} />{errors.dob &&
                                                            touched.dob && (
                                                                <span className="input-feedback" style={{ color: 'red' }}><i className="fas fa-exclamation"></i> <span></span>
                                                                    {errors.dob}  Use a format like:  1960-12-30.
                                                                    </span>
                                                            )}</div>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <div className="form-group row"><label className="col-md-2 col-form-label">Phone Number </label>
                                                    <div className="col-md-10"><input
                                                        name="phoneNumber"
                                                        type="tel"
                                                        placeholder="424-200-1555"
                                                        className={errors.phoneNumber &&
                                                            touched.phoneNumber
                                                            ? "form-control error border-danger"
                                                            : "form-control"
                                                        }

                                                        onBlur={handleBlur}
                                                        value={values.phoneNumber}
                                                        onChange={handleChange} />{errors.phoneNumber &&
                                                            touched.phoneNumber && (
                                                                <span className="input-feedback" style={{ color: 'red' }}><i className="fas fa-exclamation"></i> <span></span>
                                                                    {errors.phoneNumber} i.e.  424-200-1555.
                                                                    </span>
                                                            )}</div>
                                                </div>
                                            </fieldset>
                                            <div>
                                                <button type="submit" disabled={isSubmitting} className="mb-1 btn btn-primary">
                                                    Submit
                                                </button>
                                                <button type="reset" className="mb-1 btn btn-warning" onClick={onReset}>Reset </button>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div >
                        );
                    }
                    }
                </Formik >
            </div>
        );
    }
}

ProfileForm.propTypes = {
    userProfileFormData: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        avatarUrl: PropTypes.string,
        description: PropTypes.string,
        dob: PropTypes.string,
        phoneNumber: PropTypes.string
    }),
    onSubmit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};