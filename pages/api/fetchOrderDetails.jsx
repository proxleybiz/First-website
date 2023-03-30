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
    const { id, payment } = req.body;
    let order = await Order.findById(id);
    if (!order) {
      return res.json(resObj(false, null, "No Order Found"));
    }
    if (order.userId !== req.user._id.toString()) {
      return res.json(resObj(false, null, "Operation out of bounds"));
    }
    res.json(resObj(true, order, "Order Fetched"));
  } catch (err) {
    console.log(err);
    return res.json(resObj(false, null, err.toString()));
  }
};

export default func;
