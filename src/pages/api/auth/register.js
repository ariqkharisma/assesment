import connectDB from "@/utils/connectDB";
import valid from "@/utils/valid";
import Users from "@/models/userModel";
import bcrypt from "bcrypt";

async function register (req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, username, email, password, role = "user" } = req.body;

    try {
      const errMsg = valid(firstName, username, email, password, "", 'signup');
      if (errMsg) return res.status(400).json({ message: errMsg });

      const userEmail = await Users.findOne({ email })
      const userName = await Users.findOne({ username })
      if (userEmail || userName) return res.status(400).json({ message: 'This email or username already exists.' })

      // Hash password to store it in DB
      const passwordhash = await bcrypt.hash(password, 12);

      // Create new user
      const newUser = new Users({
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        password: passwordhash,
        role
      });
      
      const saveUser = await newUser.save();
      if (saveUser) return res.status(201).json({ message: "Register Success!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
    
  return res.status(405).json({ message: 'Method not allowed' }); 
};

export default connectDB(register);

