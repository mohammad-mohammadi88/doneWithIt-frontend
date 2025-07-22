import defaults from "@/constants/defaults";
import { object, string } from "yup";

export default object().shape({
    email: string().required().email().label("Email"),
    password: string()
        .required()
        .min(defaults.minPasswordLength)
        .label("Password"),
});
