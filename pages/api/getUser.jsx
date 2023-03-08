import authenticatedRequest from "../../utils/authenticatedRequest";
import dbConnect from "../../utils/dbConnect";
import resObj from "../../utils/resObj";

const func = async (req, res) => {
  try {
    await dbConnect();
    await authenticatedRequest(req, res);
    return res.json(resObj(true, req.user, "User Loaded"));
  } catch (err) {
    return res.json(resObj(false, null, err.toString()));
  }
};

export default func;
