const admin = require('../config/firebase');
const User = require('../models/User');

exports.verifyUser = async (req, res) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    let user = await User.findOne({ uid: decoded.uid });

    if (!user) {
      user = new User({
        uid: decoded.uid,
        email: decoded.email,
        name: decoded.name,
      });
      await user.save();
    }

    res.json(user);
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};