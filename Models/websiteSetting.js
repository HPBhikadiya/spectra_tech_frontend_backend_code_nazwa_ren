import mongoose from "mongoose";

const websiteSetting = new mongoose.Schema({
  minimumValue: { type: Number },
});

const WebsiteSettingModel = mongoose.model("websiteSetting", websiteSetting);

export default WebsiteSettingModel;
