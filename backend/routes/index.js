const Router = require("express");
const FilesControllers = require("../controllers/FilesControllers.js");

const router = Router();
router.post("/upload/", FilesControllers.uploadFile);

module.exports = router;