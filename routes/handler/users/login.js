const apiAdapter = require("../../apiAdapter");
const jwt = require("jsonwebtoken");

const {
  URL_SERVICE_USERS,
  JWT_REFRESH_TOKEN_EXPIRED,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_SECRET,
} = process.env;
const api = apiAdapter(URL_SERVICE_USERS);
module.exports = async (req, res) => {
  try {
    const users = await api.post("/users/login", req.body);
    const result = users.data.data;

    // create jwt token
    const token = jwt.sign({ result }, JWT_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
    });

    const refreshToken = jwt.sign({ result }, JWT_SECRET_REFRESH_TOKEN, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRED,
    });

    // simpan ke table refresh token
    await api.post("/refresh_tokens", {
      refresh_token: refreshToken,
      user_id: result.id,
    });

    return res.json({
      status: "success",
      token,
      refresh_token: refreshToken,
    });
  } catch (error) {
    // respon jika service users nya mati
    console.log(error.response);
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "service unavailable" });
    }

    console.log(error.code);
    console.log(error.response);

    const { status, data } = error.response;
    return res.status(400).json({ status, message: data });
  }
};
