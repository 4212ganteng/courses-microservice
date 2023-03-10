const { RefreshToken } = require("../../../models");
module.exports = async (req, res) => {
  const token = req.query.refresh_token;
  const checkToken = await RefreshToken.findOne({
    where: { token: token },
  });

  if (!checkToken) {
    return res
      .status(404)
      .json({ status: "error", message: "Invalid refresh token" });
  }

  return res.json({
    status: "success",
    checkToken,
  });
};
