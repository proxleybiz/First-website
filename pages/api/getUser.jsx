import authenticatedRequest from "../../utils/authenticatedRequest";
import dbConnect from "../../utils/dbConnect";
import resObj from "../../utils/resObj";
const jwt = require("jsonwebtoken");

const func = async (req, res) => {
  try {
    await dbConnect();
    const auth = await authenticatedRequest(req, res);
    if (!auth.res) {
      return res.json(resObj(false, null, auth.msg));
    }
    const payload = {
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      email: req.user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return res.json(resObj(true, { user: req.user, token }, "User Loaded"));
  } catch (err) {
    return res.json(resObj(false, null, err.toString()));
  }
};

export default func;
