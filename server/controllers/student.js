import Student from "../models/Student.js";

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, branch, email, password } = req.body;

    const isStudentPresent = await Student.findOne({ email });

    if (isStudentPresent) {
      return res.status(409).json({ message: "User already exists!" });
    }

    const student = await Student.create({
      email: email,
      password: password,
      firstName: firstName,
      lastName,
      lastName,
      branch: branch,
    });

    return res
      .status(201)
      .json({ student, message: "User registered successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email, password });

    if (student) {
      return res.status(201).json({ student, message: "Logged In" });
    } else {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
