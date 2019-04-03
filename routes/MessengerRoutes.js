var path = require("path");
const express = require("express");
const router = express.Router();
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");

//page access token 410062269784654
router.get("/getPageAccessToken", function(req, res, next) {
  passport.authenticate("facebook", { scope: ["manage_pages"] });
});

module.exports = router;
