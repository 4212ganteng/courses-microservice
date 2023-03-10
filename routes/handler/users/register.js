const apiAdapter = require("../../apiAdapter");

const { URL_SERVICE_USERS } = process.env;
const api = apiAdapter(URL_SERVICE_USERS);
module.exports = async (req, res) => {
  try {
    const users = await api.post("/users/", req.body);
    return res.json(users.data);
  } catch (error) {
    // respon jika service users nya mati
    console.log(error);
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "service unavailable" });
    }

    console.log(error.code);

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
