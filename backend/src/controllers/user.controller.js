import {
    registerUser,
    loginUser,
    getUserById} from "../Services/user.services.js"
  
  export const register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const { token, user } = await registerUser({ name, email, password });
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
  
      res.status(201).json({ token, user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const { token, user } = await loginUser({ email, password });
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
  
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const logout = async (req, res) => {
    try {
      res.clearCookie("token");
      res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const profile = async (req, res) => {
    try {
      const user = await getUserById(req.user.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  