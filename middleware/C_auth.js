const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authAuthorization = async (req, res, next) => {
  const token = req.cookies.token || "";
  try {
    if (!token) {
      next();
      return;
    }

    try{
      const decrypt = await jwt.verify(token, process.env.TOKEN_SECRET_C);
      req.user = decrypt
      return res.redirect("/candidate");
    }
    catch(err)
    {
      const decrypt = await jwt.verify(token, process.env.TOKEN_SECRET_E);
      req.user = decrypt
      return res.redirect("/employee");
    }
  } catch (err) {
    console.log(err);
  }
};
