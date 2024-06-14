import express from "express";
const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import constants from "../../config/constants.js";
import authenticate from "../../middleware/authenticate.js";

router.post("/", authenticate, async (req, res) => {
  try {
    console.log("hey");
    return res.json(RESPONSE.SUCCESS);
  } catch (error) {
    console.log(error);
    return res.json(RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
