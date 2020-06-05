import axios from "axios";

import API_URL from "../config";

/**
 * The registerUser method runs a POST request to the back-end registration
 * endpoint. Validation is done prior to sending the request such as checking
 * that the password is 8 characters or more and that both the password and
 * the confirmation password match.
 *
 * @param username The user's preferred username
 * @param email The user's preferred email address
 * @param password The user's preferred password
 * @param confirmationPassword The password entered again for validity
 * @param handlePasswordConfirmation The handler for confirming the password
 * @param handlePasswordLengthValidity The handler for the password length
 */
export async function registerUser(
    username,
    email,
    password,
    confirmationPassword,
    handlePasswordConfirmation,
    handlePasswordLengthValidity
) {
    if (password.length >= 8) {
        if (password === confirmationPassword) {
            try {
                // Returns the validation key upon successful registration
                return await axios.post(
                    `${API_URL}/api/rest-auth/registration/`,
                    {
                        username: username,
                        email: email,
                        password1: password,
                        password2: confirmationPassword
                    }
                );
            } catch (error) {
                // Returns the error that occurred upon failure
                return error;
            }
        } else {
            handlePasswordConfirmation();
        }
    } else {
        handlePasswordLengthValidity();
    }
}
