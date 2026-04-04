const authorization = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      return res
        .status(403)
        .json({ ok: false, error: { message: "Access Denied" } });
    }
    next();
  };
};

export default authorization;
