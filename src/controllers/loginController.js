const userServices = require("../services/userService");

class LoginController {
  // Add user
  addUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({
          status: false,
          data: {},
          err: "Incomplete arguments received.",
        });
    }

    try {
      const info = await userServices.add_user_by_email(email, password);
      return res.status(201).json({
        status: true,
        data: {
          msg: `User ${info.user_email} successfully added to the database.`,
        },
        err: {},
      });
    } catch (error) {
      return res
        .status(400)
        .json({ status: false, data: {}, err: error.message || error });
    }
  };

  // Login user
  loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({
          status: false,
          data: {},
          err: "Incomplete arguments received.",
        });
    }

    try {
      const info = await userServices.login_user_by_email(email, password);
      if (info) {
        return res.status(200).json({ status: true, data: info, err: {} });
      } else {
        return res
          .status(401)
          .json({ status: false, data: {}, err: "Invalid credentials." });
      }
    } catch (error) {
      return res
        .status(400)
        .json({ status: false, data: {}, err: error.message || error });
    }
  };
}

module.exports = new LoginController();
