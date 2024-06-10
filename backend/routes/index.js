const express = require('express');
const FilesControllers = require('../controllers/FilesControllers.js');

const router = express.Router();

router.post('/files/', FilesControllers.uploadFile);
router.get('/files/:fileName', FilesControllers.getFile);

module.exports = router;
