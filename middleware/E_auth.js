const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authAuthorization = async (req, res, next) => {
  const token = req.cookies.token || "";
  try {
    if (!token) {
      return res.send("Please login");
    }
    try{
        const decrypt = await jwt.verify(token, process.env.TOKEN_SECRET_E);
        req.user = decrypt;
        next();
    }
    catch(err)
    {
      const decrypt = await jwt.verify(token,process.env.TOKEN_SECRET_C);
      req.user = decrypt
      next();
    }

  } catch (err) {
    console.log(err);
  }
};
