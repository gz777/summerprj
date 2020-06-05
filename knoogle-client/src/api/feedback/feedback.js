import axios from "axios";

import API_URL from "../config";

/**
 * The sendFeedback function sends a POST request to the back-end endpoint that
 * deals with the submission of feedback forms. The data from the feedback form
 * will be used to send an email to knoogle's inbox regarding issues with the
 * website and comments from users.
 *
 * @param {String} name The visitor's name
 * @param {String} email The visitor's email
 * @param {String} comments The comments sent for feedback purposes
 */
export async function sendFeedback(name, email, comments) {
    try {
        return await axios.post(`${API_URL}/api/feedback/`, {
            name,
            email,
            comments
        });
    } catch (error) {
        return error;
    }
}
