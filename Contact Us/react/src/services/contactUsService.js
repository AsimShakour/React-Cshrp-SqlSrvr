import axios from "axios";
import * as serviceHelper from "./serviceHelpers"
// import logger from "../../src/logger";

// const _logger = logger.extend("uPForm");

const prefix = serviceHelper.API_HOST_PREFIX;
const root = "/api/contactus";

const createMessage = payload => {
    const config = {
        method: "POST",
        url: prefix + root,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config)
        .then(serviceHelper.onGlobalSuccess)
        .catch(serviceHelper.onGlobalError);
};

export { createMessage };