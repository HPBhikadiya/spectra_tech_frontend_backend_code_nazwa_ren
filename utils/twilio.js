import Twilio from "twilio";
import config from "./config.js";

const twilio = new Twilio(config.twilioSID, config.twilioAuthToken, {
  lazyLoading: true,
});

export const sendMessageTwilio = ({ to, amount }) => {
  return twilio.messages.create({
    body: `You got an new Order ${amount}`,
    from: config.twilioPhoneNumber,
    to,
  });
};
