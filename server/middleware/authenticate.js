const jwt = require("jsonwebtoken");
const USER = require("../models/userSchema");
const secretKey = process.env.KEY;

const athenticate = async (req, res, next) => {
  try {
    const token = req.cookies.amazonWeb;

    const verifyToken = jwt.verify(token, secretKey);
    console.log(verifyToken);

    const rootUser = await USER.findOne({ _id: verifyToken._id });
    console.log(rootUser);

    if (!rootUser) {
      throw new Error("user not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (error) {
    res.status(401).send("unautherized:No token provided");
    console.log(error);
  }
};

module.exports = athenticate;
