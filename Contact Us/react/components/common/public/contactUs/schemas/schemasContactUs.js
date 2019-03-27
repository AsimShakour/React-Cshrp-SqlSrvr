import * as yup from "yup";

const contactUsSchema = yup.object().shape({
    name: yup
        .string("Name must be a string type.")
        .min(2, "Name must be at least 2 characters.")
        .max(255, "Name cannot exceed 255 characters.")
        .required("Name is a required field.")
    , email: yup
        .string("Email Address must be a string type.")
        .min(4, "Email Address should be at least 4 characters.")
        .max(400, "Email Address should be at most 400 characters.")
        .required("Email Address is a required field.")
        .email("Should be of proper email format.")
    , description: yup
        .string("Description must be a string type.")
        .min(10, "Description must be at least 10 characters. ")
        .max(1000, "Description cannot exceed 400 characters.")
        .required("Description is a required field.")
});

export { contactUsSchema };