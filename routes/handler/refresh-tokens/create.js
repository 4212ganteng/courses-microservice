const { User, RefreshToken } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const userid = req.body.user_id;
  const refreshTokenbody = req.body.refresh_token;

  // schema validator
  const schema = {
    refresh_token: "string",
    user_id: "number",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({ status: "error", message: validate });
  }

  const user = await User.findByPk(userid);

  if (!user) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }

  const createdToken = await RefreshToken.create({
    token: refreshTokenbody,
    user_id: userid,
  });

  res.json({
    status: "success",
    id: createdToken.id,
  });
};
