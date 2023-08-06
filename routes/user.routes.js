const auth = require("../controllers/auth.controller.js");
const miidlewareJWT = require("../controllers/auth.middleware.js");

const router = require("express").Router();

router.post("/signup", auth.signup);
router.post("/signin", auth.signin);
router.post("/logout", auth.logout);
router.post("/signin/new_token", auth.new_token);

router.get("/info", miidlewareJWT.verifyToken, async (req, res) => {
  const userId = req.userId;
  res.status(200).json({
    message: "User authenticated.",
    userId: userId
  });
}
);

module.exports = router;

