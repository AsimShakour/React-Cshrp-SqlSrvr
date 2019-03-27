import React from "react";
import logger from "../../logger";
import PropTypes from 'prop-types';
import * as userProfilesService from "../../services/userProfilesService.js";
import ProfileForm from "./ProfileForm";
import SweetAlert from "sweetalert";

const _logger = logger.extend("uPForm");

export default class Edit extends React.PureComponent {

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
        _logger("Edit UP Component did mounted");
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
        _logger(userProfileFormData);
        if (userProfileFormData.dob === "0001-01-01T00:00:00") {
            userProfileFormData.dob = "";
            _logger(userProfileFormData.dob)
        } else {
            let dtstring = userProfileFormData.dob.toString();
            let reducedt = dtstring.substring(0, 10);
            _logger(reducedt);
            userProfileFormData.dob = reducedt;
        }
        _logger(userProfileFormData.dob)
        this.setState({ userProfileFormData });
    };

    getByIdError = () => {
        SweetAlert(
            "Something went wrong", "Sorry, profile failed to load or doesn't exist.", "error");
    };

    submitUserProfile = (payload) => {
        payload.id = this.props.match.params.id;
        _logger(payload);
        userProfilesService
            .updateUserProfile(payload)
            .then(this.updateSuccess)
            .catch(this.updateError);
    };

    updateError = () => {
        _logger("Error submitting form in UPNew Component");
        SweetAlert(
            "Something went wrong", "Sorry, error occured updating a user profile.", "error");
    };

    updateSuccess = payload => {
        _logger(payload, "Success editing in UPNew Component");
        SweetAlert("Edited!", "User profile was successfully edited!", "success");
    };

    render() {
        return (
            <div>
                <ProfileForm title={"Update"} userProfileFormData={this.state.userProfileFormData} onSubmit={this.submitUserProfile} />
            </div >
        );
    }
}

Edit.propTypes = {
    match: PropTypes.object.isRequired
};