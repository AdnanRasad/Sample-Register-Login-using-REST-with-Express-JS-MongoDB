const express = require("express");
const router = express.Router();

//now the address will be localhost:5000/api/users/test because in server.js file we declared app.use("/api/users", users);

//@route    GET api/users/test
//@desc     Tests users route
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "Users Work" }));
module.exports = router;
