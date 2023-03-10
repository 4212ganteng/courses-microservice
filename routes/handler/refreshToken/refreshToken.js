const jwt = require("jsonwebtoken");
const apiAdapter = require("../../apiAdapter");
const {
  URL_SERVICE_USERS,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
} = process.env;
const api = apiAdapter(URL_SERVICE_USERS);

module.exports = async (req, res) => {
  try {
    const refreshToken = req.body.refresh_token;
    const email = req.body.email;
    // console.log({ email });

    if (!refreshToken || !email) {
      return res
        .status(400)
        .json({ status: "error", message: "invalid refresh token" });
    }

    // cek ada g token nya di DB
    await api.get("refresh_tokens", {
      params: { refresh_token: refreshToken },
    });

    // verifikasi jwt token

    jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(403).json({ status: "error", message: err.message });
      }
      // console.log("helo", decoded);

      // CEK EMAIL sama g dengan payload dri jwt token
      if (email !== decoded.result.email) {
        return res
          .status(400)
          .json({ status: "error", message: "email is not valid" });
      }

      //   kalo semua aman
      const token = jwt.sign({ data: decoded.result }, JWT_SECRET, {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
      });

      //   lempar  ke fe
      return res.json({
        status: "success",
        data: token,
      });
    });
  } catch (error) {
    // respon jika service users nya mati
    console.log(error);
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "service unavailable" });
    }

    console.log(error.code);
    console.log(error);

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
