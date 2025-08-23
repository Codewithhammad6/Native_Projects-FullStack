export const sendToken = (user, statusCode, message, res) => {
  const token = user.generateToken();
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      secure: process.env.NODE_ENV === "production", // secure true only in prod with HTTPS
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })
    .json({
   success: true,
      user,
      message,
       token,
      
    });
};