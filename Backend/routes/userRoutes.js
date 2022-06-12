const router = require("express").Router();

const{registerUser, loginUser} = require("../controlers/userControler");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;