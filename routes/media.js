const express = require("express");
const router = express.Router();
const isBase64 = require("is-base64");
const base64Img = require("base64-img");
const { Media } = require("../models");
const fs = require("fs");

// findall
router.get("/", async (req, res) => {
  // attribute => hanya menampilkan data yang di inginkan
  const media = await Media.findAll({ attributes: ["id", "image"] });

  // kita tambahin host d depan nama image nya
  const mapping = media.map((item) => {
    // localhost/images/file image nya
    item.image = `${req.get("host")}/${item.image}`;
    return item;
  });

  res.json({
    status: "success",
    mapping,
  });
});

// upload image to Db
router.post("/", (req, res) => {
  const image = req.body.image;
  if (!isBase64(image, { mimeRequired: true })) {
    return res
      .status(400)
      .json({ status: "fail", message: "image is not base64" });
  }
  // base64.img(file image, dir buat nyimpen nya, tanggal sekarang buat penamaan image,callback{jika eror, dan jika g eror})
  base64Img.img(image, "./public/images", Date.now(), async (err, filepath) => {
    // buat ambile name
    const filename = filepath.split("\\").pop().split("/").pop();

    // save to db
    const media = await Media.create({ image: `images/${filename}` });
    return res.json({
      status: "success",
      data: {
        id: media.id,
        image: `${req.get("host")}/images/${filename}`,
      },
    });
  });
});

// delete image from Db

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const media = await Media.findByPk(id);
  if (!media) {
    return res
      .status(404)
      .json({ status: "fail", message: "id tidak di temukan" });
  }

  fs.unlink(
    `./public/${media.image}`,
    // cb klo ada err
    async (err) => {
      if (err) {
        return res.status(404).json({ status: "fail", message: err.message });
      }

      // klo g err=> hapus id yang d simpan di var media
      await media.destroy();
      return res.json({ status: "success", message: "image deleted" });
    }
  );
});

module.exports = router;
