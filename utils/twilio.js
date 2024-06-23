import Twilio from "twilio";
import config from "./config.js";

const twilio = new Twilio(config.twilioSID, config.twilioAuthToken, {
  lazyLoading: true,
});

export const sendMessageTwilio = ({ to, amount, twilioMessage }) => {
  return twilio.messages.create({
    body: twilioMessage,
    from: config.twilioPhoneNumber,
    to,
  });
};
