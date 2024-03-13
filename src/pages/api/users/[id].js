import Users from '@/models/userModel'
import auth from '@/middleware/auth';
import valid from '@/utils/valid';
import bcrypt from 'bcrypt'

async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const checkUser = await auth(req, res);
      if (!checkUser) return res.status(401).json({ message: 'Unauthorized' });

      const user = await Users.findById(id); 
      if (!user) return res.status(404).json({ message: 'User not found' });

      return res.status(200).json({
        message: 'User retrieved successfully',
        data: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          email: user.email,
          role: user.role,
        }
      });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch user: ' + error.message });
    }
  }
  
  if (req.method === 'PUT') {
    const { first_name, username, email, role } = req.body;

    try {
      const errMsg = valid(first_name, username, email, "", role, 'edit');
      if (errMsg) return res.status(400).json({ message: errMsg });

      const checkUser = await auth(req, res);

      if (checkUser.id !== id) {
        if (checkUser.role !== 'admin') return res.status(401).json({ message: 'Unauthorized' });
      }

      const userEmail = await Users.findOne({ email })
      const userName = await Users.findOne({ username })

      if ((userEmail && userEmail.id !== id) || (userName && userName.id !== id)) return res.status(400).json({ message: 'This email or username already exists.' })
      
      if (req.body.password) {
        const passwordhash = await bcrypt.hash(req.body.password, 12);
        req.body.password = passwordhash;
      }

      const updatedUser = await Users.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedUser) return res.status(404).json({ message: 'User not found' });
      
      return res.status(200).json({
        message: 'User updated successfully',
        data: {
          id: updatedUser.id,
          first_name: updatedUser.first_name,
          last_name: updatedUser.last_name,
          username: updatedUser.username,
          email: updatedUser.email,
          role: updatedUser.role,

        }
      })
    } catch (error) {
      return res.status(500).json({ message: 'Failed to update user: '  + error.message });
    };
  }

  if (req.method === 'DELETE') {
    try {
      const checkUser = await auth(req, res);
      if (checkUser.role !== 'admin') return res.status(401).json({ message: 'Unauthorized' });
      
      const deleteUser = await Users.findByIdAndDelete(id);
      if (!deleteUser) return res.status(404).json({ message: 'User not found' });

      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to delete user: ' + error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

export default handler;