const { User } = require("../../../models");
module.exports = async (req, res) => {
  // jiika dia tidak melakukan query maka kasih araay kosong nilai default nya
  const userIds = req.query.user_ids || [];

  const sqlOptions = {
    attributes: ["name", "email", "role", "avatar", "profession", "id"],
  };

  if (userIds.length) {
    // select id  name email role avatar where id in (id yang di filter/query)
    sqlOptions.where = {
      id: userIds,
    };
  }
  const user = await User.findAll(sqlOptions);

  return res.json({ status: "success", data: user });
};
