import jwt from "jsonwebtoken";

const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ ok: false, error: { message: "Unauthorized" } });
  }
  try {
    const token = authHeader.split(" ")[1];

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifiedToken) {
      return res
        .status(401)
        .json({ ok: false, error: { message: "Unauthorized" } });
    }

    req.user = verifiedToken;

    next();
  } catch (err) {
    res
      .status(401)
      .json({ ok: false, error: { message: "cannot verify token" } });

    console.error("Token verification error:", err.message);
  }
};

export default authentication;
