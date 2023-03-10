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
  };

  //   jadi saya mengambil semua yang ada  di body,lalu validasi dia
  const validate = v.validate(req.body, schema);
  //   validate itu nanti nya return nya arr kal0  arr itu ada isinya berarti itu err
  if (validate.length) {
    return res.status(400).json({ status: "error", message: validate });
  }

  //   cek email udah kedaftar blom di db?
  const user = await User.findOne({
    where: { email: req.body.email },
  });

  if (user) {
    return res
      .status(409)
      .json({ status: "error", message: "email already exists" });
  }

  // hashing password
  const password = await bcrypt.hash(req.body.password, 10);

  const data = {
    password,
    name: req.body.name,
    email: req.body.email,
    profession: req.body.profession,
    role: "student",
  };

  const createUser = await User.create(data);

  return res.json({
    data: {
      id: createUser.id,
    },
  });
};
