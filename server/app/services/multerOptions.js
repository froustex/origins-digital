const multer = require("multer");
const path = require("path");

const fileTypes = ["video/mp4", "video/webm"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "assets", "uploads")); // Dossier où les fichiers seront enregistrés
  },
  filename: function (req, file, cb) {
    if (fileTypes.includes(file.mimetype)) {
      cb(null, Date.now() + "-" + file.originalname); // Nom du fichier sauvegardé
    } else {
      return cb(new Error("Invalid file type."));
    }
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
