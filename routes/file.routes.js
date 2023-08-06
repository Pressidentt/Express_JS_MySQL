const multer = require('multer');
const miidlewareJWT = require("../controllers/auth.middleware.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({ storage });
const router = require("express").Router();

const file = require("../controllers/file.controller.js");

router.post("/upload", upload.single('file'), file.uploadFile);
router.get("/list/:id", miidlewareJWT.verifyToken, file.getFileById);
router.get("/download/:id", miidlewareJWT.verifyToken, file.downloadFile);
router.get("/list", miidlewareJWT.verifyToken, file.getFilesList);
router.put("/update/:id", upload.single('file'), miidlewareJWT.verifyToken, file.updateFile);
router.delete("/:id", miidlewareJWT.verifyToken, file.deleteFile);


module.exports = router;