import authenticatedRequest from "../../utils/authenticatedRequest";
import dbConnect from "../../utils/dbConnect";
import resObj from "../../utils/resObj";
import User from "../../models/user";

const func = async (req, res) => {
  try {
    await dbConnect();
    await authenticatedRequest(req, res);
    const user = await User.findById(req.user._id);
    user.phoneNumber = req.body.phone;
    await user.save();
    return res.json(resObj(true, user, "Phone Verified"));
  } catch (err) {
    return res.json(resObj(false, null, err.toString()));
  }
};

export default func;
