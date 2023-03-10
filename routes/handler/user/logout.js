const { User, RefreshToken } = require("../../../models");
module.exports = async (req, res) => {
  const userId = req.body.user_id;

  const user = await User.findByPk(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  //   hapus
  await RefreshToken.destroy({
    where: { user_id: userId },
  });
  res.json({ status: "success", message: "Refresh Token DEleted" });
};
