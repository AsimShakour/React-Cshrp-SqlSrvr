import * as yup from "yup";

const addSchema = yup.object().shape({
    firstName: yup
        .string("First name must be a string type.")
        .min(2, "First name must be at least 2 characters.")
        .max(255, "First name cannot exceed 255 characters.")
        .required("First name is a required field.")
    , lastName: yup
        .string("Last name must be a string type.")
        .min(2, "Last name must be at least 2 characters.")
        .max(255, "Last name cannot exceed 255 characters.")
        .required("Last name is a required field.")
    , avatarUrl: yup
        .string("Url must be a string type.")
        .min(4, "Url should be at least 4 characters.")
        .max(400, "Url should be at most 400 characters.")
    , description: yup
        .string("Description must be a string type.")
        .min(10, "Description must be at least 10 characters. ")
        .max(1000, "Description cannot exceed 1000 characters.")
    , dob: yup
        .date("Date format should be like 11/30/1960 MM/DD/YEAR.")
    , phoneNumber: yup
        .string("Phone Number should be a numeric type.")
        .min(10, "Phone Number should be at least 10 digits.")
        .max(15, "Phone Number should be at most 15 digits.")
});

export { addSchema };
