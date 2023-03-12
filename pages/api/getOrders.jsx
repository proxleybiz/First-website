import authenticatedRequest from "../../utils/authenticatedRequest";
import dbConnect from "../../utils/dbConnect";
import resObj from "../../utils/resObj";
import Order from "../../models/orders";

const func = async (req, res) => {
  try {
    await dbConnect();
    const auth = await authenticatedRequest(req, res);
    if (!auth.res) {
      return res.json(resObj(false, null, auth.msg));
    }
    const orders = await Order.find({ userId: req.user._id });
    return res.json(resObj(true, orders, "Orders Loaded"));
  } catch (err) {
    return res.json(resObj(false, null, err.toString()));
  }
};

export default func;
