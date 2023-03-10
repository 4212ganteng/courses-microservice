const bcrypt = require("bcrypt");
const { User } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  //   config schema for validations
  const schema = {
    // tidak boleh kosong
    name: "string|empty:false",
    email: "email|empty:false",
    // min 6 characters
    password: "string|min:6",
    // boleh ksong
    profession: "string|optional",
    avatar: "string|optional",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({ status: "error", message: validate });
  }

  const id = req.params.id;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }

  const email = req.body.email;

  if (email) {
    const checkEmail = await User.findOne({
      where: { email },
    });

    // cek lagi, jika email nya sudah ada di DB dan itu tidak sama dengan  email dia
    if (checkEmail && email !== user.email) {
      return res
        .status(409)
        .json({ status: "error", message: "Email already exists" });
    }
  }

  const password = await bcrypt.hash(req.body.password, 10);

  const { name, avatar, profession } = req.body;

  // pake user dari line 27
  const result = await user.update({
    email,
    password,
    name,
    avatar,
    profession,
  });

  return res.json({ status: "success", data: result });
};
