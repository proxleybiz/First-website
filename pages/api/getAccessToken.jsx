import axios from "axios";

const func = async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) {
      return res.json({ status: false, data: null, msg: "No auth code found" });
    }
    const params = `?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`;
    const result = await axios.post(
      `https://github.com/login/oauth/access_token${params}`,
      {},
      { headers: { Accept: "application/json" } }
    );
    res.json({ status: true, data: result.data });
  } catch (err) {
    console.log(err);
    res.json({ status: false, data: err, msg: "Server Side Error" });
  }
};

export default func;
