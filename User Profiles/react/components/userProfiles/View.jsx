import React, { Component } from "react";
import * as userProfilesService from "../../services/userProfilesService.js";
import logger from "../../logger";
import PropTypes from "prop-types";

const _logger = logger.extend("uPForm");

export default class View extends Component {
    state = {
        userProfileFormData: {
            firstName: ""
            , lastName: ""
            , avatarUrl: ""
            , description: ""
            , dob: ""
            , phoneNumber: ""
        }
    };

    componentDidMount() {
        this.getUserProfile();
    };

    getUserProfile = () => {
        userProfilesService
            .getById(this.props.match.params.id)
            .then(this.getByIdSuccess)
            .catch(this.getByIdError);
    };

    getByIdSuccess = (payload) => {
        let userProfileFormData = { ...this.state.userProfileFormData };
        userProfileFormData = payload.item;
        if (payload.item.dob) {
            let dtstring = payload.item.dob.toString();
            let reducedt = dtstring.substring(0, 10);
            _logger(reducedt)
            userProfileFormData.dob = reducedt;
        }
        this.setState({ userProfileFormData });
    };

    getByIdError = () => {
        alert("Sorry, profile failed to load or doesn't exist.")
    };

    render() {
        return (
            <div>
                <div className="content-heading">
                    <div className="alert alert-dismissible fade show" role="alert">
                        <strong>Welcome: </strong> {(this.state.userProfileFormData.firstName === "") ? "Name not provided" : this.state.userProfileFormData.firstName}
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card ">
                                <div className="card-body d-flex flex-column">
                                    <img
                                        id="imgForPage"
                                        src=
                                        "img/user/01.jpg"
                                        alt="Person"
                                        className="img-thumbnail rounded-circle thumb128 rounded mx-auto d-block"
                                    />
                                    {/* Hard coded image needs to be changed */}
                                </div>
                                <div className="btn-group" role="group" aria-label="Update and Delete Button Group">
                                    <button type="button" className="btn btn-info btn-block mt-auto ">BUTTON FOR Update Profile</button>
                                    <button type="button" className="btn btn-danger btn-block mt-auto ">BUTTON FOR Delete Profile</button>
                                    {/* Buttons may not be needed! check with Hector/Lilana */}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card ">
                                <div className="card-body d-flex flex-column">
                                    <h3>{this.state.name}</h3>
                                    <div>
                                        <strong>Name: </strong>
                                        {(this.state.userProfileFormData.firstName === "") ? "Not provided" : this.state.userProfileFormData.firstName} <span>
                                            {(this.state.userProfileFormData.lastName === "") ? "" : this.state.userProfileFormData.lastName}
                                        </span>

                                    </div>
                                    <div>
                                        <strong>Avatar Url: </strong>
                                        {(this.state.userProfileFormData.avatarUrl === "") ? "Not provided" : this.state.userProfileFormData.avatarUrl}
                                    </div>
                                    <div>
                                        <strong>Description: </strong>
                                        {(this.state.userProfileFormData.description === "") ? "Not provided" : this.state.userProfileFormData.description}
                                    </div>
                                    <div>
                                        <strong>DOB: </strong>
                                        {
                                            (() => {
                                                switch (this.state.userProfileFormData.dob) {
                                                    case "0001-01-01": return "Not provided";
                                                    //user didn't provide date DB returns above^
                                                    case "": return "Not provided";
                                                    //user doesn't exist
                                                    default: return this.state.userProfileFormData.dob;
                                                }
                                            })()


                                        }
                                    </div>
                                    <div>
                                        <strong>Phone Number: </strong>
                                        {(this.state.userProfileFormData.phoneNumber === "") ? "Not provided" : this.state.userProfileFormData.phoneNumber}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

View.propTypes = {
    match: PropTypes.object.isRequired
};