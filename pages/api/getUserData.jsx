import axios from "axios";

const func = async (req, res) => {
  try {
    const code = req.headers["authorization"];
    if (!code) {
      return res.json({ status: false, data: null, msg: "No auth code found" });
    }

    const result = await axios.get(`https://api.github.com/user`, {
      headers: { Authorization: code },
    });
    res.json({ status: true, data: result.data });
  } catch (err) {
    console.log(err);
    res.json({ status: false, data: err, msg: "Server Side Error" });
  }
};

export default func;
