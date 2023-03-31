import dbConnect from "../../utils/dbConnect";
const { default: resObj } = require("../../utils/resObj");
const User = require("../../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
import bcrypt from "bcryptjs";

const func = async (req, res) => {
  try {
    await dbConnect();
    const { email, password, name } = req.body;
    let user = await User.findOne({
      $or: [{ email }, { phoneNumber: "+91" + email }],
    });
    if (user) {
      return res.json(resObj(false, null, "User Already Exists"));
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const currentTime = Date.now();
    user = new User({
      name: name,
      email: email,
      joinedOn: currentTime,
      phoneNumber: "",
      orders: [],
      address: [],
      password: encryptedPassword,
    });
    delete user.password;
    const payload = {
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return res.json(resObj(true, token, "User Loaded"));
  } catch (err) {
    return res.json(resObj(false, null, err.toString()));
  }
};

export default func;
