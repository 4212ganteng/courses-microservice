const apiAdapter = require("../../apiAdapter");

const { URL_SERVICE_MEDIA } = process.env;
const api = apiAdapter(URL_SERVICE_MEDIA);
module.exports = async (req, res) => {
  try {
    console.log("hii");
    const media = await api.get("/media");
    return res.json(media.data);
  } catch (error) {
    // respon jika service media nya mati
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
