import resObj from "./resObj";
import jwt_decode from "jwt-decode";
import User from "../models/user";
import dbConnect from "./dbConnect";

const authenticatedRequest = async (req, res) => {
  try {
    await dbConnect();
    const token = req.headers.accesstoken;
    if (!token || token === undefined) {
      return res.json(resObj(false, null, "Invalid Access Token"));
    }
    const user = jwt_decode(token);
    if (!user) {
      return res.json(resObj(false, null, "Invalid Access Token"));
    }
    const currentTime = Date.now();
    const exp = parseInt(user.exp) * 1000;
    if (exp <= currentTime) {
      return res.json(resObj(false, null, "Invalid Access Token"));
    }
    let dbUser = await User.findOne({ email: user.email });
    if (!dbUser) {
      dbUser = new User({
        name: user.name,
        email: user.email,
        joinedOn: currentTime,
        phoneNumber: "",
        orders: [],
        address: [],
        password: "",
      });
      await dbUser.save();
    }
    req.user = dbUser;
  } catch (err) {
    return res.json(resObj(false, null, err.toString()));
  }
};

export default authenticatedRequest;
