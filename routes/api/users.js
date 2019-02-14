const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const passport = require("passport");
//now the address will be localhost:5000/api/users/test because in server.js file we declared app.use("/api/users", users);

//@route    GET api/users/test
//@desc     Tests users route
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "Users Work" }));
//module.exports = router;

//@route    GET api/users/register
//@desc     Register user
//@access   Public

const User = require("../../models/Users");
const gravatar = require("gravatar");
router.post("/register", (req, res) => {
  //afaik I know if it returns a promise which we put all that matche in user variable array nd check if ...
  //if we wrote User.fine()..it would find all that matched then we would do something like user.length()<1 return 'failed'..https://www.youtube.com/watch?v=0D5EEKH97NA
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email Already Exist" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //sz
        r: "pg", //rating
        d: "mm" //default
      });

      const { name, email, password } = req.body;
      bcrypt.hash(password, 10, (err, hash) => {
        User.create({ name, email, password: hash, avatar }, (err, newUser) => {
          if (err) console.log(err);
          else res.json(newUser);
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  //could be req res next

  email = req.body.email;
  password = req.body.password;
  User.findOne({ email: email }).then(gotuser => {
    if (!gotuser) {
      return res.json({ message: "Errrorrrr" });
    }

    bcrypt.compare(password, gotuser.password, (err, result) => {
      if (err) {
        return res.status(404).json({ message: "Errrorrrr" });
      }
      if (result) {
        //User matched
        //Sign the token:
        const token = jwt.sign(
          {
            email: gotuser.email,
            id: gotuser.id,
            name: gotuser.name,
            avatar: gotuser.avatar
          },
          keys.secretKey,
          { expiresIn: 3600 }
        );
        return res
          .status(200)
          .json({ message: "Success", token: "Bearer " + token });
      }
      return res.status(404).json({ message: "Errrorrrr" });
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
