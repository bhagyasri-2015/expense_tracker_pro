const jsonwebtoken = require("jsonwebtoken");
// Adjust 'jwtmanager' to the actual package name

const jwtmanager = (user) => {
  const accesstoken = jsonwebtoken.sign(
    {
      _id: user._id,
      name: user.name,
      balance: user.balance,
    },
    process.env.jwt_salt
  );

  return accesstoken;
};
module.exports = jwtmanager;
