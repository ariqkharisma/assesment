import Users from '@/models/userModel'
import auth from '@/middleware/auth';

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const checkUser = await auth(req, res);
      if (!checkUser) return res.status(401).json({ message: 'Unauthorized' });

      if (checkUser.role !== 'admin') {
        const user = await Users.findById(checkUser.id);
        return res.status(200).json({ 
          message: 'Users retrieved successfully',
          data: [user]
        });
      }

      const users = await Users.find();
      return res.status(200).json({
        message: 'Users retrieved successfully',
        data: users.map((user) => ({
          _id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          email: user.email,
          role: user.role,
        })),
      });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch users: ' + error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

export default handler;