import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import valid from "../../../utils/valid";
import bcrypt from 'bcrypt'
import { createAccessToken } from '../../../utils/generateToken'


async function login (req, res) {
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body
            const errMsg = valid('', '', email, password, "", 'login');
            if (errMsg) return res.status(400).json({ message: errMsg })

            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ message: 'This user does not exist.' })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ message: 'Incorrect password.' })

            const access_token = createAccessToken({ id: user._id })

            return res.status(200).json({
                message: "Login Success!",
                data: {
                    access_token,
                    user: {
                        username: user.username,
                        email: user.email,
                        role: user.role
                    }
                }
            })

        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }
    
    return res.status(405).json({ message: 'Method not allowed' }); 
}

export default connectDB(login);