const express = require("express");
const register = require("./controllers/register");
const login = require("./controllers/login");
const userdashboard = require("./controllers/userdashboard");
const auth = require("../../middleware/auth");
const forgotpassword = require("./forgotpassword");
const resetpassword = require("./controllers/resetpassword");

const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/forgotpassword", forgotpassword);
userRoutes.post("/resetpassword", resetpassword);

userRoutes.use(auth);

userRoutes.get("/dashboard", userdashboard);

module.exports = userRoutes;
