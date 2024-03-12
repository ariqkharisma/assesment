import jwt from 'jsonwebtoken'
import Users from '../models/userModel'


const auth = async (req, res) => {
    const token = req.headers?.authorization?.split(' ')[1];
    if(!token) return res.status(400).json({message: 'Invalid Authentication.'})

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    if(!decoded) return res.status(400).json({message: 'Invalid Authentication.'})

    const user = await Users.findOne({_id: decoded.id})

    return user;
}


export default auth;