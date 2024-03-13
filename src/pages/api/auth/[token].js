import Users from '@/models/userModel'
import jwt from 'jsonwebtoken'

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { token } = req.query
      if(!token) return res.status(400).json({message: 'Invalid Authentication.'})

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      if(!decoded) return res.status(400).json({message: 'Invalid Authentication.'})

      const user = await Users.findById(decoded.id)

      return res.status(200).json({
        message: "Token verified",
        data: {
          access_token: token,
          user: {
            username: user.username,
            email: user.email,
            role: user.role
          }
        }
      })
    } catch (error) {
      return res.status(500).json({ message: 'Failed to check token: ' + error.message })
    }
    
  }

  return res.status(405).json({ message: 'Method not allowed' });
  
}

export default handler;