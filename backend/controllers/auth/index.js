import User from "../../models/user/index.js";
import createError from "http-errors";
import bcrypt from "bcryptjs";
import generateToken from "../../middlewares/createToken/index.js";

//==========================================================================
// Register new user
//==========================================================================
export const createUser = async (req, res, next) => {
  const { username, firstName, lastName, email, password, agree } = req.body;

  try {
    const user = await User.findOne({ username, email });

    if (user) {
      return next(
        createError(400, "Email has been taken. Please try another one!")
      );
    }

    if (!user) {
      const newUser = new User({
        username,
        firstName,
        lastName,
        email,
        password,
        agree,
      });

      // Save user in the database
      try {
        await newUser.save();
      } catch (error) {
        console.log(error);
        return next(createError(500, "User could not be saved"));
      }

      // Generate token for a user
      const token = generateToken(newUser);

      res
        .cookie("token", token, {
          path: "/",
          httpOnly: false,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          sameSite: "strict",
          secure: true,
        })
        .status(201)
        .json({
          success: true,
          message: "Account successfully created!",
        });
    }
  } catch (error) {
    console.log(error);
    return next(createError(500, "Server error! please try again!"));
  }
};

//==========================================================================
// Login user
//==========================================================================
export const loginUser = async (req, res, next) => {
  const { email, password, rememberMe } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return next(createError(400, "Wrong credentials"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createError(400, "Incorrect password!"));
    }

    if (user && isPasswordValid) {
      const {
        password,
        bookshelfManager,
        financeManager,
        generalManager,
        ...rest
      } = user._doc;

      const token = generateToken(user);

      const tokenExpiry = rememberMe
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        : new Date(Date.now() + 24 * 60 * 60 * 1000);

      res
        .cookie("token", token, {
          path: "/",
          httpOnly: false,
          expires: tokenExpiry,
          sameSite: "strict",
          secure: true,
        })

        .status(200)
        .json({
          success: true,
          user: { ...rest },
          message: "User successfully logged in!",
        });
    }
  } catch (error) {
    return next(createError(400, "You are unable to login! Please try again!"));
  }
};
