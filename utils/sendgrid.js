//const { KnexMaster, KnexWhizlabs } = require("./db");
import config from "./config.js";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(config.sendGridAPI);

export const sendEmail = async (data) => {
  const msg = {
    to: data.email,
    from: "spectratechcorp@gmail.com", // Use the email address or domain you verified above
    subject: "Sending with Twilio SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  msg.headers = { Priority: "Urgent", Importance: "high" };

  sgMail.send(msg).then(
    () => {},
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};
