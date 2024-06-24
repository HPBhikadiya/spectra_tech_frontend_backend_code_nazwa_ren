import express from "express";
import WebsiteSettingModel from "../Models/websiteSetting.js";
const router = express.Router();

router.get("", async (req, res) => {
  try {
    const website_setting = await WebsiteSettingModel.findOne();
    res.json(website_setting);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
