import React, { PureComponent } from "react";
import { Form, Formik, Field } from "formik";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";
import logger from "../../logger";
import ForgotPasswordModal from "./ForgotPasswordModal";
import * as schemas from "./schemas/usersSchema";
import * as authService from "../../services/authService";
import * as emailService from "../../services/inviteEmailService";
import "./Users.css";
import "react-toastify/dist/ReactToastify.css";
// import RegistrationWidgetModal from "../common/public/RegistrationWidgetModal";
import RegistrationWidget from "../common/public/RegistrationWidget";


class Login extends PureComponent {
  state = {
    passwordModal: false,
    password: "",
    isOpen: false
  };

  componentDidMount = () => {
    logger("login comp mounted");
  }

  onLogin = (values, actions) => {
    this.setState({ password: values.password });
    authService
      .login(values)
      .then(authService.getCurrentUser)
      .then(this.loginSuccess)
      .catch(this.axiosError);
    actions.setSubmitting(false);
  };

  loginSuccess = data => {
    logger("Current user: ", data);
    if (this.state.password.endsWith("_SP1")) {
      this.props.history.push("/admin/password/update", {
        type: "LOGIN",
        payload: data.item
      });
    } else if (data.item.roles.includes("Temporary")) {
      this.props.history.push("/admin/questionnaire", {
        type: "LOGIN",
        payload: data.item
      });
    } else {
      this.props.history.push("/admin/dashboard", {
        type: "LOGIN",
        payload: data.item
      });
    }
  };

  sendPasswordReset = payload => {
    emailService
      .forgotPassword(payload)
      .then(this.passwordSuccess)
      .catch(this.axiosError);
  };

  passwordSuccess = () => {
    toast("Email sent!\nPlease check your inbox for a password reset link.");
    this.toggles();
  };

  axiosError = error => {
    let errorMessage = "Error. Please try again.";
    if (error.response) {
      if (error.response.data) errorMessage = error.response.data.errors[0];
    }
    toast(errorMessage);
  };

  toggles = () => {
    this.setState(prevState => ({
      passwordModal: !prevState.passwordModal
    }));
  };

  toggle = () => {
    let isOpen = false;
    this.setState(prevState => {
      isOpen = !prevState.isOpen
      return { isOpen };
    });
  };


  render() {
    return (
      <div>
        <ToastContainer />
        <Helmet>
          <title>Seller&apos;s Place Login</title>
        </Helmet>
        {this.state.isOpen && <RegistrationWidget modalToggled={this.toggle} isWidget={false} isOpen={this.state.isOpen} />}
        <div className="block-center mt-4 wd-xl">
          <div className="card card-flat">
            <a href="/" title="Seller's Place Homepage"> <div className="card-header text-center bg-dark">
              <img
                src="https://sabio-s3.s3.us-west-2.amazonaws.com/sellersplace/0640bbbe-9e54-4b2b-8f67-33a2f662745f_Sellers_Place_Logo_200x91.png"
                alt="Seller's Place"
                className="login-logo"
              />
            </div>
            </a>
            <div className="card-body">
              <p className="text-center py-2">SIGN IN TO CONTINUE.</p>
              <Formik
                enableReinitialize={true}
                validationSchema={schemas.login}
                initialValues={{ email: "", password: "" }}
                onSubmit={this.onLogin}
              >
                {props => {
                  const {
                    values,
                    touched,
                    errors,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                  } = props;
                  return (
                    <Form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <div className="input-group with-focus">
                          <Field
                            type="email"
                            name="email"
                            value={values.email}
                            onBlur={handleBlur}
                            placeholder="Enter email"
                            autoComplete="off"
                            className={
                              errors.email && touched.email
                                ? "form-control border-right-0 error"
                                : "form-control border-right-0"
                            }
                          />
                          <div className="input-group-append">
                            <span className="input-group-text text-muted bg-transparent border-left-0">
                              <em className="fa fa-envelope" />
                            </span>
                          </div>
                        </div>
                        {errors.email && touched.email && (
                          <span className="input-feedback text-danger">
                            {errors.email}
                          </span>
                        )}
                      </div>
                      <div className="form-group">
                        <div className="input-group with-focus">
                          <Field
                            type="password"
                            name="password"
                            value={values.password}
                            onBlur={handleBlur}
                            placeholder="Password"
                            autoComplete="off"
                            className={
                              errors.password && touched.password
                                ? "form-control border-right-0 error"
                                : "form-control border-right-0"
                            }
                          />
                          <div className="input-group-append">
                            <span className="input-group-text text-muted bg-transparent border-left-0">
                              <em className="fa fa-lock" />
                            </span>
                          </div>
                        </div>
                        {errors.password && touched.password && (
                          <span className="input-feedback text-danger">
                            {errors.password}
                          </span>
                        )}
                      </div>
                      <div className="clearfix">
                        <button
                          type="button"
                          className="text-muted btn btn-link"
                          onClick={this.toggles}
                        >
                          Forgot your password?
                        </button>
                      </div>
                      <button
                        className="btn btn-block btn-primary mt-3"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Login
                      </button>
                    </Form>
                  );
                }}
              </Formik>
              <p className="pt-3 text-center">Need to Signup?</p>
              <a className="btn btn-block btn-secondary" onClick={this.toggle}>
                {/* <a className="btn btn-block btn-secondary"> */}
                Register Now
              </a>
            </div>
            <div className="p-3 text-center">
              <span className="mr-2">&copy;</span>
              <span className="mr-2">2019</span>
              <span>Seller&apos;s Place</span>
            </div>
          </div>
          {this.state.passwordModal && (
            <ForgotPasswordModal
              isOpen={this.state.passwordModal}
              toggle={this.toggles}
              sendEmail={this.sendPasswordReset}
            />
          )}

        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object
};

export default Login;
