const jsonwebtoken = require("jsonwebtoken");

const auth = (req, res, next) => {
  //console.log(req.headers);

  try {
    const accesstoken = req.headers.authorization.replace("Bearer ", "");

    const jwt_payload = jsonwebtoken.verify(accesstoken, process.env.jwt_salt);

    req.user = jwt_payload;
  } catch (e) {
    res.status(401).json({
      status: "failed",
      message: "unauthorized",
    });
    return;
  }

  next();
};

module.exports = auth;
