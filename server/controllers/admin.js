import Admin from "../models/Admin.js";

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await Admin.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    const admin = Admin.create({
      email: email,
      password: password,
      firstName,
      lastName,
    });

    return res
      .status(201)
      .json({ admin, message: "User registered successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email, password });

    if (admin) {
      return res.status(201).json({ admin, message: "Logged In" });
    } else {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
