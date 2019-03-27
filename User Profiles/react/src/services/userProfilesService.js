import axios from "axios";
import * as serviceHelper from "./serviceHelpers";

const prefix = serviceHelper.API_HOST_PREFIX;
const root = "/api/users/profiles";

const createUserProfile = payload => {
    const config = {
        method: "POST",
        url: prefix + root,
        data: payload,
        crossdomian: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config)
        .then(serviceHelper.onGlobalSuccess)
        .catch(serviceHelper.onGlobalError);
};

const deleteById = id => {
  const config = {
    method: "DELETE",
    url: prefix + root + "/" + id,
    data: id,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

const getAll = () => {
  const config = {
    method: "GET",
    url: prefix + root,
    crosdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

const getById = id => {
  const config = {
    method: "GET",
    url: prefix + root + "/" + id,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

const updateUserProfile = (payload) => {
    const config = {
        method: "PUT",
        url: prefix + root + "/" + payload.id,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config)
        .then(serviceHelper.onGlobalSuccess)
        .catch(serviceHelper.onGlobalError);
};

export {
    createUserProfile,
    deleteById,
    getAll,
    getById,
    updateUserProfile
};