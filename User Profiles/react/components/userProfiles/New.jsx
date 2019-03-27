import React from "react";
import logger from "../../logger";
import * as userProfilesService from "../../services/userProfilesService.js";
import ProfileForm from "./ProfileForm";
import SweetAlert from "sweetalert";

const _logger = logger.extend("uPForm");

function New() {

    const submitUserProfile = (payload) => {
        userProfilesService
            .createUserProfile(payload)
            .then(registerSuccess)
            .catch(registerError);
    };

    const registerError = () => {
        SweetAlert(
            "Something went wrong", "Sorry, error occured creating a user profile.", "error");
    };

    const registerSuccess = payload => {
        _logger(payload, "Success submitting in UPNew Component");
        SweetAlert("Created!", "User Profile was successfully created!", "success");
    };

    return (
        <div>
            <ProfileForm title={"Create"} onSubmit={submitUserProfile} />
        </div >
    );
}

export default React.memo(New);